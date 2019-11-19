import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const CompanyProduct = ({data,handleChange}) => {
  return (
    <div className="list-header" style={{ display: "flex" }}>
      <div className="title">
          <h2>Danh sách sản phẩm đã đăng</h2>
      </div>
      <div className="header-action">
        <FormControl style={{ margin: 10 }}>
            <InputLabel htmlFor="standard-adornment-password">
              Tìm kiếm sp qua ID
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={"text"}
              onChange={handleChange}
            />
        </FormControl>
        <Table aria-label="simple table">
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
              <p style={{ textAlign: "center" }}>Không tìm thấy sản phẩm</p>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompanyProduct;
