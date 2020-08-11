import React from "react";
import { Sidebar, Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MenuLeft = (props) => {
  const { visible, setVisible, setuser } = props;

  const logout = () => {
    localStorage.removeItem("token");
    setuser(false);
  };
  return (
    <div>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="thin"
      >
        <Menu.Item as={Link} to="/" onClick={() => setVisible(false)}>
          <Icon name="home" />
          Inicio
        </Menu.Item>
        <Menu.Item as={Link} to="/productos" onClick={() => setVisible(false)}>
          <Icon name="book" />
          Productos
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/monografias"
          onClick={() => setVisible(false)}
        >
          <Icon name="file outline" />
          Monografias
        </Menu.Item>
        <Menu.Item as={Link} to="/biografias" onClick={() => setVisible(false)}>
          <Icon name="address book outline" />
          biografias
        </Menu.Item>
        <Menu.Item as={Link} to="/ventas" onClick={() => setVisible(false)}>
          <Icon name="cart" />
          Ventas
        </Menu.Item>

        <Menu.Item onClick={logout}>
          <Icon name="sign-in" />
          Cerrar
        </Menu.Item>
      </Sidebar>
    </div>
  );
};

export default MenuLeft;
/**
 * <IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteBase /
   RewriteCond %{REQUEST_URI} !^/public/
   RewriteRule ^(.*)$ /public/index.php/$1 [L]
</IfModule>
Header set Access-Control-Allow-Origin "*"
SetEnv APP_ENV prod
SetEnv APP_DEBUG 0
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
 */
