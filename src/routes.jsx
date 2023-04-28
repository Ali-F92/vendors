import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "./layouts/root/RootLayout";
import { Vendors } from "./pages/vendors";
import { Home } from "./pages/home";

export default createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "vendors", element: <Vendors /> },
    ],
  },
]);
