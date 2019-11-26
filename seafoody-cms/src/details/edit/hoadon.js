import React, { Component } from "react";
import Axios from "axios";
import {
  Select,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel
} from "@material-ui/core";

class HoadonEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping_time: null,
      shipping_address: null,
      comments: null,
      status: null,
      payment_method: null
    };
  }

  componentDidMount() {
    Axios.get(
      `http://localhost:8088/bills/hoadon/${this.props.location.state.id}`
    )
      .then(response => {
        //    this.setState({});
        //    console.log(this.state);
        let stateData = response.data.data["0"];
        this.setState({
          shipping_time: stateData.shipping_time,
          shipping_address: stateData.shipping_address,
          comments: stateData.comments,
          status: stateData.statusCode,
          payment_method: stateData.payment_method
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    Axios.patch(
      `http://localhost:8088/bills/hoadon/${this.props.location.state.id}`,
      this.state
    )
      .then(response => {
        alert("Thay đổi thành công");
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        alert("Thay đổi thất bại, vui lòng xem lại");
        console.log(error.response);
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ margin: 20 }}>
        <h1>Sửa thông tin</h1>
        <TextField
          id="date"
          label="Ngày nhận hàng"
          type="date"
          onChange={this.handleChange}
          defaultValue={`${this.state.shipping_time}`}
          name="shipping_time"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          margin="dense"
          id="address"
          name="shipping_address"
          onChange={this.handleChange}
          label="Địa chỉ nhận hàng"
          value={this.state.shipping_address}
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="comments"
          name="comments"
          onChange={this.handleChange}
          value={this.state.comments}
          label="Ghi chú"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="statusCode"
          name="status"
          onChange={this.handleChange}
          value={this.state.status}
          label="Mã tiếp nhận"
          type="number"
          fullWidth
        />
        <FormControl style={{ width: 1200 }}>
          <InputLabel>Phương thức thanh toán</InputLabel>
          <Select
            id="demo-simple-select"
            name="payment_method"
              value={`${this.state.payment_method}`}
            onChange={this.handleChange}
            fullWidth
          >
            <MenuItem value={"Credit Card"}>Thẻ ngân hàng</MenuItem>
            <MenuItem value={"COD"}>Thanh toán trực tiếp</MenuItem>
          </Select>
        </FormControl>
        <div style={{ margin: 20 }}>
          <Button type="submit" color="secondary">
            Lưu
          </Button>
        </div>
      </form>
    );
  }
}

export default HoadonEdit;
