import React, { useEffect } from "react";
import { Button, Header, Icon, Segment, Container } from "semantic-ui-react";

const About = () => {
  const redirectOpen = (url) => {
    window.open(url, "_blank");
  };

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
            <Icon
              size="huge"
              name="facebook"
              link
              onClick={() =>
                redirectOpen(
                  "https://www.facebook.com/Papeler%C3%ADa-Arcoiris-100546968391855/?modal=admin_todo_tour"
                )
              }
            />
            <Icon size="huge" name="skype" link />
            <Icon
              size="huge"
              name="twitter"
              link
              onClick={() =>
                redirectOpen("https://twitter.com/PapeleraArcoir1")
              }
            />
            <Icon
              size="huge"
              name="whatsapp square"
              onClick={() => redirectOpen("https://wa.link/qcj9xs")}
              link
            />
            <Icon
              size="huge"
              name="mail"
              link
              onClick={() => redirectOpen("mailto:parcoiris793@gmail.com")}
            />
            <Icon
              size="huge"
              name="map marker alternate"
              onClick={() =>
                redirectOpen(
                  "https://www.google.com/maps/place/19%C2%B023'53.0%22N+98%C2%B002'04.3%22W/@19.3980648,-98.036704,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d19.3980648!4d-98.0345153?hl=es"
                )
              }
              link
            />
          </Segment.Inline>
        </Segment>
      </Container>
    </div>
  );
};

export default About;
