import React, { useEffect } from "react";
import { Button, Header, Icon, Segment, Container } from "semantic-ui-react";

const About = () => {
  return (
    <div style={{ backgroundImage: `url("/img/Fondo.jpg")`, height: "100vh" }}>
      <Container>
        <br />
        <br />
        <br />
        <br />
        <Segment placeholder textAlign="center">
          <Header icon>
            <h1>Gracias por tu prefrencia</h1>
          </Header>
          <h3>
            Seguimos mejorando dia con dia para brindarte el mejor servicio.
            Contactanos en nuestras redes sociales para darnos tu opinion. Para
            nosotros tu opinion cuenta y cuenta mucho.
          </h3>
          <Segment.Inline>
            <Icon size="huge" name="facebook" link />
            <Icon size="huge" name="skype" link />
            <Icon size="huge" name="twitter" link />
            <Icon size="huge" name="whatsapp square" link />
            <Icon size="huge" name="mail" link />
            <Icon size="huge" name="map marker alternate" link />
          </Segment.Inline>
        </Segment>
      </Container>
    </div>
  );
};

export default About;
