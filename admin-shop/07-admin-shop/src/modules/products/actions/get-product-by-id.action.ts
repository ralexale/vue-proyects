import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces';
import { getProductImageAction } from './get-product-image.action';
import { isAxiosError } from 'axios';

export const getProductById = async (id: string): Promise<Product> => {
  if (id === 'create') {
    return {
      id: '',
      gender: '' as any,
      title: '',
      slug: '',
      description: '',
      price: 0,
      stock: 0,
      images: [],
      sizes: [],
      tags: [],
      user: {} as any,
    };
  }

  try {
    const { data } = await tesloApi.get<Product>(`/products/${id}`);

    data.images = data.images.map(getProductImageAction);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);

      throw new Error('Error getting product');
    }
    throw new Error(`Error getting product by id: ${id}`);
  }
};
