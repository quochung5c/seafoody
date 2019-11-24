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

const typeOfFood = [
  { id: 1, title: "Đông lạnh" },
  { id: 2, title: "Tươi sống" },
  { id: 3, title: "Đồ khô" },
  { id: 4, title: "Khác..." }
];

class ProductForm extends Component {
  state = {
    uid: null,
    productName: null,
    price: null,
    pricePerRatio: null,
    productType: null,
    description: null,
    image: null,
    promotion: null,
    listOfPromotion: null
  };

  componentDidMount() {
    Axios.get("http://localhost:8088/products/promotion").then(response => {
      this.setState({ listOfPromotion: response.data.data });
      console.log(response.data.data);
    });
  }
  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageChange = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("productName", this.state.productName);
    fd.append("productType", this.state.productType);
    fd.append("price", this.state.price);
    fd.append("user", this.state.uid);
    fd.append("description", this.state.description);
    fd.append("promotion", this.state.promotion);
    fd.append("product", this.state.image);
    fd.append("pricePerRatio", this.state.pricePerRatio);

    Axios.post("http://localhost:8088/products", fd)
      .then(response => {
        console.log(response ? "Nhập dữ liệu thành công" : "Loading...");
      })
      .catch(error => {
        console.log(error.response);
        console.log(
          error.response.status !== 200
            ? "Đã có lỗi xảy ra. Vui lòng nhập lại"
            : ""
        );
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
            style={{ backgroundColor: "#1990ff", color: "white" }}
          >
            {"Thêm sản phẩm mới"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="uid"
              name="uid"
              onChange={this.handleFormChange}
              label="Mã người dùng"
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="productName"
              name="productName"
              onChange={this.handleFormChange}
              label="Tên sản phẩm"
              type="text"
              fullWidth
            />
            <div style={{ display: "flex" }}>
              <TextField
                autoFocus
                margin="dense"
                id="price"
                name="price"
                onChange={this.handleFormChange}
                label="Gía sản phẩm"
                type="number"
                fullWidth
              />
              <FormControl>
                <InputLabel>Đơn vị</InputLabel>
                <Select
                  id="demo-simple-select"
                  name="pricePerRatio"
                  onChange={this.handleFormChange}
                  fullWidth
                >
                  <MenuItem value={"kg"}>kg</MenuItem>
                  <MenuItem value={"g"}>gam</MenuItem>
                  <MenuItem value={"chiếc"}>chiếc</MenuItem>
                  <MenuItem value={"con"}>con</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Autocomplete
              id="combo-box-demo"
              options={typeOfFood}
              getOptionLabel={option => option.title}
              fullWidth
              name="productType"
              onChange={(event, value) =>
                this.setState({ productType: value.title })
              }
              renderInput={params => (
                <TextField
                  name="productType"
                  id="productType"
                  onChange={this.handleFormChange}
                  {...params}
                  label="Loại sản phẩm"
                  fullWidth
                />
              )}
            />
            <Autocomplete
              id="combo-box-demo"
              options={this.state.listOfPromotion}
              getOptionLabel={option => option.code}
              fullWidth
              name="productType"
              onChange={(event, value) =>
                this.setState({ promotion: value.id })
              }
              renderInput={params => (
                <TextField
                  name="promotion"
                  id="promotion"
                  {...params}
                  label="Mã giảm giá"
                  fullWidth
                />
              )}
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              onChange={this.handleFormChange}
              label="Mô tả sản phẩm"
              type="text"
              fullWidth
            />
            <div>
              <label>Hình ảnh:</label>
              <input
                type="file"
                name="image"
                onChange={this.handleImageChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" autoFocus>
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
