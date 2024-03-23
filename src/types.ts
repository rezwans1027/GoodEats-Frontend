export interface User {
  _id: string;
  email: string;
  name?: string;
  addressLine1?: string;
  country?: string;
  city?: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
}

export interface Restaurant {
  _id: string;
  user: string;
  restaurantName: string;
  cuisines: string[];
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  imageUrl: string;
  menuItems: MenuItem[];
  lastUpdated: string;
}

export interface RestaurantSearchResponse {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};
