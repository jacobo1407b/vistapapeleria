import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Container,
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
        method: "PUT",
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

  const redirectOpen = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div style={{ backgroundImage: "url(/img/index.jpg)" }}>
      <Grid
        style={{ height: "100vh" }}
        verticalAlign="middle"
        stackable
        divided
      >
        <Grid.Column width={2}>
          <Grid columns={1} stackable textAlign="center">
            <Grid.Column>
              <Header icon>Buscanos en:</Header>
              <br />
              <br />
              <br />
              <Icon
                size="big"
                link
                name="facebook"
                onClick={() =>
                  redirectOpen(
                    "https://www.facebook.com/Papeler%C3%ADa-Arcoiris-100546968391855/?modal=admin_todo_tour"
                  )
                }
              />
              <br />
              <br />
              <br />
              <br />
              <Icon size="big" link name="skype" />
              <br />
              <br />
              <br />
              <br />
              <Icon
                size="big"
                link
                name="whatsapp"
                onClick={() => redirectOpen("https://wa.link/qcj9xs")}
              />
              <br />
              <br />
              <br />
              <br />
              <Icon
                size="big"
                link
                name="mail"
                onClick={() => redirectOpen("mailto:parcoiris793@gmail.com")}
              />
              <br />
              <br />
              <br />
              <br />
              <Icon
                size="big"
                link
                name="twitter"
                onClick={() =>
                  redirectOpen("https://twitter.com/PapeleraArcoir1")
                }
              />
              <br />
              <br />
              <br />
              <br />
              <Icon
                size="big"
                link
                name="map marker alternate"
                onClick={() =>
                  redirectOpen(
                    "https://www.google.com/maps/place/19%C2%B023'53.0%22N+98%C2%B002'04.3%22W/@19.3980648,-98.036704,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d19.3980648!4d-98.0345153?hl=es"
                  )
                }
              />
              <br />
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid columns={1} stackable textAlign="center">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Container>
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
              </Container>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={2}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Grid columns={1} stackable textAlign="center">
            <br />
            <br />
            <br />
            <br />
          </Grid>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
