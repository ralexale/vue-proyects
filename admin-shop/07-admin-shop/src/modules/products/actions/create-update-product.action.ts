import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces';
import { isAxiosError } from 'axios';
import { getProductImageAction } from './get-product-image.action';

const cleanProductForUpdate = (product: Partial<Product>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? imageName : '';
      }

      return image;
    }) ?? [];

  delete product.id;
  delete product.user;
  product.images = images;
  return product;
};

export const createUpdateProductAction = async (product: Partial<Product>) => {
  const productId = product.id;
  const newImages = await uploadImages(product.images ?? []);
  product.images = newImages;

  product = cleanProductForUpdate(product);

  if (product.id && product.id !== '') {
    return await updateProduct(productId!, product);
  }

  // crear producto
  return await createProduct(product);
};

const updateProduct = async (productId: string, product: Partial<Product>): Promise<Product> => {
  try {
    const { data } = await tesloApi.patch<Product>(`/products/${productId}`, product);
    data.images = data.images.map(getProductImageAction);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);

      throw new Error('Error update product');
    }
    throw new Error('Error update product');
  }
};

const createProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    const { data } = await tesloApi.post<Product>('/products', product);
    data.images = data.images.map(getProductImageAction);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);

      throw new Error('Error creating product');
    }
    throw new Error('Error creating product');
  }
};

const uploadImages = async (images: (string | File)[]) => {
  const filesToUpload = images.filter((image) => image instanceof File) as File[];
  const currentImages = images.filter((image) => typeof image === 'string') as string[];

  const uploadPromises = filesToUpload.map(async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const { data } = await tesloApi.post<{ secureUrl: string }>('/files/product', formData);

      return data.secureUrl;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);

        throw new Error('Error uploading images');
      }
      throw new Error('Error uploading images');
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);

  return [...currentImages, ...uploadedImages];
};
