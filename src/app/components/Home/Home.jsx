import React from "react";
import { Image, Popup, Grid, Header, Icon, Container } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const Home = (props) => {
  const redirectOpen = (url) => {
    window.open(url, "_blank");
  };
  return (
    <>
      <br />
      <Grid stackable divided>
        <Grid.Column width={3}>
          <Grid columns={1} stackable textAlign="center">
            <Grid.Column>
              <Header icon>Buscanos en:</Header>
              <br />
              <br />
              <br />
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

              <br />
              <br />
              <br />
              <br />
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

              <br />
              <br />
              <br />
              <br />
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

              <br />
              <br />
              <br />
              <br />
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

              <br />
              <br />
              <br />
              <br />
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

              <br />
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={10}>
          <Image src="/img/index.jpg" fluid size="huge" />
        </Grid.Column>
        <Grid.Column width={2}>
          <Header icon>Catalogos:</Header>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Grid columns={1} stackable textAlign="center">
            <Icon
              name="images outline"
              size="massive"
              link
              onClick={() => props.history.push("/monografias")}
            />
            Monografias
            <br />
            <br />
            <br />
            <br />
            <Icon
              name="address book outline"
              size="massive"
              link
              onClick={() => props.history.push("/biografias")}
            />
            Biografias
          </Grid>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default withRouter(Home);
//Dta base: PAPELERIADANI
// DTA BASE USER: J1407B
//PASSWORD:6@\dRKhB}Dd_Os9T

//DB Name:id14581626_papeleriadani
//DB User:	id14581626_j1407b
//host : localhost
