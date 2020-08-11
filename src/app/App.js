import React, { useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import Layout from "./Layouts/Logged";
import Nouser from "./routes/Nouser";

const App = () => {
  const [reload, setReLoad] = useState(false);
  const [user, setuser] = useState(localStorage.getItem("token"));

  return (
    <Provider store={store}>
      <SnackbarProvider>
        {user ? (
          <Layout setuser={setuser} />
        ) : (
          <Nouser setuser={setuser} setReLoad={setReLoad} />
        )}
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
