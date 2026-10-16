import { api } from "../api/axios";
import type { Artist } from "../interface/artist.interface";
import type { Product } from "../interface/product.interface";

export const getArtists = async (): Promise<Artist[]> => {
  const { data } = await api.get("/artists");

  return data;
};

export const getProductsByArtist = async (
  artistId: string,
): Promise<Product[]> => {
  const { data } = await api.get(`/artists/${artistId}/discos`);

  return data;
};
