import React from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import Login from "../components/Login/Login";
import Registro from "../components/Registro/Registro";
import About from '../components/About/About';
import Novedades from '../components/About/Novedades';
const Nouser = ({ setuser, setReLoad }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login setuser={setuser} setReLoad={setReLoad} />
        </Route>
        <Route exact path="/registro">
          <Registro />
        </Route>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route exact path="/novedades">
          <Novedades/>
        </Route>

        <Route exact path="*">
          <Redirect to ="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Nouser;
