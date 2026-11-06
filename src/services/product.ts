import { api } from "../api/axios";
import type { Product } from "../interface/product.interface";

export interface CreateProductDto {
  name: string;
  album: string;
  description: string;
  price: number;
  stock: number;
  year: number;
  format: string;
  recordLabel: string;
  catalogCode: string;
  categoryId: string;
  artistId: string;
  genreId: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get("/products");

    console.log("Respuesta de GET /products:", data);

    // Si la API devuelve directamente un arreglo
    if (Array.isArray(data)) {
      return data;
    }

    // Si la API devuelve un objeto que contiene el arreglo
    if (Array.isArray(data?.data)) {
      return data.data;
    }

    console.error("La API no devolvió un arreglo de productos:", data);
    return [];
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
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

export async function createProduct(data: CreateProductDto, image: File) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  formData.append("image", image);

  const response = await api.post("/products", formData);

  return response.data;
}
