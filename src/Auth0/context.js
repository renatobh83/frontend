import React, { createContext, useContext, useState, useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { setToken } from "../Utils/inLogin";
import { ServerON, findOrCreatePatient } from "../api/serviceAPI";

export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

function Auth0Provider({
  children,
  onRedirectCAllback = DEFAULT_REDIRECT_CALLBACK,
  ...initOption
}) {
  const [state, setState] = useState({
    ShowResult: false,
    responseAPI: "",
    error: null,
  });
  const [auth0Client, setAuth0] = useState();
  const [userLogin, setUserLogin] = useState(" ");
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Init Auth0
  const init = async () => {
    console.log("init");
    if (!navigator.userAgent.includes("jsdon")) {
      const auth0FromHook = await createAuth0Client(initOption);

      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCAllback(appState);
      }
      const isAuthenticated = await auth0FromHook.isAuthenticated();
      if (isAuthenticated) {
        const { __raw: token } = await auth0FromHook.getIdTokenClaims();
        setToken(token);
        const { sub: origin, ...userData } = await auth0FromHook.getUser();
        await findOrCreateUsers(userData);
        console.log(state);
      }

      setIsAuthenticated(isAuthenticated);
      setLoading(false);
    }
  };

  const findOrCreateUsers = async (user) => {
    const { email, name, nickname } = user;
    const data = {
      email: email,
      nome: name,
      username: nickname,
      paciente: true,
    };

    await findOrCreatePatient(data)
      .then((response) =>
        setState({
          ...state,
          responseAPI: response.data,
        })
      )
      .catch((err) =>
        setState({
          ...state,
          error: err.message,
        })
      );
  };
  useEffect(async () => {
    await ServerON()
      .then(() => init())
      .catch((err) => alert(err.message));
  }, []); // elint-disable-line

  const configObject = {
    userLogin,
    isAuthenticated,
    isLoading,
    state,
    loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
    logout: (...p) => auth0Client.logout(...p),
  };

  return (
    <Auth0Context.Provider value={configObject}>
      {children}
    </Auth0Context.Provider>
  );
}

export default Auth0Provider;
