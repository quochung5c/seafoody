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

const CompanyProduct = ({ data, handleChange }) => {
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
        <Paper style={{ width: "100%", overlowX: "auto" }}>
          <Table style={{ minWidth: 800 }} aria-label="simple table">
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
                <p style={{ textAlign: "center" }}>Không tìm thấy sản phẩm</p>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

export default CompanyProduct;
