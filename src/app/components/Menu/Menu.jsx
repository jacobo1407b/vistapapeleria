import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

import MoreIcon from "@material-ui/icons/MoreVert";
import Icon from "@material-ui/core/Icon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import AddMono from "../Monografia/AddMono";
import NewBio from "../Biografia/NewBio";
import NewProduct from "../Productos/NewProduct";
import NewVenta from "../Ventas/NewVenta";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const MenuBarr = (props) => {
  //setShow = { setShow };
  const {
    setVisible,
    visible,
    setuser,
    setShow,
    setTitle,
    setChildren,
    setEnvi,
    setimg,
  } = props;
  const [numero, setnumero] = useState(0); //quitar despues

  const menuleft = () => {
    setVisible(!visible);
  };
  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
    setuser(false);
  };

  const newMono = () => {
    handleMenuClose();
    setTitle("Agregar Monografia");
    setimg(null);
    setChildren(<AddMono setShow={setShow} />);
    setShow(true);
  };

  const addBio = () => {
    handleMenuClose();
    setTitle("Agregar Biografia");
    setimg(null);
    setChildren(<NewBio setShow={setShow} />);
    setShow(true);
  };

  const addVenta = () => {
    props.history.push("/new-ventas");
  };

  const addProduct = () => {
    handleMenuClose();
    setTitle("Agregar Producto");
    setimg(
      "https://cdn.pixabay.com/photo/2018/03/22/02/37/background-3249063_960_720.png"
    );
    setChildren(
      <NewProduct
        setShow={setShow}
        setChildren={setChildren}
        setNumero={setnumero}
      />
    );
    setShow(true);
  };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={newMono}>Monografia</MenuItem>
      <MenuItem onClick={addBio}>Biografia</MenuItem>
      <MenuItem onClick={addProduct}>Producto</MenuItem>
      <MenuItem onClick={addVenta}>Venta</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Icon>add_circle</Icon>
        </IconButton>
        <p>Agregar</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Salir</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={menuleft}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className={classes.sectionDesktop}>
            <Button
              color="inherit"
              onClick={() => props.history.push("/ventas")}
            >
              Ventas
            </Button>
            <Button
              color="inherit"
              onClick={() => props.history.push("/productos")}
            >
              Productos
            </Button>
            <Button
              color="inherit"
              onClick={() => props.history.push("/monografias")}
            >
              Monografias
            </Button>
            <Button
              color="inherit"
              onClick={() => props.history.push("/biografias")}
            >
              Biografias
            </Button>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Icon>add_circle</Icon>
            </IconButton>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={logout}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withRouter(MenuBarr);
/**
 * return (
    <div>
      <nav className="nav-extended blue">
        <div className="nav-wrapper">
          <a
            data-target="mobile-demo"
            className="sidenav-trigger"
            onClick={menuleft}
          >
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li className={active === "/" ? "active" : ""}>
              <Link to="/">Inicio</Link>
            </li>
            <li className={active === "/productos" ? "active" : ""}>
              <Link to="/productos">Productos</Link>
            </li>
            <li className={active === "/monografias" ? "active" : ""}>
              <Link to="/monografias">Monografias</Link>
            </li>
            <li className={active === "/biografias" ? "active" : ""}>
              <Link to="/biografias">Biografias</Link>
            </li>
          </ul>
          <ul className="right hide-on-med-and-down">
            <li>
              <a onClick={logout}>
                <i className="small material-icons">forward</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
 */
