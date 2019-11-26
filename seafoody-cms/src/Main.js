import React from "react";
import Users from "./details/Users";
import Products from "./details/Products";
import Companies from "./details/Companies";
import HoaDon from "./details/HoaDon";

const Main = () => {
  return (
    <div>
      <Users />
      <Companies />
      <Products />
      <HoaDon />
    </div>
  );
};

export default Main;
