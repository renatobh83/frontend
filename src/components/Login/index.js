import React from "react";
import { FiHeart } from "react-icons/fi";
import { useAuth0 } from "../../Auth0/context";

import "./style.css";
function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container">
      <div className="logonContainer">
        <div className="logoConatiner">
          <FiHeart size={100} color={"white"} />
        </div>
        <div className="btnContainer">
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
