# Strapi Webhook: Stripe checkout.session.completed

Drop this into your Strapi project to handle stock decrement after successful Stripe payments.

## 1. Create the webhook route

**File:** `src/api/stripe/routes/stripe.ts`

```ts
export default {
  routes: [
    {
      method: "POST",
      path: "/stripe/webhook",
      handler: "stripe.handleWebhook",
      config: {
        auth: false, // Stripe webhooks are unauthenticated
      },
    },
  ],
};
```

## 2. Create the controller

**File:** `src/api/stripe/controllers/stripe.ts`

```ts
import type { Core } from "@strapi/strapi";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async handleWebhook(ctx) {
    const sig = ctx.request.headers["stripe-signature"];
    const rawBody = ctx.request.body[Symbol.for("unparsedBody")] ?? ctx.request.body;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig as string,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      strapi.log.error("Stripe webhook signature verification failed:", err);
      ctx.status = 400;
      ctx.body = { error: "Invalid signature" };
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const itemsJson = session.metadata?.items;

      if (!itemsJson) {
        strapi.log.warn("No items metadata on checkout session", session.id);
        ctx.status = 200;
        ctx.body = { received: true };
        return;
      }

      const items: { slug: string; quantity: number }[] = JSON.parse(itemsJson);

      for (const item of items) {
        try {
          const products = await strapi.documents("api::product.product").findMany({
            filters: { slug: item.slug },
            limit: 1,
          });

          if (products.length === 0) {
            strapi.log.warn(`Product not found for slug: ${item.slug}`);
            continue;
          }

          const product = products[0];
          const newStock = Math.max(0, (product.stock ?? 0) - item.quantity);

          await strapi.documents("api::product.product").update({
            documentId: product.documentId,
            data: { stock: newStock },
          });

          strapi.log.info(
            `Stock decremented: ${product.name} ${product.stock} -> ${newStock}`
          );
        } catch (err) {
          strapi.log.error(`Failed to update stock for ${item.slug}:`, err);
        }
      }
    }

    ctx.status = 200;
    ctx.body = { received: true };
  },
});
```

## 3. Environment variables

Add to your Strapi `.env`:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 4. Register the webhook in Stripe

```bash
# For local development with Stripe CLI:
stripe listen --forward-to localhost:1337/api/stripe/webhook

# For production, add the webhook URL in the Stripe Dashboard:
# https://your-strapi-domain.com/api/stripe/webhook
# Listen for: checkout.session.completed
```

## 5. Raw body middleware (if needed)

Strapi v5 may parse the body before your controller receives it. If signature verification fails, add a middleware to preserve the raw body:

**File:** `src/middlewares/stripe-raw-body.ts`

```ts
export default () => {
  return async (ctx, next) => {
    if (ctx.request.url === "/api/stripe/webhook") {
      const chunks: Buffer[] = [];
      for await (const chunk of ctx.req) {
        chunks.push(chunk);
      }
      const raw = Buffer.concat(chunks);
      ctx.request.body = JSON.parse(raw.toString());
      ctx.request.body[Symbol.for("unparsedBody")] = raw;
    }
    await next();
  };
};
```

Register in `config/middlewares.ts`:
```ts
export default [
  // ... other middlewares
  { resolve: "./src/middlewares/stripe-raw-body" },
  // ...
];
```
