import React, { useEffect, useState } from "react";
import { host } from "../../utils/utils";
import { useSelector } from "react-redux";
import { Container, Pagination } from "semantic-ui-react";
import Vacio from "../Vacio";
import { useSnackbar } from "notistack";
import TablaVenta from "./TablaVentas";

const Ventas = (props) => {
  const [page, setpage] = useState(1);
  const [data, setdata] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [totalPages, setTotalPages] = useState(0);
  const { setShow, setTitle, setChildren, setEnvi, setimg } = props;
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
        console.log(result);
        setdata(result.data);
        setTotalPages(result.paginas);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  }, [page]);

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
          <TablaVenta
            data={data}
            setpage={setpage}
            setShow={setShow}
            setTitle={setTitle}
            setChildren={setChildren}
            setEnvi={setEnvi}
            setimg={setimg}
          />
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
        </Container>
      ) : (
        <Vacio />
      )}
    </div>
  );
};

export default Ventas;
