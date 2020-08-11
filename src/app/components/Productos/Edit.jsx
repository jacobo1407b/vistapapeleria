import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { validacel, IsNumeric, host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { agregarProductoAction } from "../../actions/actionProducto";

const Edit = (props) => {
  const { data, setNumero, setShow, setChildren } = props;
  const [error, seterror] = useState(false);
  const [formData, setFormData] = useState(data);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const num = useSelector((store) => store.numero);

  const cambiar = (e) => {
    const { value, name } = e.target;
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
      setloading(true);
      seterror(false);
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

      fetch(
        `${host}productos/update/producto/${parseInt(formData.id, 10)}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setloading(false);
          if (!result.error) {
            enqueueSnackbar(result.message, { variant: "success" });
            dispatch(agregarProductoAction(num));
            setShow(false);
            setChildren(null);
          } else {
            enqueueSnackbar(result.message, { variant: "error" });
          }
        })
        .catch((error) => {
          setloading(false);
          enqueueSnackbar("Error en la conexión", { variant: "error" });
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
          defaultValue={formData.nombre}
          error={error}
        />
        <Form.Input
          iconPosition="left"
          placeholder="Precio"
          name="precio"
          defaultValue={formData.precio}
          error={error}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          iconPosition="left"
          placeholder="Cantidad inicial"
          name="cantidad"
          defaultValue={formData.cantidad}
          error={error}
        />
        <Form.Input
          iconPosition="left"
          placeholder="Categoria"
          name="categoria"
          defaultValue={formData.categoria}
          error={error}
        />
      </Form.Group>
      <Button fluid color="blue" loading={loading}>
        Agregar
      </Button>
    </Form>
  );
};

export default Edit;
