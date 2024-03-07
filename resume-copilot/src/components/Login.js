import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      {/* Include any additional markup for your login page here */}
      <button onClick={() => loginWithRedirect()} className="login-button">
        Log In with Auth0
      </button>
      {/* You can add more buttons for other login methods here */}
    </div>
  );
};

export default Login;
