import { api } from "../api/axios";
import type { Category } from "../interface/category.interface";
import type { Product } from "../interface/product.interface";

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get("/categories");

  return data;
};

export const getProductsByCategory = async (
  categoryId: string,
): Promise<Product[]> => {
  const { data } = await api.get(`/categories/${categoryId}/discos`);

  return data;
};

export const getGenresByCategory = async (categoryId: string) => {
  const { data } = await api.get(`/categories/${categoryId}/genres`);
  return data;
};
