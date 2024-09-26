import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="nav-links secondary-dark">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="profile-button">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
