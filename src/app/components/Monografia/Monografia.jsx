import React, { useEffect, useState } from "react";
import { host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import Tabla from "./CardMono";
import Vacio from "../Vacio";
import { Container, Form, Pagination, Dropdown, Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateMonografia } from "../../actions/actionMonografia";

const Monografia = (props) => {
  const { setShow, setTitle, setChildren, setEnvi, setimg } = props;
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [estadoo, setEstado] = useState(estad());
  const num = useSelector((store) => store.monografia);
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

    fetch(`${host}monografia/getmonografia/${page}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        otraBusqueda();
        setdata(result.data);
        setTotalPages(result.paginas);
      })
      .catch((error) => {
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  }, [page, num]);

  const handlePaginationChange = (e, { activePage }) => {
    if (activePage < 0) {
      return false;
    } else {
      setPage(activePage);
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

    fetch(`${host}monografia/index`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var arr = [{ key: 0, text: "Todos los registros", value: "clear" }];
        result.data.map((data, i) => {
          arr.push({ key: i + 1, text: data.nombre, value: data });
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
      dispatch(updateMonografia(num));
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
            <br />
            <Grid.Row columns={1}>
              <Grid.Column width={6}>
                <Form.Field required>
                  <label>Buscar Monografia</label>
                  <Dropdown
                    fluid
                    selection
                    icon="search"
                    multiple={false}
                    search={estadoo.search}
                    options={estadoo.options}
                    value={estadoo.value}
                    placeholder="Buscar Monografia"
                    onChange={handleChange}
                    onSearchChange={handleSearchChange}
                    disabled={estadoo.isFetching}
                    loading={estadoo.isFetching}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column width={9}>
                <Tabla
                  data={data}
                  setShow={setShow}
                  setTitle={setTitle}
                  setChildren={setChildren}
                  setEnvi={setEnvi}
                  setimg={setimg}
                  setPage={setPage}
                />
              </Grid.Column>
            </Grid.Row>

            <br />
            <Grid.Row columns={1}>
              <Grid.Column width={10}>
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
export default Monografia;
