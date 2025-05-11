
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getSession, commitSession } from "../session.server";
import { products } from "../lib/products";
import ProductCard from "../components/ProductCard";

export const loader = async ({ request }) => {
  return json({ products });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const productId = formData.get("productId");
  const session = await getSession(request.headers.get("Cookie"));
  let wishlist = session.get("wishlist") || [];
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    session.set("wishlist", wishlist);
  }
  return redirect("/products", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

export default function Products() {
  const { products } = useLoaderData();
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} isWishlist={false} />
      ))}
    </div>
  );
}
