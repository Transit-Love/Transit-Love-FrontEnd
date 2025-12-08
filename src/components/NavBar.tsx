import React from "react";
import AdminNavBar from "./AdminNavBar";
import UserNavBar from "./UserNavBar";
import authService from "../api/authService";

const NavBar: React.FC = () => {
  const isAdmin = authService.isAdmin();

  return isAdmin ? <AdminNavBar /> : <UserNavBar />;
};

export default NavBar;
