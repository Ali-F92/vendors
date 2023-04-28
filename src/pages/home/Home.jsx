import { Link } from "react-router-dom";

import "./home.scss";

export const Home = () => {
  return (
    <nav className="navbar">
      <Link to={"vendors"}>رستوران‌ها</Link>
    </nav>
  );
};
