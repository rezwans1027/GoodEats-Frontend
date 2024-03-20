import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        <div className="max-sm:hidden">{user?.email}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-3 top-2 sm:-right-20">
        <DropdownMenuItem onClick={() => navigate("/user-profile")}>
          User Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/manage-restaurant")}>
          Manage Restaurant
        </DropdownMenuItem>
        <Separator className="w-[90%] mx-auto my-1" />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold hover:bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
