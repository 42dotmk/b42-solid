import type { Product } from "~/types/shop";

const now = new Date().toISOString();

function mockImage(url: string, alt: string): Product["image"] {
  return {
    id: 0,
    url,
    alternativeText: alt,
    formats: null,
  };
}

export const mockProducts: Product[] = [
  {
    id: 1,
    documentId: "prod-001",
    name: "Base42 Hacker Tee",
    slug: "base42-hacker-tee",
    description:
      "Soft cotton tee with the Base42 logo and \"Answer to Everything\" tagline on the back. Available in dark charcoal.",
    price: 25,
    stock: 42,
    image: mockImage("/images/shop/hacker-tee.jpg", "Dark charcoal t-shirt"),
    category: "Apparel",
    featured: true,
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: 2,
    documentId: "prod-002",
    name: "Mechanical Keycap Set",
    slug: "mechanical-keycap-set",
    description:
      "Custom Base42-branded keycap set. Cherry MX compatible, PBT double-shot. Yellow legends on dark grey caps.",
    price: 35,
    stock: 15,
    image: mockImage("/images/shop/keycap-set.jpg", "Mechanical keyboard keycaps"),
    category: "Gear",
    featured: true,
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: 3,
    documentId: "prod-003",
    name: "Dev Sticker Pack",
    slug: "dev-sticker-pack",
    description:
      "Pack of 12 vinyl stickers featuring Base42 logos, programming puns, and community art. Weatherproof and laptop-safe.",
    price: 8,
    stock: 100,
    image: mockImage("/images/shop/sticker-pack.jpg", "Laptop covered in developer stickers"),
    category: "Stickers",
    featured: false,
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: 4,
    documentId: "prod-004",
    name: "Hackerspace Hoodie",
    slug: "hackerspace-hoodie",
    description:
      "Premium heavyweight hoodie with embroidered Base42 patch. Kangaroo pocket, ribbed cuffs. Available in black.",
    price: 55,
    stock: 20,
    image: mockImage("/images/shop/hoodie.jpg", "Black premium hoodie"),
    category: "Apparel",
    featured: true,
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: 5,
    documentId: "prod-005",
    name: "Coiled USB-C Cable",
    slug: "coiled-usb-c-cable",
    description:
      "Custom coiled USB-C cable with aviator connector. Yellow and dark grey paracord, 1.5m extended length.",
    price: 30,
    stock: 8,
    image: mockImage("/images/shop/usb-cable.jpg", "Coiled USB-C cable with aviator connector"),
    category: "Gear",
    featured: false,
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: 6,
    documentId: "prod-006",
    name: "Base42 Enamel Pin",
    slug: "base42-enamel-pin",
    description:
      "Hard enamel pin with the Base42 logo in yellow on dark nickel. Rubber clutch backing. 30mm diameter.",
    price: 6,
    stock: 50,
    image: mockImage("/images/shop/enamel-pin.jpg", "Enamel pin collection"),
    category: "Stickers",
    featured: false,
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
];
