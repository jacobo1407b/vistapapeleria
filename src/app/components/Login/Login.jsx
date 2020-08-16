import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { validateEmail, host } from "../../utils/utils";
import { withRouter } from "react-router-dom";
import { Dimmer, Loader, Popup, Icon } from "semantic-ui-react";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/img/fondo.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ setuser, setReLoad, history }) => {
  const [formD, setFormD] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setloading] = useState(false);
  const classes = useStyles();

  const cambiar = (e) => {
    const { name, value } = e.target;
    setFormD({
      ...formD,
      [name]: value,
    });
  };

  const enviar = (e) => {
    e.preventDefault();
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
    <div>
      <Dimmer active={loading}>
        <Loader size="massive">Iniciando...</Loader>
      </Dimmer>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form
              className={classes.form}
              noValidate
              onChange={cambiar}
              onSubmit={enviar}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <div className="espaciado">
                <FormControlLabel
                  control={
                    <Popup
                      trigger={
                        <Icon
                          size="big"
                          link
                          name="twitter"
                          onClick={() =>
                            redirectOpen("https://twitter.com/PapeleraArcoir1")
                          }
                        />
                      }
                      content="Twitter"
                      style={{ opacity: 0.8 }}
                      inverted
                    />
                  }
                />
                <FormControlLabel
                  control={
                    <Popup
                      trigger={
                        <Icon
                          onClick={() =>
                            redirectOpen(
                              "https://www.google.com/maps/place/19%C2%B023'53.0%22N+98%C2%B002'04.3%22W/@19.3980648,-98.036704,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d19.3980648!4d-98.0345153?hl=es"
                            )
                          }
                          size="big"
                          link
                          name="map marker alternate"
                        />
                      }
                      content="Google Maps"
                      style={{ opacity: 0.8 }}
                      inverted
                    />
                  }
                />
                <FormControlLabel
                  control={
                    <Popup
                      trigger={
                        <Icon
                          size="big"
                          link
                          onClick={() =>
                            redirectOpen("mailto:parcoiris793@gmail.com")
                          }
                          name="mail"
                        />
                      }
                      content="Gmail"
                      style={{ opacity: 0.8 }}
                      inverted
                    />
                  }
                  label="      "
                />
                <FormControlLabel
                  control={
                    <Popup
                      trigger={
                        <Icon
                          size="big"
                          link
                          name="whatsapp"
                          onClick={() => redirectOpen("https://wa.link/qcj9xs")}
                        />
                      }
                      content="WhatsApp"
                      style={{ opacity: 0.8 }}
                      inverted
                    />
                  }
                />
                <FormControlLabel
                  control={
                    <Popup
                      trigger={
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
                      }
                      content="Facebook"
                      style={{ opacity: 0.8 }}
                      inverted
                    />
                  }
                />
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Ingresar
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => history.push("/registro")}
                  >
                    {"Registro"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Login);

/**
 * <div>
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
 */
