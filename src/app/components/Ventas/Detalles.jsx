import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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
    maxWidth: 1000,
  },
});

const Detalles = ({ data }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [datos, setdatos] = useState([]);
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

    fetch(`${host}ventas/detalles/${data.folio}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setdatos(result);
      })
      .catch((error) => {
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="lefth">Nombre</StyledTableCell>
            <StyledTableCell align="center">Cantidad</StyledTableCell>
            <StyledTableCell align="center">Iva</StyledTableCell>
            <StyledTableCell align="center">Subtotal</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((row, id) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {id + 1}
              </StyledTableCell>
              <StyledTableCell align="lefth">{row.producto}</StyledTableCell>
              <StyledTableCell align="center">{row.cantidad}</StyledTableCell>
              <StyledTableCell align="center">$ {row.iva}</StyledTableCell>
              <StyledTableCell align="center">$ {row.subtotal}</StyledTableCell>
              <StyledTableCell align="center">$ {row.total}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Detalles;
