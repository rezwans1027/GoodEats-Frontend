import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import UsernameMenu from "./UsernameMenu";

const Header = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="mx-auto container flex justify-between items-center">
        <Link
          className="text-3xl font-bold tracking-tight text-orange-500"
          to="/"
        >
          GoodEats.com
        </Link>
        <span className="flex space-x-2 items-center">
          {isAuthenticated ? (
            <UsernameMenu />
          ) : (
            <button
              onClick={async () => await loginWithRedirect()}
              className="text-xl font-bold hover:text-orange-500 active:text-orange-700"
            >
              Log In
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
