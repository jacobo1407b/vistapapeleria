import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { useSnackbar } from "notistack";
import { validateEmail, host, validacel } from "../../utils/utils";
import { Link, withRouter } from "react-router-dom";

const Registro = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formD, setFormD] = useState({
    apellidop: "",
    apellidom: "",
    direccion: "",
    telefono: "",
  });
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState({});
  const cambiar = (e) => {
    const { name, value } = e.target;
    setFormD({
      ...formD,
      [name]: value,
    });
  };
  const enviar = () => {
    if (!formD.email) {
      setErr({
        email: true,
      });
    } else if (!formD.nombre) {
      setErr({
        name: true,
      });
    } else if (!formD.username) {
      setErr({
        username: true,
      });
    } else if (!formD.password || !formD.password2) {
      setErr({
        pass: true,
      });
    } else if (formD.password !== formD.password2) {
      setErr({});
      enqueueSnackbar("Confirme su contrasela", { variant: "error" });
    } else if (!validateEmail(formD.email)) {
      setErr({});
      enqueueSnackbar("Ingrese un correo valido", { variant: "error" });
      return false;
    } else if (
      !formD.telefono ||
      !validacel(formD.telefono) ||
      formD.telefono.length !== 10
    ) {
      setErr({});
      enqueueSnackbar("Ingrese un teléfono valido", { variant: "error" });
    } else {
      setloading(true);
      setErr({});
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(formD);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${host}user/register`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setloading(false);
          if (result.error) {
            enqueueSnackbar(result.message, { variant: "error" });
          } else {
            props.history.push("/");
            enqueueSnackbar(result.message, { variant: "success" });
          }
        })
        .catch((error) => {
          setloading(false);
          enqueueSnackbar("Error en la conexión", { variant: "error" });
        });
    }
  };
  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Registro
          </Header>
          <Form size="large" onChange={cambiar} onSubmit={enviar}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Nombre"
                name="nombre"
                error={err.name}
              />
              <Form.Input
                fluid
                iconPosition="left"
                placeholder="Apellido paterno"
                name="apellidop"
              />
              <Form.Input
                fluid
                iconPosition="left"
                placeholder="Apellido Materno"
                name="apellidom"
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="correo electrónico"
                name="email"
                error={err.email}
              />
              <Form.Input
                fluid
                iconPosition="left"
                icon="lock"
                placeholder="Password"
                name="password"
                type="password"
                error={err.pass}
              />
              <Form.Input
                fluid
                iconPosition="left"
                icon="lock"
                placeholder="confirmar Password"
                name="password2"
                type="password"
                error={err.pass}
              />
              <Form.Input
                fluid
                iconPosition="left"
                placeholder="¿Como quieres que te llamemos?"
                name="username"
                error={err.username}
              />
              <Form.Input
                fluid
                iconPosition="left"
                placeholder="Dirección"
                name="direccion"
              />
              <Form.Input
                fluid
                iconPosition="left"
                placeholder="Teléfono"
                name="telefono"
              />

              <Button color="teal" fluid size="large" loading={loading}>
                Registrar
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to="/">Ingresar</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default withRouter(Registro);
