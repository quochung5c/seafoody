import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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

class ProductType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log(this.props.location.state);
    Axios.get(
      `http://localhost:8088/products/ptype/${this.props.location.state}`
    )
      .then(response => {
        this.setState({ data: response.data });
        console.log(this.state.data.counts);
        console.log(this.state.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Danh sách sản phẩm {this.props.location.state}</h1>
        <Paper className={styles.root}>
          <Table className={styles.table} aria-label="simple table">
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
              </TableRow>
            </TableHead>
            <TableBody>
              {data.counts > 0 ? (
                data.data.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="center">
                      {row.promotion_percent}
                    </TableCell>
                    <TableCell align="center">{row.promotion}</TableCell>
                    <TableCell align="center">{row.likes}</TableCell>
                    <TableCell align="left">{row.company}</TableCell>
                    <TableCell align="left">{row.created_at}</TableCell>
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

export default withStyles(styles)(ProductType);
