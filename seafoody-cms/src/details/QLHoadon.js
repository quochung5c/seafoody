import React, { Component, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Axios from "axios";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

class QLHoadon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sum: null
    };
  }

  componentDidMount() {
    console.log(this.props.location.state.id);
    Axios.get(`http://localhost:8088/bills/${this.props.location.state.id}`)
      .then(response => {
        this.setState({ data: response.data.data });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  handleDelete = id => {
    Axios.delete(`http://localhost:8088/bills/${id}`)
      .then(response => {
        console.log(response);
        alert("Xóa thành công");
        window.location.reload();
      })
      .catch(error => {
        alert("Xóa thất bại, thử lại");
        console.log(error.response);
      });
  };
  handleUpdateChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Giỏ hàng của hóa đơn số {this.props.location.state.id}</h1>
        <Paper className={styles.root}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mã giỏ hàng</TableCell>
                <TableCell align="center">Tên hàng</TableCell>
                <TableCell align="center"> Giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Giảm giá</TableCell>
                <TableCell align="left">Tổng giá</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.productName}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.promo_percent} %</TableCell>
                    <TableCell align="left">{row.sum}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          this.handleDelete(row.id);
                        }}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <p style={{ textAlign: "center" }}>Không tìm thấy tài khoản</p>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(QLHoadon);
