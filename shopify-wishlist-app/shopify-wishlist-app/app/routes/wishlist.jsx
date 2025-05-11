
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getSession, commitSession } from "../session.server";
import { products } from "../lib/products";
import ProductCard from "../components/ProductCard";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const wishlist = session.get("wishlist") || [];
  const savedProducts = products.filter(p => wishlist.includes(p.id));
  return json({ savedProducts });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  const productId = formData.get("productId");
  const session = await getSession(request.headers.get("Cookie"));
  let wishlist = session.get("wishlist") || [];

  if (actionType === "remove") {
    wishlist = wishlist.filter(id => id !== productId);
  }
  session.set("wishlist", wishlist);
  return redirect("/wishlist", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

export default function Wishlist() {
  const { savedProducts } = useLoaderData();
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {savedProducts.map(product => (
        <ProductCard key={product.id} product={product} isWishlist={true} />
      ))}
    </div>
  );
}
