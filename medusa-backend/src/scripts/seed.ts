/**
 * Seed script for Base42 shop products.
 * Run via: docker exec b42_medusa_dev npx medusa exec ./src/scripts/seed.ts
 */
import {
  ExecArgs,
} from "@medusajs/framework/types";
import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk";

export default async function seed({ container }: ExecArgs) {
  const logger = container.resolve("logger");

  // ---- Region ----
  const regionService = container.resolve("region");
  let regions = await regionService.listRegions({ currency_code: "eur" });
  let region = regions[0];

  if (!region) {
    logger.info("Creating EUR region...");
    const created = await regionService.createRegions({
      name: "Europe",
      currency_code: "eur",
      countries: ["mk", "de", "fr", "nl", "at", "bg", "rs", "hr", "si", "al", "me", "xk"],
    });
    region = Array.isArray(created) ? created[0] : created;
  }
  logger.info(`Region: ${region.id} (${region.name})`);

  // ---- Sales Channel ----
  const salesChannelService = container.resolve("sales_channel");
  let channels = await salesChannelService.listSalesChannels({ name: "Base42 Webshop" });
  let channel = channels[0];

  if (!channel) {
    logger.info("Creating sales channel...");
    const created = await salesChannelService.createSalesChannels({
      name: "Base42 Webshop",
      description: "Base42 hackerspace online store",
    });
    channel = Array.isArray(created) ? created[0] : created;
  }
  logger.info(`Sales Channel: ${channel.id}`);

  // ---- Product Categories ----
  const categoryService = container.resolve("product_category");
  const categoryMap: Record<string, any> = {};

  for (const cat of ["Apparel", "Gear", "Stickers"]) {
    let cats = await categoryService.listProductCategories({ name: cat });
    if (cats[0]) {
      categoryMap[cat] = cats[0];
    } else {
      const created = await categoryService.createProductCategories({
        name: cat,
        handle: cat.toLowerCase(),
        is_active: true,
      });
      categoryMap[cat] = Array.isArray(created) ? created[0] : created;
    }
    logger.info(`Category: ${categoryMap[cat].id} (${cat})`);
  }

  // ---- Products ----
  const productService = container.resolve("product");
  const pricingService = container.resolve("pricing");
  const inventoryService = container.resolve("inventory");
  const linkService = container.resolve("link");

  const products = [
    {
      title: "Base42 Hacker Tee",
      handle: "base42-hacker-tee",
      description: 'Soft cotton tee with the Base42 logo and "Answer to Everything" tagline on the back. Available in dark charcoal.',
      thumbnail: "/images/shop/hacker-tee.jpg",
      category: "Apparel",
      price: 2500,
      stock: 42,
      featured: true,
    },
    {
      title: "Mechanical Keycap Set",
      handle: "mechanical-keycap-set",
      description: "Custom Base42-branded keycap set. Cherry MX compatible, PBT double-shot. Yellow legends on dark grey caps.",
      thumbnail: "/images/shop/keycap-set.jpg",
      category: "Gear",
      price: 3500,
      stock: 15,
      featured: true,
    },
    {
      title: "Dev Sticker Pack",
      handle: "dev-sticker-pack",
      description: "Pack of 12 vinyl stickers featuring Base42 logos, programming puns, and community art. Weatherproof and laptop-safe.",
      thumbnail: "/images/shop/sticker-pack.jpg",
      category: "Stickers",
      price: 800,
      stock: 100,
      featured: false,
    },
    {
      title: "Hackerspace Hoodie",
      handle: "hackerspace-hoodie",
      description: "Premium heavyweight hoodie with embroidered Base42 patch. Kangaroo pocket, ribbed cuffs. Available in black.",
      thumbnail: "/images/shop/hoodie.jpg",
      category: "Apparel",
      price: 5500,
      stock: 20,
      featured: true,
    },
    {
      title: "Coiled USB-C Cable",
      handle: "coiled-usb-c-cable",
      description: "Custom coiled USB-C cable with aviator connector. Yellow and dark grey paracord, 1.5m extended length.",
      thumbnail: "/images/shop/usb-cable.jpg",
      category: "Gear",
      price: 3000,
      stock: 8,
      featured: false,
    },
    {
      title: "Base42 Enamel Pin",
      handle: "base42-enamel-pin",
      description: "Hard enamel pin with the Base42 logo in yellow on dark nickel. Rubber clutch backing. 30mm diameter.",
      thumbnail: "/images/shop/enamel-pin.jpg",
      category: "Stickers",
      price: 600,
      stock: 50,
      featured: false,
    },
  ];

  for (const p of products) {
    // Check if product exists
    const existing = await productService.listProducts({ handle: p.handle });
    if (existing[0]) {
      logger.info(`Product already exists: ${p.title}`);
      continue;
    }

    logger.info(`Creating product: ${p.title}`);

    // Create the product with a variant
    const created = await productService.createProducts({
      title: p.title,
      handle: p.handle,
      description: p.description,
      thumbnail: p.thumbnail,
      status: "published",
      categories: [{ id: categoryMap[p.category].id }],
      metadata: p.featured ? { featured: true } : {},
      options: [
        {
          title: "Default",
          values: ["Default"],
        },
      ],
      variants: [
        {
          title: "Default",
          manage_inventory: true,
          options: { Default: "Default" },
        },
      ],
    });
    const product = Array.isArray(created) ? created[0] : created;
    const variant = product.variants[0];

    // Create price set and link to variant
    const priceSet = await pricingService.createPriceSets({
      prices: [
        {
          amount: p.price,
          currency_code: "eur",
          rules: { region_id: region.id },
        },
      ],
    });
    const ps = Array.isArray(priceSet) ? priceSet[0] : priceSet;

    await linkService.create({
      productService: { variant_id: variant.id },
      pricingService: { price_set_id: ps.id },
    });

    // Create inventory item and stock
    const inventoryItem = await inventoryService.createInventoryItems({
      sku: p.handle,
      title: p.title,
    });
    const invItem = Array.isArray(inventoryItem) ? inventoryItem[0] : inventoryItem;

    // Link inventory to variant
    await linkService.create({
      productService: { variant_id: variant.id },
      inventoryService: { inventory_item_id: invItem.id },
    });

    // Get or create stock location
    const stockLocationService = container.resolve("stock_location");
    let locations = await stockLocationService.listStockLocations({ name: "Base42 HQ" });
    let location = locations[0];
    if (!location) {
      const loc = await stockLocationService.createStockLocations({
        name: "Base42 HQ",
        address: {
          address_1: "Rimska 25",
          city: "Skopje",
          country_code: "mk",
        },
      });
      location = Array.isArray(loc) ? loc[0] : loc;
    }

    // Set inventory level
    await inventoryService.createInventoryLevels({
      inventory_item_id: invItem.id,
      location_id: location.id,
      stocked_quantity: p.stock,
    });

    logger.info(`  -> Created: ${product.id}, variant: ${variant.id}, price: €${p.price / 100}`);
  }

  // ---- Publishable API Key ----
  const apiKeyService = container.resolve("api_key");
  let keys = await apiKeyService.listApiKeys({ title: "Base42 Storefront" });
  let apiKey = keys[0];

  if (!apiKey) {
    logger.info("Creating publishable API key...");
    const created = await apiKeyService.createApiKeys({
      title: "Base42 Storefront",
      type: "publishable",
    });
    apiKey = Array.isArray(created) ? created[0] : created;
  }

  logger.info("");
  logger.info("====================================");
  logger.info("  SEED COMPLETE");
  logger.info("====================================");
  logger.info(`  Region ID:         ${region.id}`);
  logger.info(`  Publishable Key:   ${apiKey.token}`);
  logger.info(`  Sales Channel:     ${channel.id}`);
  logger.info("");
  logger.info("  Add these to your .env:");
  logger.info(`  VITE_MEDUSA_PUBLISHABLE_KEY=${apiKey.token}`);
  logger.info(`  MEDUSA_PUBLISHABLE_KEY=${apiKey.token}`);
  logger.info(`  VITE_MEDUSA_REGION_ID=${region.id}`);
  logger.info(`  MEDUSA_REGION_ID=${region.id}`);
  logger.info("====================================");
}
