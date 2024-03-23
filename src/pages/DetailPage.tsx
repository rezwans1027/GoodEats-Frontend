import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemCard from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
    let updatedCart;
    if (cartItems.find((cartItem) => cartItem._id === menuItem._id)) {
      updatedCart = cartItems.map((cartItem) =>
        cartItem._id === menuItem._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else updatedCart = [...cartItems, { ...menuItem, quantity: 1 }];

    setCartItems(updatedCart);

    sessionStorage.setItem(
      `cartItems-${restaurantId}`,
      JSON.stringify(updatedCart)
    );
  };

  const removeFromCart = (cartItem: CartItem) => {
    let updatedCart;
    if (cartItem.quantity === 1)
      updatedCart = cartItems.filter((item) => item._id !== cartItem._id);
    else
      updatedCart = cartItems.map((item) =>
        item._id === cartItem._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    setCartItems(updatedCart);

    sessionStorage.setItem(
      `cartItems-${restaurantId}`,
      JSON.stringify(updatedCart)
    );
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) return;
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 4}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_350px] gap-5 lg:px-32 mt-8 h-fit">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((item) => (
            <MenuItemCard
              key={item._id}
              addToCart={addToCart}
              menuItem={item}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
