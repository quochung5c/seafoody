import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from "axios";

class ProductForm extends Component {
  state = {
    companyName: null,
    phoneNumber: null,
    location: null,
    company: null,
    description: null
  };

  componentDidMount() {}
  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageChange = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("companyName", this.state.companyName);
    fd.append("location", this.state.location);
    fd.append("image", this.state.company);
    fd.append("phoneNumber", this.state.phoneNumber);
    fd.append("description",this.state.description);
    Axios.post("http://localhost:8088/companies", fd)
      .then(response => {
        alert("Nhập dữ liệu thành công!");
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
        alert("Đã có lỗi xảy ra, vui lòng nhập lại");
      });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        fullScreen
        onClose={this.props.handleClose}
        TransitionComponent={this.props.transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={this.handleFormSubmit}>
          <DialogTitle
            id="alert-dialog-title"
            style={{ backgroundColor: "purple", color: "white" }}
          >
            {"Thêm công ty mới"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="companyName"
              name="companyName"
              onChange={this.handleFormChange}
              label="Tên công ty"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              name="location"
              onChange={this.handleFormChange}
              label="Địa chỉ"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              onChange={this.handleFormChange}
              label="Số điện thoại"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              onChange={this.handleFormChange}
              label="Mô tả công ty"
              type="text"
              fullWidth
            />
            <div>
              <label>Hình ảnh đại diện: </label>
              <input
                type="file"
                name="company"
                onChange={this.handleImageChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="secondary" autoFocus>
              THÊM
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
              ĐÓNG
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default ProductForm;
