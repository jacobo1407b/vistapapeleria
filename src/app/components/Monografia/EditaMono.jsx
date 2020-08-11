import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { updateMonografia } from "../../actions/actionMonografia";

const EditaMono = (props) => {
  const { setPage, data, setShow } = props;
  const [formdata, setdata] = useState(data);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const num = useSelector((store) => store.monografia);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setdata({
      ...formdata,
      [name]: value,
    });
  };

  const enviar = () => {
    if (!formdata.nombre) {
      setError({
        content: "Complete el campo",
        pointing: "below",
      });
    } else {
      setError(false);
      setloading(true);
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `BEARER ${localStorage.getItem("token")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ nombre: formdata.nombre });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${host}monografia/actualiza-monografia/${parseInt(data.id, 10)}`,
        requestOptions
      )
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
          label="Nombre monografia"
          placeholder="Nombre monografia"
          name="nombre"
          defaultValue={data.nombre}
          error={error}
        />
      </Form.Group>
      <Button fluid primary loading={loading}>
        Actualizar
      </Button>
    </Form>
  );
};

export default EditaMono;
