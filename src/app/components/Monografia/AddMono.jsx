import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { updateMonografia } from "../../actions/actionMonografia";
import { useDispatch, useSelector } from "react-redux";
import { validacel } from "../../utils/utils";

const AddMono = ({ setShow }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const num = useSelector((store) => store.monografia);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const enviar = () => {
    if (!formData.nombre || !formData.codigo) {
      setError({
        content: "Completa el campo",
        pointing: "below",
      });
    } else if (!validacel(formData.codigo)) {
      enqueueSnackbar("Ingrese un Codigo valido", { variant: "error" });
    } else {
      setError(false);
      setloading(true);
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `BEARER ${localStorage.getItem("token")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        nombre: formData.nombre,
        codigo: formData.codigo,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${host}monografia/new-monografia`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setloading(false);
          if (!result.error) {
            dispatch(updateMonografia(num));
            enqueueSnackbar(result.message, { variant: "success" });
            setShow(false);
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
    <Form onChange={cambiar} onSubmit={enviar}>
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-error-email"
          control={Input}
          label="Nombre Monografia"
          placeholder="Nombre Monografia"
          error={error}
          name="nombre"
        />
        <Form.Field
          id="form-input-control-error-email"
          control={Input}
          label="Codigo Monografia"
          placeholder="Codigo Monografia"
          error={error}
          name="codigo"
        />
      </Form.Group>
      <Button primary fluid loading={loading}>
        Agregar
      </Button>
    </Form>
  );
};

export default AddMono;
