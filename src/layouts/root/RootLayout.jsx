import { Outlet } from "react-router-dom";
import "../../index.scss";

export const RootLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
