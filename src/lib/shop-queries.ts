import { query } from "@solidjs/router";
import { getProducts, getProductByHandle } from "~/lib/shop-api";

export const getShopPageData = query(async () => {
  const products = await getProducts();

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))] as string[];
  const featured = products.filter(p => p.featured);

  return { products, categories, featured };
}, "shop-page-data");

export const getProductPageData = query(async (handle: string) => {
  const [product, allProducts] = await Promise.all([
    getProductByHandle(handle),
    getProducts(),
  ]);

  if (!product) return null;

  const related = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return { product, related };
}, "product-page-data");
