import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import UsernameMenu from "./UsernameMenu";

const Header = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="mx-auto container max-sm:px-4 flex justify-between items-center">
        <Link
          className="sm:text-3xl text-2xl font-bold tracking-tight text-orange-500"
          to="/"
        >
          GoodEats.com
        </Link>
        <span className="flex space-x-2 items-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/order-status"
                className="text-lg font-bold hover:text-orange-500 active:text-orange-700"
              >
                Orders
              </Link>
              <UsernameMenu />
            </>
          ) : (
            <button
              onClick={async () => await loginWithRedirect()}
              className="text-xl max-sm:text-lg font-bold hover:text-orange-500 active:text-orange-700"
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
