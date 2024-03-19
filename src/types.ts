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