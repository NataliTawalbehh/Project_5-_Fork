import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import SocketProvider from "./Pages/SocketProvider/SocketProvider";
import Chat from "./Pages/Chat/Chat";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <SocketProvider>
      <Chat/>
    </SocketProvider> */}
    <App />
  </Provider>
);
