import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

class ProductForm extends Component {
  state = {
    customer: null,
    shipping_time: null,
    payment_method: null,
    shipping_address: null,
    comments: null
  };

  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    let data = {
      customer: parseInt(this.state.customer),
      shipping_time: this.state.shipping_time,
      shipping_address: this.state.shipping_address,
      comments: this.state.comments,
      payment_method: this.state.payment_method
    };
    Axios.post("http://localhost:8088/bills/hoadon", data)
      .then(response => {
        alert("Nhập dữ liệu thành công!");
        window.location.reload();
        console.log(response);
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
            style={{ backgroundColor: "green", color: "white" }}
          >
            {"Thêm hóa đơn mới"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="customer"
              name="customer"
              onChange={this.handleFormChange}
              label="Mã khách hàng"
              type="number"
              required
              fullWidth
            />
            <TextField
              id="date"
              label="Ngày nhận hàng"
              type="date"
              onChange={this.handleFormChange}
              defaultValue="2019-11-26"
              name="shipping_time"
              InputLabelProps={{
                shrink: true
              }}
            />
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Phương thức giao hàng</InputLabel>
              <Select
                id="demo-simple-select"
                name="payment_method"
                onChange={this.handleFormChange}
                fullWidth
                required
              >
                <MenuItem value={"Credit Card"}>Thẻ ngân hàng</MenuItem>
                <MenuItem value={"COD"}>Thanh toán khi nhận hàng</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="address"
              name="shipping_address"
              onChange={this.handleFormChange}
              label="Địa chỉ nhận hàng"
              type="text"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              id="comments"
              name="comments"
              onChange={this.handleFormChange}
              label="Ghi chú"
              type="text"
              fullWidth
            />
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
