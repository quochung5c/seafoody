import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Axios from "axios";

class EmpForm extends Component {
  state = {
    firstName: null,
    lastName: null,
    position: null,
    user: null
  };

  componentDidMount() {}
  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      position: this.state.position,
      user: parseInt(this.state.user)
    };
        Axios.post(`http://localhost:8088/employee/${this.props.company}`, data)
          .then(response => {
            alert('Thêm nhân viên thành công');
            window.location.reload();
          })
          .catch(error => {
            alert('Đã có lỗi!! Vui lòng thử lại')
            console.log(error.response);
          });
  };
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.handleFormSubmit}>
          <DialogTitle id="form-dialog-title">Thêm nhân viên</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Để thêm nhân viên, họ cần có tài khoản
            </DialogContentText>
            <TextField
              required
              margin="dense"
              id="firstName"
              name="firstName"
              label="Họ"
              onChange={this.handleFormChange}
              type="text"
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="lastName"
              name="lastName"
              label="Tên"
              type="text"
              onChange={this.handleFormChange}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="user"
              name="user"
              label="Mã người dùng"
              onChange={this.handleFormChange}
              type="number"
              fullWidth
            />
            <FormControl style={{ width: 400 }}>
              <InputLabel>Vị trí</InputLabel>
              <Select
                id="demo-simple-select"
                name="position"
                onChange={this.handleFormChange}
              >
                <MenuItem value={1}>Nhân viên</MenuItem>
                <MenuItem value={2}>Quản lý</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Hủy
            </Button>
            <Button
              type="submit"
              color="secondary"
            >
              Nhập
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default EmpForm;
