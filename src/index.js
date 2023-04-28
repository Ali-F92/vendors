import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from "./routes";
import store from "./redux/store";

const el = document.getElementById("app");
const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
