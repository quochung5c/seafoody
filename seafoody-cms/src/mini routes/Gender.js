import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import axios from "axios";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});
class Gender extends Component {
  state = {
    gender: null,
    data: []
  };
  componentDidMount() {
    console.log(this.props.location.state.gender);
    this.setState({ gender: this.props.location.state.gender });
    axios
      .get(
        `http://localhost:8088/users/gender/${this.props.location.state.gender}`
      )
      .then(response => {
        // console.log(response.data.data);
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = event => {
    event.target.value !== null
      ? axios
          .get(`http://localhost:8088/users/${event.target.value}`)
          .then(res => {
            this.setState({ data: res.data.data });
          })
      : axios
          .get(
            `http://localhost:8088/users/gender/${this.props.location.state.gender}`
          )
          .then(response => {
            // console.log(response.data.data);
            this.setState({ data: response.data.data });
          })
          .catch(error => {
            console.log(error);
          });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.gender);
  };
  render() {
    const { data } = this.state;
    return (
      <div className="list">
        <div className="list-header" style={{ display: "flex" }}>
          <div className="title">
            <h2>Danh sách người dùng {this.state.gender}</h2>
          </div>
          <div className="header-action">
            <Button
              varaint="contained"
              style={{
                backgroundColor: "green",
                color: "white",
                padding: 6,
                margin: 20
              }}
            >
              Tạo sản phẩm
            </Button>
            <FormControl style={{ margin: 10 }}>
              <form onSubmit={this.handleSubmit}>
                <InputLabel htmlFor="standard-adornment-password">
                  Tìm kiếm user theo ID
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={"text"}
                  onChange={this.handleChange}
                />
              </form>
            </FormControl>
            <Paper className={styles.root}>
              <Table className={styles.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>UID</TableCell>
                    <TableCell align="center">Nickname</TableCell>
                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="center">Giới tính</TableCell>
                    <TableCell align="center">Nơi sinh sống</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="left">Ngày tạo tài khoản</TableCell>
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
                        <TableCell align="center">{row.nickname}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">
                          {row.gender === "Male" ? "Nam" : "Nữ"}
                        </TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="left">{row.created_at}</TableCell>
                        <TableCell align="center">
                          <Button
                            color="primary"
                            style={{ marginRight: 8 }}
                            variant="contained"
                          >
                            Sửa
                          </Button>
                          <Button color="secondary" variant="contained">
                            Xóa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <p style={{ textAlign: "center" }}>
                      Không tìm thấy tài khoản
                    </p>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Gender);
