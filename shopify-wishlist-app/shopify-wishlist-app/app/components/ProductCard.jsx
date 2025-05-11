
import { Form } from "@remix-run/react";

export default function ProductCard({ product, isWishlist }) {
  return (
    <div className="border p-4 rounded shadow w-72">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      <h2 className="text-lg font-bold mt-2">{product.title}</h2>
      <p>{product.description}</p>
      <p className="font-semibold mt-1">{product.price}</p>
      <div className="mt-2 space-x-2">
        {!isWishlist && (
          <Form method="post">
            <input type="hidden" name="productId" value={product.id} />
            <button type="submit" name="_action" value="save" className="bg-blue-500 text-white px-2 py-1 rounded">Save for Later</button>
          </Form>
        )}
        {isWishlist && (
          <>
            <Form method="post">
              <input type="hidden" name="productId" value={product.id} />
              <button type="submit" name="_action" value="remove" className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </Form>
            <button className="bg-green-500 text-white px-2 py-1 rounded">Move to Cart</button>
          </>
        )}
      </div>
    </div>
  );
}
