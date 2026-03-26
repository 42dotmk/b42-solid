import { createRoot, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import type { CartItem, Product } from "~/types/shop";
import {
  createCart,
  retrieveCart,
  addLineItem,
  updateLineItem,
  deleteLineItem,
  MEDUSA_REGION_ID,
} from "~/lib/medusa";

const CART_ID_KEY = "b42_cart_id";

function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_ID_KEY);
}

function storeCartId(id: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_ID_KEY, id);
  }
}

function clearStoredCartId() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_ID_KEY);
  }
}

function mapLineItems(serverCart: any): CartItem[] {
  return (serverCart.items ?? []).map((item: any) => ({
    lineItemId: item.id,
    productId: item.product_id ?? "",
    variantId: item.variant_id ?? "",
    title: item.title ?? item.product_title ?? "",
    thumbnail: item.thumbnail ?? null,
    price: item.unit_price ?? 0,
    currencyCode: serverCart.currency_code ?? "eur",
    quantity: item.quantity,
    total: item.total ?? item.unit_price * item.quantity,
    stock: item.variant?.inventory_quantity ?? 999,
  }));
}

function createCartStore() {
  const [items, setItems] = createStore<CartItem[]>([]);
  const [isOpen, setIsOpen] = createSignal(false);
  const [cartId, setCartId] = createSignal<string | null>(getStoredCartId());
  const [loading, setLoading] = createSignal(false);

  async function ensureCart(): Promise<string> {
    let id = cartId();
    if (id) return id;

    const { cart } = await createCart({
      region_id: MEDUSA_REGION_ID || undefined,
    });
    id = cart.id;
    setCartId(id);
    storeCartId(id);
    return id;
  }

  async function syncCart(id?: string) {
    const cid = id ?? cartId();
    if (!cid) return;
    try {
      const { cart: serverCart } = await retrieveCart(cid);
      setItems(mapLineItems(serverCart));
    } catch (error: any) {
      if (error?.message?.includes("404") || error?.message?.includes("not found")) {
        clearStoredCartId();
        setCartId(null);
        setItems([]);
      }
    }
  }

  async function loadCart() {
    const id = getStoredCartId();
    if (id) {
      setCartId(id);
      await syncCart(id);
    }
  }

  async function addItem(product: Product) {
    setLoading(true);
    try {
      const cid = await ensureCart();
      await addLineItem(cid, {
        variant_id: product.variantId,
        quantity: 1,
      });
      await syncCart(cid);
      setIsOpen(true);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(lineItemId: string) {
    const cid = cartId();
    if (!cid) return;
    setLoading(true);
    try {
      setItems(prev => prev.filter(i => i.lineItemId !== lineItemId));
      await deleteLineItem(cid, lineItemId);
      await syncCart(cid);
    } catch (error) {
      console.error("Failed to remove item:", error);
      await syncCart(cid);
    } finally {
      setLoading(false);
    }
  }

  async function updateItemQuantity(lineItemId: string, quantity: number) {
    const cid = cartId();
    if (!cid) return;
    if (quantity <= 0) {
      await removeItem(lineItemId);
      return;
    }
    setLoading(true);
    try {
      setItems(
        i => i.lineItemId === lineItemId,
        "quantity",
        () => quantity
      );
      await updateLineItem(cid, lineItemId, { quantity });
      await syncCart(cid);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      await syncCart(cid);
    } finally {
      setLoading(false);
    }
  }

  async function clearAllItems() {
    const cid = cartId();
    if (!cid) return;
    setLoading(true);
    try {
      for (const item of items) {
        await deleteLineItem(cid, item.lineItemId);
      }
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    } finally {
      setLoading(false);
    }
  }

  function resetCart() {
    clearStoredCartId();
    setCartId(null);
    setItems([]);
  }

  const totalItems = () => items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = () => items.reduce((sum, i) => sum + i.total, 0);

  return {
    items,
    isOpen,
    setIsOpen,
    cartId,
    loading,
    addItem,
    removeItem,
    updateQuantity: updateItemQuantity,
    clearCart: clearAllItems,
    resetCart,
    loadCart,
    totalItems,
    totalPrice,
  };
}

export const cart = createRoot(createCartStore);
