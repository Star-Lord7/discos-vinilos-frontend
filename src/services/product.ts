import { api } from "../api/axios";
import type { Product } from "../interface/product.interface";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Fallo al obtener el producto por ID");
  }
};
