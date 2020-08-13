import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { validacel, IsNumeric, host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { agregarProductoAction } from "../../actions/actionProducto";

const NewProduct = ({ setShow, setChildren, setNumero }) => {
  const [formData, setFormData] = useState({ url: "" });
  const [error, seterror] = useState(false);
  const [loadin, setloadin] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const num = useSelector((store) => store.numero);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const enviar = () => {
    const { nombre, precio, cantidad, categoria } = formData;
    if (!nombre || !precio || !cantidad || !categoria) {
      seterror(true);
    } else if (!validacel(cantidad) || cantidad < 0) {
      seterror(false);
      enqueueSnackbar("Ingrese una cantidad valida", { variant: "error" });
    } else if (!IsNumeric(precio) || precio <= 0) {
      seterror(false);
      enqueueSnackbar("Ingrese una precio valida", { variant: "error" });
    } else {
      setloadin(true);
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `BEARER ${localStorage.getItem("token")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(formData);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${host}productos/new-product`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            dispatch(agregarProductoAction(num));
            enqueueSnackbar(result.message, { variant: "success" });
            //setNumero(-1);
            // setNumero(0);
            setloadin(false);
            setShow(false);
            setChildren(null);
          } else {
            setloadin(false);
            enqueueSnackbar(result.message, { variant: "error" });
          }
        })
        .catch((error) => {
          console.log(error);
          setloadin(false);
          enqueueSnackbar("Error en la solicitud", { variant: "error" });
        });
    }
  };
  return (
    <Form onSubmit={enviar} onChange={cambiar}>
      <Form.Group>
        <Form.Input
          iconPosition="left"
          placeholder="Producto"
          name="nombre"
          error={error}
        />
        <Form.Input
          iconPosition="left"
          placeholder="Precio"
          name="precio"
          error={error}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          iconPosition="left"
          placeholder="Cantidad inicial"
          name="cantidad"
          error={error}
        />
        <Form.Input
          iconPosition="left"
          placeholder="Categoria"
          name="categoria"
          error={error}
        />
      </Form.Group>
      <Button fluid color="blue" loading={loadin}>
        Agregar
      </Button>
    </Form>
  );
};

export default NewProduct;
