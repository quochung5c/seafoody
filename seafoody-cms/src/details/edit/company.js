import React, { Component } from "react";
import {
  TextField,
  Button,
} from "@material-ui/core";
import Axios from "axios";

class CompanyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      companyName: null,
      location: null,
      description: null,
      phoneNumber: null
    };
  }

  componentDidMount() {
    console.log(this.props.location.state.id);
    Axios.get(
      `http://localhost:8088/companies/${this.props.location.state.id}`
    ).then(response => {
      console.log(response.data.data["0"]);
      this.setState({
        companyName: response.data.data["0"].name,
        location: response.data.data["0"].location,
        description: response.data.data["0"].description,
        phoneNumber: response.data.data["0"].phoneNumber
      });
      console.log(this.state);
    });
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let newData = {
      companyName: this.state.companyName,
      phoneNumber: this.state.phoneNumber,
      location: this.state.location,
      description: this.state.description
    };
    Axios.patch(
      `http://localhost:8088/companies/${this.props.location.state.id}`,
      newData
    )
      .then(response => {
        console.log(response);
        alert("Sửa thành công");
      })
      .catch(error => {
        console.log(error.response);
        alert("Sửa không thành công. Vui lòng kiểm tra lại");
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ margin: 20 }}>
        <h1>Sửa thông tin</h1>
        <TextField
          autoFocus
          margin="dense"
          id="edit_company"
          value={this.state.companyName}
          onChange={this.handleChange}
          name="name"
          label="Tên công ty"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="edit_location"
          name="location"
          label="Địa chỉ"
          value={this.state.location}
          onChange={this.handleChange}
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="edit_phone"
          value={this.state.phoneNumber}
          onChange={this.handleChange}
          name="phoneNumber"
          label="Số điện thoại"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="edit_description"
          value={this.state.description}
          onChange={this.handleChange}
          name="description"
          label="Mô tả"
          type="text"
          fullWidth
        />

        <Button onClick={this.props.handleCloseEdit} color="primary">
          hủy
        </Button>
        <Button type="submit" color="secondary">
          Lưu
        </Button>
      </form>
    );
  }
}

export default CompanyEdit;
