import type { Product } from "~/types/shop";
import { listProducts, MEDUSA_REGION_ID } from "~/lib/medusa";

/**
 * Map a Medusa StoreProduct to our simplified Product type.
 */
function mapProduct(p: any): Product {
  const variant = p.variants?.[0];
  const calculatedPrice = variant?.calculated_price;

  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    description: p.description ?? null,
    thumbnail: p.thumbnail ?? p.images?.[0]?.url ?? null,
    price: calculatedPrice?.calculated_amount ?? 0,
    currencyCode: calculatedPrice?.currency_code ?? "eur",
    stock: variant?.inventory_quantity ?? 0,
    category: p.categories?.[0]?.name ?? null,
    featured: p.metadata?.featured === true || p.collection?.handle === "featured",
    variantId: variant?.id ?? "",
    images: (p.images ?? []).map((img: any) => ({ url: img.url })),
  };
}

export function getProductImageUrl(path: string | null | undefined): string {
  if (!path) return "/images/placeholder-product.jpg";
  return path;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { products } = await listProducts({
      limit: 100,
      region_id: MEDUSA_REGION_ID || undefined,
      fields: "*variants.calculated_price,+variants.inventory_quantity",
    });
    return (products ?? []).map(mapProduct);
  } catch (error) {
    console.error("Error fetching products from Medusa:", error);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const { products } = await listProducts({
      handle,
      limit: 1,
      region_id: MEDUSA_REGION_ID || undefined,
      fields: "*variants.calculated_price,+variants.inventory_quantity",
    });
    const product = products?.[0];
    return product ? mapProduct(product) : null;
  } catch {
    return null;
  }
}
