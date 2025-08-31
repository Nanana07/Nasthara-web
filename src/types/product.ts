// types/product.ts
export interface ProductSizeVariant {
  size: string;
  price: number;
}

export interface ProductFlavorVariant {
  name: string;
  description: string;
  image: string;
  hint: string;
  sizes: ProductSizeVariant[];
}

export interface Product {
  name: string; // e.g., "Nastar"
  bestseller?: boolean;
  flavors: ProductFlavorVariant[];
}
