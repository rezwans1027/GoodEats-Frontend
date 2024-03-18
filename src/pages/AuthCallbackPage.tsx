import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();
    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({ auth0id: user.sub, email: user.email });
            hasCreatedUser.current = true;
          }
          navigate("/");

          return () => {};
    } , [user, createUser, navigate]);

  return (
    <div>AuthCallbackPage</div>
  )
}

export default AuthCallbackPage