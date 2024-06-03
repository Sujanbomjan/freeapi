import { useShopping } from "./shoppingContext";

const Cart = () => {
  const { cart, removeFromCart } = useShopping();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-4 mb-4"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 object-contain mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  ${item.price} x {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
