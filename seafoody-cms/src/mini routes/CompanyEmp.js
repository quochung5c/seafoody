import React, { useState } from "react";
import EmpForm from "./EmpForm";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

const CompanyEmp = ({ employee, company , handleChange }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="list-header">
      <div className="title">
        <h2>Danh sách nhân viên của công ty {company.name}</h2>
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
          Thêm nhân viên
        </Button>
        <EmpForm open={open} handleClose={handleClose} company={company.id} />
        <FormControl style={{ margin: 10 }}>
          <InputLabel htmlFor="standard-adornment-password">
            Tìm kiếm user theo ID
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={"text"}
            onChange={handleChange}
          />
        </FormControl>
        <Table style={{width: 1000}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>UID</TableCell>
              <TableCell align="center">Mã nhân viên</TableCell>
              <TableCell align="center">Họ</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Nơi sinh sống</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="left">Ngày tạo tài khoản</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee.length > 0 ? (
              employee.map(row => (
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
              <p style={{ textAlign: "center" }}>Không tìm thấy nhân viên</p>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompanyEmp;
