
# Shopify Wishlist App (Remix Embedded)

## Setup
1. Install dependencies:
```bash
npm install
```

2. Run the app:
```bash
npm run dev
```

## Features
- Dummy product list (4 products)
- "Save for Later" using session cookies
- `/products` page to view items
- `/wishlist` to manage saved products
- Dummy "Add to Cart" and "Move to Cart" actions

## Persistence
Session cookies using `@remix-run/node`'s `createCookieSessionStorage`

## Next Improvement
> Move session data to a real database and fetch product data via Shopify Storefront API.
