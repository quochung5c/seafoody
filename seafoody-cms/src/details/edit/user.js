import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import Axios from "axios";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      nickname: null,
      gender: null,
      email: null,
      company: null,
      location: null,
      phoneNumber: null
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let state = this.state;
    let newData = {
      nickname: state.nickname,
      gender: state.gender,
      email: state.email,
      company: parseInt(state.company),
      location: state.location,
      phoneNumber: state.phoneNumber
    };
    console.log(newData);
    Axios.patch(
      `http://localhost:8088/users/${this.props.location.state.id}`,
      newData
    )
      .then(response => {
        console.log(response.data);
        alert("Thay đổi thông tin thành công");
      })
      .catch(error => {
        alert("Đã có lỗi xảy ra, nhập lại!");
        console.log(error.response);
      });
  };
  componentDidMount() {
    console.log(this.props.location.state.id);
    Axios.get(`http://localhost:8088/users/${this.props.location.state.id}`)
      .then(response => {
        // console.log(response.data.data["0"]);
        let data = response.data.data["0"];
        this.setState({
          nickname: data.nickname,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          email: data.email,
          location: data.location,
          company: data.company
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ margin: 20 }}>
        <h1>Sửa thông tin</h1>
        <TextField
          autoFocus
          margin="dense"
          id="edit_nickname"
          value={this.state.nickname}
          onChange={this.handleChange}
          name="nickname"
          label="Nickname"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="edit_email"
          name="email"
          label="Email"
          value={this.state.email}
          onChange={this.handleChange}
          type="email"
          fullWidth
        />
        <TextField
          margin="dense"
          id="edit_location"
          value={this.state.location}
          onChange={this.handleChange}
          name="location"
          label="Location"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="edit_location"
          value={this.state.phoneNumber}
          onChange={this.handleChange}
          name="phoneNumber"
          label="Số điện thoại"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="edit_company"
          value={parseInt(this.state.company)}
          name="company"
          onChange={this.handleChange}
          label="Mã công ty"
          type="number"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Giới tính</InputLabel>
          <Select
            id="demo-simple-select"
            name="gender"
            value={`${this.state.gender}`}
          >
            <MenuItem value={"Male"}>Nam</MenuItem>
            <MenuItem value={"Female"}>Nữ</MenuItem>
          </Select>
        </FormControl>
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

export default UserEdit;
