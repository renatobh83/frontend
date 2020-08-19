import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import App from "./App";

import Auth0Provider from "./Auth0/context";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    client_id={process.env.REACT_APP_CLIENT_ID}
    redirect_uri={window.location.origin}
    cacheLocation="localstorage"
    useRefreshTokens="true"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
