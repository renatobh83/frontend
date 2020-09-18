import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Grupos from "./components/Grupos";
import Users from "./components/Users";
import Pacientes from "./components/Pacientes/";

import { useAuth0 } from "./Auth0/context";
import Loading from "./Pages/Loading/index";
import Permissoes from "./components/Permissoes";
import Salas from "./components/Salas";
import Setor from "./components/Setor";
import Procedimentos from "./components/Procedimentos/index";
import Horarios from "./components/Horarios";
import Profile from "./components/Profile";
import Planos from "./components/Planos";
import Tabelas from "./components/Tabelas/index";
import Relatorios from "./components/Relatorios";

function Router() {
  const { isLoading, isAuthenticated } = useAuth0();

  const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (auth === true ? <Component {...props} /> : <Login />)}
    />
  );
  if (isLoading) {
    return <Loading />;
  }

  const RouteWithNav = () => {
    return (
      <>
        <Navbar />
        <Route path="/" exact component={Main} />
        <Route path="/users" component={Users} />
        <Route path="/grupo" component={Grupos} />
        <Route path="/agendar" component={Pacientes} />
        <Route path="/permissoes" component={Permissoes} />
        <Route path="/salas" component={Salas} />
        <Route path="/setor" component={Setor} />
        <Route path="/exames" component={Procedimentos} />
        <Route path="/horarios" component={Horarios} />
        <Route path="/profile" component={Profile} />
        <Route path="/planos" component={Planos} />
        <Route path="/tabelas" component={Tabelas} />
        <Route path="/relatorios" component={Relatorios} />
      </>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute auth={isAuthenticated} component={RouteWithNav} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
