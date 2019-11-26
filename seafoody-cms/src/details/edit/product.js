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

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: null,
      price: null,
      productType: null,
      description: null,
      pricePerRatio: null
    };
  }

  componentDidMount() {
    // promocode: "NULL"
    Axios.get(`http://localhost:8088/products/${this.props.location.state.id}`)
      .then(response => {
        //    console.log(response.data.data["0"]);
        let stateData = response.data.data["0"];
        this.setState({
          productName: stateData.productName,
          price: stateData.price,
          pricePerRatio: stateData.pricePerRatio,
          description: stateData.description,
          productType: stateData.productType
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
      `http://localhost:8088/products/${this.props.location.state.id}`,
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
          autoFocus
          margin="dense"
          id="edit_company"
          value={this.state.productName}
          onChange={this.handleChange}
          name="productName"
          label="Tên sản phẩm"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="edit_location"
          name="price"
          label="Giá bán"
          value={this.state.price}
          onChange={this.handleChange}
          type="number"
          fullWidth
        />
        <FormControl style={{ width: 1000 }}>
          <InputLabel>Đơn vị</InputLabel>
          <Select
            id="demo-simple-select"
            name="pricePerRatio"
            value={`${this.state.pricePerRatio}`}
            onChange={this.handleChange}
            fullWidth
          >
            <MenuItem value={"kg"}>kg</MenuItem>
            <MenuItem value={"g"}>gam</MenuItem>
            <MenuItem value={"chiếc"}>chiếc</MenuItem>
            <MenuItem value={"con"}>con</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: 1000 }}>
          <InputLabel>Loại sản phẩm</InputLabel>
          <Select
            id="demo-simple-select"
            name="productType"
            value={`${this.state.productType}`}
            onChange={this.handleChange}
            fullWidth
          >
            <MenuItem value={"Đông lạnh"}>Đông lạnh</MenuItem>
            <MenuItem value={"Đồ khô"}>Đồ khô</MenuItem>
            <MenuItem value={"Tươi sống"}>Tươi sống</MenuItem>
            <MenuItem value={"Khác..."}>Khác...</MenuItem>
          </Select>
        </FormControl>
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
        <Button type="submit" color="secondary">
          Lưu
        </Button>
      </form>
    );
  }
}

export default ProductEdit;
