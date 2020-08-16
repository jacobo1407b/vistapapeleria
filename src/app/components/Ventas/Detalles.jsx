import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { useSnackbar } from "notistack";
import CardHeader from "@material-ui/core/CardHeader";
import { host, number_format } from "../../utils/utils";
import { Popup, Icon } from "semantic-ui-react";
import moment from "moment";
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
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
  var f = new Date(Date.now());
  const [tot, setTot] = useState(0);
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
        var suma = 0;
        result.map((poste) => {
          suma = suma + poste.total;
        });
        setTot(suma);
      })
      .catch((error) => {
        enqueueSnackbar("Error en la conexión", { variant: "error" });
      });
  }, []);
  return (
    <div id="genera">
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src="/img/logo.jpg"
            className={classes.large}
          />
        }
        title="Papeleria Arcoiris"
        subheader={"Reporte de venta: " + moment().format()}
      />
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
                <StyledTableCell align="center">
                  $ {number_format(row.iva, 2)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  $ {number_format(row.subtotal, 2)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  $ {number_format(row.total, 2)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">$ {number_format(tot, 2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />

        <Icon
          title="Generar reporte"
          name="file alternate"
          size="big"
          link
          onClick={() => window.print()}
        />
      </TableContainer>
    </div>
  );
};

export default Detalles;
