export interface Product {
  id: string;
  name: string;
  album: string;
  description: string;
  price: number;
  stock: number;
  year: number;
  format: string;
  recordLabel: string;
  catalogCode: string;
  active: boolean;

  category: {
    name: string;
  };

  artist: {
    name: string;
  };

  genre: {
    name: string;
  };
}
