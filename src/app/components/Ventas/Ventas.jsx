import React, { useEffect, useState } from "react";
import { host } from "../../utils/utils";
import { Container, Pagination, Grid, Dropdown, Form } from "semantic-ui-react";

import Vacio from "../Vacio";
import { useSnackbar } from "notistack";
import TablaVenta from "./TablaVentas";
import { updateVenta } from "../../actions/actionVenta";
import { useSelector, useDispatch } from "react-redux";

const Ventas = (props) => {
  const [page, setpage] = useState(1);
  const [data, setdata] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [totalPages, setTotalPages] = useState(0);
  const [estadoo, setEstado] = useState(estad());
  const { setShow, setTitle, setChildren, setEnvi, setimg } = props;
  const num = useSelector((store) => store.venta);
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

    fetch(`${host}ventas/index/${page}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        otraBusqueda();
        setdata(result.data);
        setTotalPages(result.paginas);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  }, [page, num]);

  const handlePaginationChange = (e, { activePage }) => {
    if (activePage < 0) {
      return false;
    } else {
      setpage(activePage);
    }
  };
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

    fetch(`${host}ventas/all`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var arr = [{ key: 0, text: "Todos los registros", value: "clear" }];
        result.data.map((data, i) => {
          arr.push({ key: i + 1, text: data.fecha, value: data });
        });

        setEstado({
          ...estadoo,
          options: arr,
        });
      })
      .catch((error) => {
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  };
  const handleChange = async (e, { value }) => {
    if (value === "clear") {
      dispatch(updateVenta(num));
    } else {
      setEstado({ ...estadoo, value });
      setdata([value]);
    }
  };
  const handleSearchChange = (e, { searchQuery }) =>
    setEstado({ ...estadoo, searchQuery });
  return (
    <div>
      <br />
      {data.length > 0 ? (
        <Container>
          <Grid stackable centered>
            <Grid.Row columns={1}>
              <Grid.Column width={6}>
                <Form.Field required>
                  <label>Buscar Venta</label>
                  <Dropdown
                    fluid
                    selection
                    icon="search"
                    multiple={false}
                    search={estadoo.search}
                    options={estadoo.options}
                    value={estadoo.value}
                    placeholder="Buscar Venta"
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
                <TablaVenta
                  data={data}
                  setpage={setpage}
                  setShow={setShow}
                  setTitle={setTitle}
                  setChildren={setChildren}
                  setEnvi={setEnvi}
                  setimg={setimg}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <Pagination
                  activePage={page}
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
        </Container>
      ) : (
        <Vacio />
      )}
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
export default Ventas;
