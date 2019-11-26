import React, { useState, useEffect } from "react";
import Axios from "axios";
import HoadonForm from "./HoadonForm";

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
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

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

const HoaDon = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    Axios.get(`http://localhost:8088/bills/hoadon`)
      .then(response => {
        console.log(response.data.data);
        setData(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);
  const handleChange = event => {};
  const handleDelete = id => {
    Axios.delete(`http://localhost:8088/bills/hoadon/${id}`)
      .then(response => {
        alert("Xóa thành công");
        console.log(response);
      })
      .catch(error => {
        alert("Xóa thất bại, vui lòng kiểm tra lại");
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="list">
      <div className="list-header" style={{ display: "flex" }}>
        <div className="title">
          <h2>Quản lý hóa đơn</h2>
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
            Tạo hóa đơn
          </Button>
          <HoadonForm
            open={open}
            handleClose={handleClose}
            transition={Transition}
          />
          <FormControl style={{ margin: 10 }}>
            <InputLabel htmlFor="standard-adornment-password">
              Tìm kiếm hóa đơn theo id
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={"text"}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="submit"></IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Khách hàng</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell align="center">Thời gian đặt đơn</TableCell>
              <TableCell align="center">Thời gian chuyển hàng</TableCell>
              <TableCell align="center">Phương thức giao dịch</TableCell>
              <TableCell align="center">Trạng thái tiếp nhận</TableCell>
              <TableCell align="center">Ghi chú</TableCell>
              <TableCell align="center">Địa chỉ giao hàng</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.counts > 0 ? (
              data.data.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Link
                      style={{ color: "black", textDecoration: "none" }}
                      to={{
                        pathname: `/bills/${row.id}`,
                        state: {
                          id: row.id
                        }
                      }}
                    >
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.customer.nickname}</TableCell>
                  <TableCell align="left">{row.customer.email}</TableCell>
                  <TableCell align="left">{row.customer.phoneNumber}</TableCell>
                  <TableCell align="center">{row.created_date}</TableCell>
                  <TableCell align="center">{row.shipping_time}</TableCell>
                  <TableCell align="center">{row.payment_method}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.comment}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      style={{ marginRight: 8 }}
                      variant="contained"
                    >
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to={{
                          pathname: `/hoadon/edit/${row.id}`,
                          state: { id: row.id }
                        }}
                      >
                        Sửa
                      </Link>
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
};

export default HoaDon;
