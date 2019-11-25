import React, { Component } from "react";
import Axios from "axios";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    console.log(this.props.location.state.id);
    let id = this.props.location.state.id;
    Axios.get(`http://localhost:8088/users/${id}`)
      .then(response => {
        this.setState({ data: response.data.data["0"] });
        console.log(response.data.data["0"]);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Hello User {data.nickname} ! </h1>
        <img src={data.avatar} alt="avatar" />
        <h4>Số điện thoại: {data.phoneNumber}</h4>
        <h4>Thành phố sinh sống: {data.location}</h4>
        <h4>Giới tính: {data.gender === "Male" ? "Nam" : "Nữ"}</h4>
        <h4>Email: {data.email}</h4>
      </div>
    );
  }
}

export default User;
