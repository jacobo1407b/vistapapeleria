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
import { validateEmail, host } from "../../utils/utils";
import { Link } from "react-router-dom";
const Login = ({ setuser, setReLoad }) => {
  const [formD, setFormD] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setloading] = useState(false);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setFormD({
      ...formD,
      [name]: value,
    });
  };

  const enviar = () => {
    if (!formD.email || !formD.password) {
      enqueueSnackbar("Complete los campos", { variant: "error" });
      return false;
    } else if (!validateEmail(formD.email)) {
      enqueueSnackbar("Ingrese un correo valido", { variant: "error" });
      return false;
    } else {
      setloading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(formD);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${host}user/login/auth`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            enqueueSnackbar(result.message, { variant: "error" });
            setloading(false);
          } else {
            localStorage.setItem("token", result.jwt);
            setloading(false);
            setuser("from");
            setReLoad(true);
          }
        })
        .catch((error) => {
          setloading(false);
          console.log(error);
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
            Ingresa en tu cuenta
          </Header>
          <Form size="large" onChange={cambiar} onSubmit={enviar}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="correo electrónico"
                name="email"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
              />

              <Button color="teal" fluid size="large" loading={loading}>
                Ingresar
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to="/registro">Registro</Link>
          </Message>
          <Message>
            <Link to="/about">Contacto</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
