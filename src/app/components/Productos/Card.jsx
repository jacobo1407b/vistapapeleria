import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Icon, Grid, Popup } from "semantic-ui-react";
import Swal from "sweetalert2";
import { host, number_format } from "../../utils/utils";
import { useSnackbar } from "notistack";
import Edita from "./Edit";
import { useDispatch, useSelector } from "react-redux";
import { agregarProductoAction } from "../../actions/actionProducto";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Carta = ({
  data,
  setNumero,
  numero,
  setShow,
  setTitle,
  setChildren,
  setimg,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const num = useSelector((store) => store.numero);
  //const [data, setdata] = useState({precio:"",id:0,cantidad:0,})
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openModal = (dt) => {
    handleClose();
    setTitle("Editar producto");
    setimg(
      "https://cdn.pixabay.com/photo/2018/03/22/02/37/background-3249063_960_720.png"
    );
    setChildren(
      <Edita
        data={dt}
        setNumero={setNumero}
        setShow={setShow}
        setChildren={setChildren}
      />
    );
    setShow(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const eliminar = (idpro) => {
    handleClose();
    parseInt(idpro, 10);
    Swal.fire({
      title: "¿Eliminar producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
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
        fetch(`${host}productos/delete/producto/${idpro}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.error) {
              enqueueSnackbar(result.message, { variant: "error" });
            } else {
              enqueueSnackbar(result.message, { variant: "success" });
              dispatch(agregarProductoAction(num));
            }
          })
          .catch((error) => {
            enqueueSnackbar("Error en la conexión", { variant: "error" });
          });
      }
    });
  };

  return (
    <Grid columns={3} stackable>
      {data.map((poste) => {
        return (
          <Grid.Column key={poste.id}>
            <br />

            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Popup
                    trigger={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {poste.cantidad}
                      </Avatar>
                    }
                    content={"Cantidad en stock " + poste.cantidad}
                    style={{ opacity: 0.8 }}
                    inverted
                  />
                }
                /*action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                  </IconButton>
                }*/
                title={poste.nombre}
                subheader={`Pecio $${number_format(poste.precio, 2)}MXN`}
              />
              <CardMedia
                className={classes.media}
                image={
                  poste.url.lenght > 0
                    ? poste.url
                    : "https://cdn.pixabay.com/photo/2018/03/22/02/37/background-3249063_960_720.png"
                }
                title={poste.nombre}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Categoria: {poste.categoria}
                </Typography>
              </CardContent>

              <MenuItem onClick={() => openModal(poste)}>
                <Icon name="pencil alternate" size="large" />
                Editar
              </MenuItem>
              <MenuItem onClick={() => eliminar(poste.id)}>
                <Icon name="trash alternate" size="large" />
                Eliminar
              </MenuItem>
            </Card>
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

export default Carta;
