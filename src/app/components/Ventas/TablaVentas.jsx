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
import Detalles from "./Detalles";
import { number_format } from "../../utils/utils";
import { Popup } from "semantic-ui-react";
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
    maxWidth: 1200,
  },
});

const TablaVentas = (props) => {
  const { data, setShow, setTitle, setChildren, setEnvi, setimg } = props;
  const classes = useStyles();

  const detalles = (datosventa) => {
    setTitle(`Venta folio:  ${datosventa.folio}`);
    setChildren(<Detalles data={datosventa} />);
    setimg(null);
    setShow(true);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="lefth">Folio</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
            <StyledTableCell align="center">Detalle</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.folio}
              </StyledTableCell>
              <StyledTableCell align="lefth">{row.fecha}</StyledTableCell>
              <StyledTableCell align="lefth">
                ${number_format(row.total, 2)}
              </StyledTableCell>
              <StyledTableCell align="lefth">
                <Popup
                  trigger={
                    <Icon
                      name="eye"
                      size="big"
                      link
                      onClick={() => detalles(row)}
                    />
                  }
                  content="Ver detalles"
                  inverted
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaVentas;
