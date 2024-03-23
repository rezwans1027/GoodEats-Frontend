import { Restaurant } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
            {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex max-[420px]:flex-wrap">
        {restaurant.cuisines.map((item, index) => (
            <span key={item} className="flex">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
            </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
