import React from "react";
import {
  Image,
  Segment,
  Grid,
  Header,
  Icon,
  Container,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <br />
      <Grid stackable divided>
        <Grid.Column width={2}>
          <Grid columns={1} stackable textAlign="center">
            <Grid.Column>
              <Header icon>Buscanos en:</Header>
              <br />
              <br />
              <br />
              <Icon size="big" link name="facebook" />
              <br />
              <br />
              <br />
              <br />
              <Icon size="big" link name="skype" />
              <br />
              <br />
              <br />
              <br />
              <Icon size="big" link name="whatsapp" />
              <br />
              <br />
              <br />
              <br />
              <Icon size="big" link name="mail" />
              <br />
              <br />
              <br />
              <br />
              <Icon size="big" link name="twitter" />
              <br />
              <br />
              <br />
              <br />
              <Icon size="big" link name="map marker alternate" />
              <br />
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={12}>
          <Container>
            <Image src="/img/index.jpg" fluid size="huge" />
          </Container>
        </Grid.Column>
        <Grid.Column width={2}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Grid columns={1} stackable textAlign="center">
            <Link to="/ventas">
              <Icon name="shopping cart" size="massive" link />
            </Link>
            Ventas
            <br />
            <br />
            <br />
            <br />
            <Icon name="gift" size="massive" link />
            Novedades
          </Grid>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Home;
//Dta base: PAPELERIADANI
// DTA BASE USER: J1407B
//PASSWORD:6@\dRKhB}Dd_Os9T

//DB Name:id14581626_papeleriadani
//DB User:	id14581626_j1407b
//host : localhost
