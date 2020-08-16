import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/actionBio";
import { validacel } from "../../utils/utils";

const NewBio = ({ setShow }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const num = useSelector((store) => store.biografia);

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
      setError(false);
      enqueueSnackbar("Ingrese un numero en el codigo", { variant: "error" });
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
        codigo: parseInt(formData.codigo, 10),
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${host}biografia/new-biografia`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setloading(false);
          if (!result.error) {
            dispatch(updateBio(num));
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
          label="Nombre Biografia"
          placeholder="Nombre biografia"
          error={error}
          name="nombre"
        />
        <Form.Field
          id="form-input-control-error-email"
          control={Input}
          label="Codigo Biografia"
          placeholder="Codigo biografia"
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

export default NewBio;
