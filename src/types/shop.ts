/**
 * Simplified product type for UI components.
 * Mapped from Medusa's StoreProduct response.
 */
export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  price: number;
  currencyCode: string;
  stock: number;
  category: string | null;
  featured: boolean;
  variantId: string;
  images: { url: string }[];
}

export interface CartItem {
  lineItemId: string;
  productId: string;
  variantId: string;
  title: string;
  thumbnail: string | null;
  price: number;
  currencyCode: string;
  quantity: number;
  total: number;
  stock: number;
}
