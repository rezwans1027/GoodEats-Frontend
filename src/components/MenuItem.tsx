import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface MenuItemProps {
  menuItem: MenuItem;
  addToCart: (menuItem: MenuItem) => void
}

const MenuItemCard = ({ menuItem, addToCart }: MenuItemProps) => {
  return (
    <Card onClick={() => addToCart(menuItem)} className="cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
