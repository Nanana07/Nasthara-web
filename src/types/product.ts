// types/product.ts
export interface ProductVariant {
  size: string;
  price: number;
}

export interface Product {
  name: string;
  description: string;
  image: string;
  hint: string;
  variants: ProductVariant[];
  bestseller?: boolean;
}
