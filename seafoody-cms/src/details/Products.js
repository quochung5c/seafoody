import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";

import axios from "axios";
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDelete = id => {
    Axios.delete(`http://localhost:8088/products/${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
    alert(`Xóa thành công mã sản phẩm ${id}`);
    window.location.reload();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios.get("http://localhost:8088/products").then(result => {
      console.log(result.data.data);
      setProducts(result.data.data);
    });
  }, []);
  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .get(`http://localhost:8088/products/searchById/${query}`)
      .then(result => {
        setProducts(result.data.data);
      });
  };
  return (
    <div className="list">
      <div className="list-header" style={{ display: "flex" }}>
        <div className="title">
          <h2>Quản lý sản phẩm</h2>
        </div>
        <div className="header-action">
          <Button
            variant="contained"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: 6,
              margin: 20
            }}
            onClick={handleClickOpen}
          >
            Tạo sản phẩm
          </Button>
          <ProductForm
            open={open}
            handleClose={handleClose}
            transition={Transition}
          />
          <FormControl style={{ margin: 10 }}>
            <form onSubmit={handleSubmit}>
              <InputLabel htmlFor="standard-adornment-password">
                Tìm kiếm sản phẩm theo ID
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={"text"}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </form>
          </FormControl>
        </div>
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Tên sản phẩm</TableCell>
              <TableCell align="center">Giá sản phẩm</TableCell>
              <TableCell align="center">Loại hàng</TableCell>
              <TableCell align="center">Giảm giá</TableCell>
              <TableCell align="center">Mã giảm giá</TableCell>
              <TableCell align="center">Lượt thích</TableCell>
              <TableCell align="center">Công ty sản xuất</TableCell>
              <TableCell align="left">Ngày tạo</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.promotion_percent}</TableCell>
                  <TableCell align="center">{row.promotion}</TableCell>
                  <TableCell align="center">{row.likes}</TableCell>
                  <TableCell align="left">{row.company}</TableCell>
                  <TableCell align="left">{row.created_at}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      style={{ marginRight: 8 }}
                      variant="contained"
                    >
                      Sửa
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleDelete(row.id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>Không tìm thấy sản phẩm</p>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default Products;
