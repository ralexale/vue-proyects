import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces';
import { getProductImageAction } from './get-product-image.action';

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await tesloApi.get<Product>(`/products/${id}`);

    data.images = data.images.map(getProductImageAction);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by id: ${id}`);
  }
};
