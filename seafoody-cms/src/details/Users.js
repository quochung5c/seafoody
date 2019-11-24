import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";

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

function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDelete = id => {
    axios
      .delete(`http://localhost:8088/users/${id}`)
      .then(response => {
        alert(`Xóa thành công mã người dùng ${id}`);
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:8088/users").then(result => {
      console.log(result.data.data);
      setUsers(result.data.data);
    });
  }, []);
  const handleChange = event => {
    setQuery(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    axios.get(`http://localhost:8088/users/${query}`).then(result => {
      setUsers(result.data.data);
    });
  };
  return (
    <div className="list">
      <div className="list-header" style={{ display: "flex" }}>
        <div className="title">
          <h2>Quản lý người dùng</h2>
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
            onClick={handleClickOpen}
          >
            Tạo tài khoản
          </Button>
          <UserForm
            open={open}
            handleClose={handleClose}
            transition={Transition}
          />
          <FormControl style={{ margin: 10 }}>
            <form onSubmit={handleSubmit}>
              <InputLabel htmlFor="standard-adornment-password">
                Tìm kiếm người dùng theo ID
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
              <TableCell>UID</TableCell>
              <TableCell align="center">Nickname</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Giới tính</TableCell>
              <TableCell align="center">Nơi sinh sống</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Công ty</TableCell>
              <TableCell align="left">Ngày tạo tài khoản</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.nickname}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Link
                      to={{
                        pathname: `/gender/${row.gender}`,
                        state: { gender: row.gender }
                      }}
                    >
                      {row.gender === "Male" ? "Nam" : "Nữ"}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{row.location}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.company}</TableCell>
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
              <p style={{ textAlign: "center" }}>Không tìm thấy tài khoản</p>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default Users;
