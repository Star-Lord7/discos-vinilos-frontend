export interface ProductImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  name: string;
  album: string;
  description: string | null;
  price: string | number;
  stock: number;
  year: number | null;
  format: string;
  recordLabel: string | null;
  catalogCode: string | null;
  active: boolean;
  images: ProductImage[];
  category: {
    id?: string;
    name: string;
  };
  artist: {
    id?: string;
    name: string;
  };
  genre: {
    id?: string;
    name: string;
  };
}
