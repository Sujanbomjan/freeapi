import { useEffect, useState } from "react";
import { useShopping } from "./shoppingContext";
import Skeleton from "react-loading-skeleton";

const ProductList = () => {
  const { products, fetchProducts, addToCart } = useShopping();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <Skeleton width={200} height={300} />
            </div>
          ))}
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
