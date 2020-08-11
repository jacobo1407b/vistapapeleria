import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Productos from "../components/Productos/Productos";
import Monografia from "../components/Monografia/Monografia";
import Biografia from "../components/Biografia/Biografia";
import Ventas from "../components/Ventas/Ventas";
import NewVenta from "../components/Ventas/NewVenta";
const Routes = (props) => {
  const { setShow, setTitle, setChildren, setEnvi, setimg } = props;
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/productos">
          <Productos
            setShow={setShow}
            setTitle={setTitle}
            setChildren={setChildren}
            setEnvi={setEnvi}
            setimg={setimg}
          />
        </Route>
        <Route exact path="/monografias">
          <Monografia
            setShow={setShow}
            setTitle={setTitle}
            setChildren={setChildren}
            setEnvi={setEnvi}
            setimg={setimg}
          />
        </Route>
        <Route exact path="/biografias">
          <Biografia
            setShow={setShow}
            setTitle={setTitle}
            setChildren={setChildren}
            setEnvi={setEnvi}
            setimg={setimg}
          />
        </Route>
        <Route exact path="/ventas">
          <Ventas
            setShow={setShow}
            setTitle={setTitle}
            setChildren={setChildren}
            setEnvi={setEnvi}
            setimg={setimg}
          />
        </Route>
        <Route exact path="/new-ventas">
          <NewVenta />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
