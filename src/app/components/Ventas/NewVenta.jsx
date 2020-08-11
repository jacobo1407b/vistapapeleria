import React, { useEffect, useState } from "react";
import {
  Segment,
  Form,
  Input,
  Button,
  Table,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { host } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";

const NewVenta = () => {
  const [datos, setdatos] = useState([]);
  const [tempData, setTempData] = useState({});
  const [genderOptions, setgenderOptions] = useState([]);
  const [dataTabla, setdataTabla] = useState([]);
  const [err, seterr] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [load, setload] = useState(false);
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

    fetch(`${host}productos/todos`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setdatos(result);
        let temArr = [];
        result.map((p, i) => {
          temArr.push({ key: p.id, text: p.nombre, value: p });
        });
        setgenderOptions(temArr);
      })
      .catch((error) => {
        enqueueSnackbar("Error en la conexion", { variant: "error" });
      });
  }, []);

  const changeOption = (e, { value }) => {
    setTempData({
      ...tempData,
      id: value.id,
      pro: value.nombre,
      precio: value.precio,
      ca: parseInt(value.cantidad, 10),
    });
    console.log(value);
  };
  const cambio = (e) => {
    const { name, value } = e.target;
    if (parseInt(value, 10) > tempData.ca) {
      seterr({
        content: `La cantida es mayor al stock con ${tempData.ca}`,
        pointing: "below",
      });
      return false;
    } else {
      seterr(false);
      setTempData({
        ...tempData,
        cantidad: value,
      });
    }
  };

  const ad = () => {
    seterr(false);
    if (!tempData.cantidad || !tempData.precio || !tempData.pro) {
      enqueueSnackbar("Complete el formulario", { variant: "error" });
    } else {
      let subtotal = 0,
        IVA = 0,
        Tota = 0;
      subtotal = parseInt(tempData.cantidad, 10) * parseInt(tempData.precio);
      IVA = (subtotal * 16) / 100;
      Tota = subtotal + IVA;
      tempData.iva = IVA;
      (tempData.sub = subtotal), (tempData.total = Tota);
      setdataTabla([...dataTabla, tempData]);
      setTempData({});
      setdatos([]);
      document.getElementById("form-input-control-last-name").value = "";
    }
  };

  const Enviar = () => {
    if (dataTabla.length <= 0) {
      enqueueSnackbar("Llene la tabla", { variant: "error" });
    } else {
      setload(true);
      var f = Date.now();
      var n = new Date(f);
      var obje = {
        data: dataTabla,
        fecha: n,
        folio: uuidv4(),
      };

      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `BEARER ${localStorage.getItem("token")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(obje);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${host}ventas/newventa`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setload(false);
          if (result.error) {
            enqueueSnackbar(result.message, { variant: "error" });
          } else {
            setdataTabla([]);
            enqueueSnackbar(result.message, { variant: "success" });
          }
        })
        .catch((error) => {
          setload(false);
          enqueueSnackbar("Error en la conexión", { variant: "error" });
        });
    }
  };
  return (
    <div>
      <Dimmer active={load}>
        <Loader size="massive">Enviando...</Loader>
      </Dimmer>
      <Segment color="black">
        <Form>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              name="pro"
              label="Producto"
              placeholder="Producto"
              options={genderOptions}
              onChange={changeOption}
            />
            <Form.Field
              id="form-input-control-first-name"
              control={Input}
              label="Precio"
              placeholder="Precio"
              defaultValue={tempData.precio}
              name="precio"
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Cantidad"
              placeholder="Cantidad"
              onChange={cambio}
              defaultValue={tempData.cantidad}
              value={tempData.cantidad}
              name="cantidad"
              error={err}
            />
          </Form.Group>

          <Form.Field
            id="form-button-control-public"
            control={Button}
            onClick={ad}
            content="Agregar Producto"
          />
        </Form>
      </Segment>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Producto</Table.HeaderCell>
            <Table.HeaderCell>Cantidad a vender</Table.HeaderCell>
            <Table.HeaderCell>iva</Table.HeaderCell>
            <Table.HeaderCell>Sub Total</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {dataTabla.map((poste, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell>{poste.pro}</Table.Cell>
                <Table.Cell>{poste.cantidad}</Table.Cell>
                <Table.Cell>{poste.iva}</Table.Cell>
                <Table.Cell>{poste.sub}</Table.Cell>
                <Table.Cell>{poste.total}</Table.Cell>
                <Table.Cell negative>X</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Form.Field
        id="form-button-control-public"
        control={Button}
        onClick={Enviar}
        content="Enviar Info"
      />
    </div>
  );
};

export default NewVenta;
