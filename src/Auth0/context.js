import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { setToken } from "../Utils/inLogin";
import { ServerON, findOrCreatePatient, getUserLogin } from "../api/serviceAPI";

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
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Init Auth0
  const init = async () => {
    console.log("init");

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
      await getUserInMongo();
    }
    setIsAuthenticated(isAuthenticated);

    setLoading(false);
  };
  const getUserInMongo = async () => {
    await getUserLogin()
      .then((response) => {
        setState({
          ...state,
          responseAPI: response.data,
        });
      })
      .catch((err) =>
        setState({
          ...state,
          error: err.message,
        })
      );
  };

  const checkServer = useCallback(async () => {
    await ServerON()
      .then(() => {
        init();
      })
      .catch((err) => alert(err.message));
  }, []); // eslint-disable-line
  useEffect(() => {
    checkServer();
  }, []); // eslint-disable-line

  const configObject = {
    isAuthenticated,
    isLoading,
    state,
    loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
    getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
    logout: (...p) => auth0Client.logout(...p),
  };

  return (
    <Auth0Context.Provider value={configObject}>
      {children}
    </Auth0Context.Provider>
  );
}

export default Auth0Provider;
