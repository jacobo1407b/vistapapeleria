import React, { useEffect, useState, Fragment } from "react";
import { host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { Container, Pagination, Grid } from "semantic-ui-react";
import Card from "./Card";
import Vacio from "../Vacio";
import { useSelector } from "react-redux";

const Productos = (props) => {
  const { setShow, setTitle, setChildren, setEnvi, setimg } = props;
  const [productos, setProductos] = useState([]);
  const [numero, setNumero] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const co = useSelector((store) => store.numero);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `BEARER ${localStorage.getItem("token")}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${host}productos/getproducto/${numero}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProductos(result.data);
        setTotalPages(result.paginas);
      })
      .catch((error) => {
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  }, [numero, co]);

  const handlePaginationChange = (e, { activePage }) => {
    if (activePage < 0) {
      return false;
    } else {
      setNumero(activePage);
    }
  };
  return (
    <div>
      {productos.length === 0 ? (
        <Vacio
          titulo="No existen registros"
          accion="Agregar producto"
          setShow={setShow}
          setTitle={setTitle}
          setChildren={setChildren}
          setEnvi={setEnvi}
          setimg={setimg}
          setNumero={setNumero}
        />
      ) : (
        <Fragment>
          <Container>
            <Card
              data={productos}
              setNumero={setNumero}
              numero={numero}
              setChildren={setChildren}
              setShow={setShow}
              setTitle={setTitle}
              setimg={setimg}
            />
          </Container>

          <Grid.Row columns={1}>
            <Grid.Column width={6}>
              <Pagination
                activePage={numero}
                boundaryRange={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={totalPages}
                onPageChange={handlePaginationChange}
              />
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      )}
    </div>
  );
};

export default Productos;
