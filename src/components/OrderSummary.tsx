import { Restaurant } from "@/types";
import { CartItem } from "../pages/DetailPage";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

interface OrderSummaryProps {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
}

const OrderSummary = ({
  restaurant,
  cartItems,
  removeFromCart,
}: OrderSummaryProps) => {
  const getTotalCost = () => {
    const total =
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
      restaurant.deliveryPrice;

    return (total / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Order Summary</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                onClick={() => removeFromCart(item)}
                width={20}
                height={20}
              />
              ${((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
