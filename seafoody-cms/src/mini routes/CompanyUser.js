import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const CompanyProduct = ({ data, handleChange }) => {
  return (
    <div className="list-header" style={{ display: "flex" }}>
      <div className="title">
        <h2>Danh sách người dùng của công ty</h2>
      </div>
      <div className="header-action">
        <FormControl style={{ margin: 10 }}>
          <InputLabel htmlFor="standard-adornment-password">
            Tìm kiếm người dùng
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={"text"}
            onChange={handleChange}
          />
        </FormControl>
        <Paper style={{ width: "100%", overlowX: "auto" }}>
          <Table style={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>UID</TableCell>
                <TableCell align="center">Nickname</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Giới tính</TableCell>
                <TableCell align="center">Nơi sinh sống</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="left">Ngày tạo tài khoản</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.counts > 0 ? (
                data.data.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.uid}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        to={{
                          pathname: `/users/${row.id}`,
                          state: { id: row.uid }
                        }}
                      >
                        {row.nickname}
                      </Link>
                    </TableCell>
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
    </div>
  );
};

export default CompanyProduct;
