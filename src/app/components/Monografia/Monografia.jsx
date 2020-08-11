import React, { useEffect, useState } from "react";
import { host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import Tabla from "./CardMono";
import Vacio from "../Vacio";
import { Container, Pagination } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Monografia = (props) => {
  const { setShow, setTitle, setChildren, setEnvi, setimg } = props;
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const num = useSelector((store) => store.monografia);
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
  return (
    <div>
      <br />
      {data.length > 0 ? (
        <Container>
          <Tabla
            data={data}
            setShow={setShow}
            setTitle={setTitle}
            setChildren={setChildren}
            setEnvi={setEnvi}
            setimg={setimg}
            setPage={setPage}
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

export default Monografia;
