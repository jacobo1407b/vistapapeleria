import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Icon } from "semantic-ui-react";
import Swal from "sweetalert2";
import Edita from "./Edita";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/actionBio";
import { useSnackbar } from "notistack";
import { host } from "../../utils/utils";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#454545",
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 0,
    maxWidth: 700,
  },
});

const TablaBio = (props) => {
  const {
    data,
    setpage,
    setShow,
    setTitle,
    setChildren,
    setEnvi,
    setimg,
  } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const num = useSelector((store) => store.biografia);

  const eliminar = (id) => {
    Swal.fire({
      title: "¿Eliminar este regristo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si",
    }).then((result) => {
      if (result.value) {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `BEARER ${localStorage.getItem("token")}`
        );

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(`${host}biografia/eliminar-biografia/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (!result.error) {
              dispatch(updateBio(num));
              enqueueSnackbar(result.message, { variant: "success" });
            } else {
              enqueueSnackbar(result.message, { variant: "error" });
            }
          })
          .catch((error) => {
            enqueueSnackbar("Error en la conexión", { variant: "error" });
          });
      }
    });
  };

  const editar = (data) => {
    setTitle("Editar biografia");
    setimg(null);
    setChildren(<Edita data={data} setShow={setShow} setpage={setpage} />);
    setShow(true);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Codigo</StyledTableCell>
            <StyledTableCell align="lefth">Nombre</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, id) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.codigo}
              </StyledTableCell>
              <StyledTableCell align="lefth">{row.nombre}</StyledTableCell>
              <StyledTableCell align="center">
                <Icon
                  name="pencil alternate"
                  size="large"
                  link
                  onClick={() => editar(row)}
                />{" "}
                <Icon
                  name="trash alternate"
                  size="large"
                  link
                  onClick={() => eliminar(row.id)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaBio;
