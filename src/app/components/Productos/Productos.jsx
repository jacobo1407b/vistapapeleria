import React, { useEffect, useState, Fragment } from "react";
import { host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { Container, Pagination, Grid, Form, Dropdown } from "semantic-ui-react";
import Card from "./Card";
import Vacio from "../Vacio";
import { useSelector, useDispatch } from "react-redux";
import { agregarProductoAction } from "../../actions/actionProducto";

const Productos = (props) => {
  const { setShow, setTitle, setChildren, setEnvi, setimg } = props;
  const [productos, setProductos] = useState([]);
  const [numero, setNumero] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [estadoo, setEstado] = useState(estad());
  const { enqueueSnackbar } = useSnackbar();
  const co = useSelector((store) => store.numero);
  const dispatch = useDispatch();

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
        otraBusqueda();
        setTotalPages(result.paginas);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  }, [numero, co]);

  const otraBusqueda = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `BEARER ${localStorage.getItem("token")}`
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${host}productos/todos`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var arr = [{ key: 0, text: "Todos los registros", value: "clear" }];
        result.map((data, i) => {
          arr.push({ key: i + 1, text: data.nombre, value: data });
        });

        setEstado({
          ...estadoo,
          options: arr,
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  };

  const handlePaginationChange = (e, { activePage }) => {
    if (activePage < 0) {
      return false;
    } else {
      setNumero(activePage);
    }
  };

  const handleChange = async (e, { value }) => {
    if (value === "clear") {
      dispatch(agregarProductoAction(co));
    } else {
      setEstado({ ...estadoo, value });
      setProductos([value]);
    }
  };
  const handleSearchChange = (e, { searchQuery }) =>
    setEstado({ ...estadoo, searchQuery });

  return (
    <div>
      <Container>
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
            <Grid stackable centered>
              <br />
              <Grid.Row columns={1}>
                <Grid.Column width={6}>
                  <br />
                  <Form.Field required>
                    <label>Buscar Producto</label>
                    <Dropdown
                      fluid
                      selection
                      multiple={false}
                      icon="search"
                      search={estadoo.search}
                      options={estadoo.options}
                      value={estadoo.value}
                      placeholder="Buscar Producto"
                      onChange={handleChange}
                      onSearchChange={handleSearchChange}
                      disabled={estadoo.isFetching}
                      loading={estadoo.isFetching}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column width={16}>
                  <Card
                    data={productos}
                    setNumero={setNumero}
                    numero={numero}
                    setChildren={setChildren}
                    setShow={setShow}
                    setTitle={setTitle}
                    setimg={setimg}
                  />
                </Grid.Column>
              </Grid.Row>

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
            </Grid>
          </Fragment>
        )}
      </Container>
    </div>
  );
};

function estad() {
  return {
    isFetching: false,
    multiple: true,
    search: true,
    searchQuery: null,
    value: "",
    options: [],
  };
}
export default Productos;
