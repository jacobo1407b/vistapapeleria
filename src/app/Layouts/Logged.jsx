import React, { useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import { Sidebar } from "semantic-ui-react";
import Rout from "../routes/Routes";
import Menu from "../components/Menu/Menu";
import MenuLeft from "../components/Menu/MenuLeft";
import Modal from "../components/Modal/ModalBasic";
const Logged = ({ setuser, setReLoad }) => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [children, setChildren] = useState(null);
  const [envi, setEnvi] = useState(false);
  const [img, setimg] = useState("");

  return (
    <Router>
      <MenuLeft visible={visible} setVisible={setVisible} setuser={setuser} />
      <Sidebar.Pushable>
        <Sidebar.Pusher dimmed={visible}>
          <Menu
            setVisible={setVisible}
            visible={visible}
            setuser={setuser}
            setShow={setShow}
            setTitle={setTitle}
            setChildren={setChildren}
            setEnvi={setEnvi}
            setimg={setimg}
          />
          <Rout
            setReLoad={setReLoad}
            setShow={setShow}
            setTitle={setTitle}
            setChildren={setChildren}
            setEnvi={setEnvi}
            setimg={setimg}
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <Modal
        show={show}
        setShow={setShow}
        title={title}
        children={children}
        envia={envi}
        im={img}
      />
    </Router>
  );
};

export default Logged;
