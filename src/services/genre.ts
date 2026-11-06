import { api } from "../api/axios";
import type { Genre } from "../interface/genre.interface";

export const getGenres = async (): Promise<Genre[]> => {
  const { data } = await api.get("/genres");

  return data;
};
