import React, { useEffect, useState } from "react";
import { host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { Container, Pagination, Form, Dropdown, Grid } from "semantic-ui-react";
import TablaBio from "./TablaBio";
import Vacio from "../Vacio";
import { useSelector, useDispatch } from "react-redux";
import { updateBio } from "../../actions/actionBio";

const Biografia = (props) => {
  const { setShow, setTitle, setChildren, setEnvi, setimg } = props;

  const [data, setData] = useState([]);
  const [page, setpage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [totalPages, setTotalPages] = useState(0);
  const [estadoo, setEstado] = useState(estad());
  const num = useSelector((store) => store.biografia);
  const dispatch = useDispatch();

  useEffect(() => {
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

    fetch(`${host}biografia/getbiografia/${page}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        otraBusqueda();
        setData(result.data);
        setTotalPages(result.paginas);
      })
      .catch((error) => {
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  }, [page, num]);
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

    fetch(`${host}biografia/todo`, requestOptions)
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
      dispatch(updateBio(num));
    } else {
      setEstado({ ...estadoo, value });
      setData([value]);
    }
  };
  const handleSearchChange = (e, { searchQuery }) =>
    setEstado({ ...estadoo, searchQuery });

  const handlePaginationChange = (e, { activePage }) => {
    if (activePage < 0) {
      return false;
    } else {
      setpage(activePage);
    }
  };
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
                  <label>Buscar Biografia</label>
                  <Dropdown
                    fluid
                    selection
                    icon="search"
                    multiple={false}
                    search={estadoo.search}
                    options={estadoo.options}
                    value={estadoo.value}
                    placeholder="Buscar Biografia"
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
                <TablaBio
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
              <Grid.Column width={6}>
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
export default Biografia;
