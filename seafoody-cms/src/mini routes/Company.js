import React, { Component } from "react";
import CompanyProduct from "./CompanyProduct";
import CompanyUser from "./CompanyUser";
import Axios from "axios";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      products: [],
      users: []
    };
  }
  componentDidMount() {
    Axios.get(`http://localhost:8088/companies/${this.props.location.state}`)
      .then(response => {
        this.setState({ company: response.data.data["0"] });
        console.log(this.state.company);
      })
      .catch(error => {
        console.log(error.response);
      });

    Axios.get(
      `http://localhost:8088/products/company/${this.props.location.state}`
    )
      .then(response => {
        this.setState({ products: response.data });
        console.log("Product on company");
        console.log(this.state.products.data);
      })
      .catch(error => {
        console.log(error.response);
      });
    Axios.get(
      `http://localhost:8088/companies/users/${this.props.location.state}`
    ).then(response => {
      this.setState({ users: response.data });
      console.log("User on company");
      console.log(this.state.users);
    });
  }
  render() {
    return (
      <div style={{ margin: 20 }}>
        <div className="about">
          <img src={this.state.company.avatar} alt="imagess" />
          <h1>{this.state.company.name}</h1>
          <p>Địa chỉ: {this.state.company.location} </p>
          <p>Số diện thoại: {this.state.company.phoneNumber}</p>
          <p>Mô tả về công ty: {this.state.company.description}</p>
        </div>
        <div className="listOfProduct">
          <CompanyProduct data={this.state.products} />
        </div>
        <div className="listOfUsers">
          <CompanyUser data={this.state.users} />
        </div>
      </div>
    );
  }
}

export default Company;
