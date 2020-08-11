import React from "react";
import {
  Button,
  Header,
  Icon,
  Segment,
  Grid,
  Container,
} from "semantic-ui-react";
import NewProduct from "../components/Productos/NewProduct";
const Vacio = (props) => {
  const {
    titulo,
    accion,
    setShow,
    setTitle,
    setChildren,
    setEnvi,
    setimg,
    setNumero,
  } = props;

  const onOpen = () => {
    setTitle(accion);
    setimg(
      "https://cdn.pixabay.com/photo/2018/03/22/02/37/background-3249063_960_720.png"
    );
    setChildren(
      <NewProduct
        setShow={setShow}
        setChildren={setChildren}
        setNumero={setNumero}
      />
    );
    setShow(true);
  };
  return (
    <Grid.Column width={16}>
      <Segment placeholder>
        <Header icon>
          <Icon name="plus" />
          No existen registros
        </Header>
      </Segment>
    </Grid.Column>
  );
};

export default Vacio;
