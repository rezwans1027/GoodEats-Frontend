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
import { useState } from "react";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  const [showMenu, setShowMenu] = useState(false);
  console.log(showMenu, "showMenu")
  const navigate = useNavigate();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={() => setShowMenu(true)}  className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        <div className="max-sm:hidden">{user?.email}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-3 top-2 sm:-right-20">
        <DropdownMenuItem onClick={() => setShowMenu(false)}>
          {/* <Link to="/user-profile" className="font-bold hover:text-orange-500"> */}
            User Profile
          {/* </Link> */}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/')}>

            Manage Restaurant

        </DropdownMenuItem>
        <Separator className="w-[90%] mx-auto my-1" />
        <DropdownMenuItem onClick={() => setShowMenu(false)}>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold hover:bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  //   <DropdownMenu>
  //   <DropdownMenuTrigger asChild>
  //     <Button variant="outline">Open</Button>
  //   </DropdownMenuTrigger>
  //   <DropdownMenuContent className="w-56">
  //     <DropdownMenuLabel>Appearance</DropdownMenuLabel>
  //     <DropdownMenuSeparator />
  //     <DropdownMenuCheckboxItem
  //     >
  //       Status Bar
  //     </DropdownMenuCheckboxItem>
  //     <DropdownMenuCheckboxItem
  //       disabled
  //     >
  //       Activity Bar
  //     </DropdownMenuCheckboxItem>
  //     <DropdownMenuCheckboxItem
  //     >
  //       Panel
  //     </DropdownMenuCheckboxItem>
  //   </DropdownMenuContent>
  // </DropdownMenu>
  );
};

export default UsernameMenu;
