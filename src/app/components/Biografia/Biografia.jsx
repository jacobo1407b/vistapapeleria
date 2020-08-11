import React, { useEffect, useState } from "react";
import { host } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { Container, Pagination } from "semantic-ui-react";
import TablaBio from "./TablaBio";
import Vacio from "../Vacio";
import { useSelector } from "react-redux";

const Biografia = (props) => {
  const { setShow, setTitle, setChildren, setEnvi, setimg } = props;

  const [data, setData] = useState([]);
  const [page, setpage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [totalPages, setTotalPages] = useState(0);
  const num = useSelector((store) => store.biografia);

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

    fetch(`${host}biografia/getbiografia/${page}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
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
      setpage(activePage);
    }
  };
  return (
    <div>
      <br />
      {data.length > 0 ? (
        <Container>
          <TablaBio
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

export default Biografia;
