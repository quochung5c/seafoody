import React from "react";
import Users from "./details/Users";
import Products from "./details/Products";
import Companies from './details/Companies';

const Main = () => {
  return (
    <div>
      <Users />
      <Companies/>
      <Products />
    </div>
  );
};

export default Main;
