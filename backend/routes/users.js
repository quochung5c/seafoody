const router = require("express").Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../connection");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM user", (err, doc) => {
    res.status(200).json({ doc });
    if (err) res.status(400).json({ err });
  });
});

router.get("/:uid", (req, res) => {
  connection.query(
    `SELECT * FROM user WHERE uid = ${req.params.uid}`,
    (err, doc) => {
      res.status(200).json({
        data: doc
      });
      if (err) {
        res.status(400).json({ err });
        return;
      }
    }
  );
});

router.post("/register", (req, res) => {
  // Find exists
  let errors = [];
  connection.query(
    `SELECT * FROM User WHERE email = '${req.body.email}'`,
    (error, doc) => {
      if (req.body.gender !== "Male" && req.body.gender !== "Female") {
        errors.push("Điền sai giới tính");
      }
      if (doc.length > 0) {
        errors.push("Email đã được sử dụng");
      }
      if (req.body.password.length < 8 || req.body.password.length > 20) {
        errors.push(
          "Mật khẩu phải có độ dài tối thiểu 8 ký tự và tối đa 20 ký tự"
        );
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(400).json({ err });
        const avatar = gravatar.url(req.body.email, {
          s: 200,
          d: "retro",
          protocol: "http",
          r: "pg"
        });
        if (errors.length > 0) {
          return res.status(400).json({ errors });
        } else {
          connection.query(
            `insert INTO User (nickname,created_at,gender,location,phoneNumber,email,avatarUrl,password) values ('${req.body.nickname}',NOW(),'${req.body.gender}','${req.body.location}','${req.body.phoneNumber}','${req.body.email}','${avatar}','${hash}');`,
            (error, doc) => {
              res.status(201).json({ doc, password: hash });
            }
          );
        }
      });
    }
  );
});
router.post("/login", (req, res) => {
  // Find exist
  connection.query(
    `SELECT * FROM User WHERE email = '${req.body.email}'`,
    (err, doc) => {
      if (doc.length === 0) {
        res.status(400).json({ message: "Không tìm thấy tài khoản", data: doc });
        return;
      }
      bcrypt.compare(req.body.password, doc[0].password, (err, done) => {
        if (err) {
          res.status(403).json({
            error: err,
            status: 403,
            message: "Sai mật khẩu"
          });
          return;
        }
        const token = jwt.sign(
          {
            id: doc.uid,
            nickname: doc.nickname,
            email: doc.email
          },
          "s3cr3t",
          {
            expiresIn: "1h"
          }
        );
        res.status(200).json({
          message: "Logged in",
          headers: `Bearer ${token}`
        });
      });
    }
  );
});

router.delete("/:uid", (req, res) => {
  connection.query(
    `DELETE FROM User WHERE uid = ${req.params.uid}`,
    (err, doc) => {
      if (err) {
        res.status(400).json({ err });
        return;
      }
      return res.status(200).json({
        response: doc,
        message: "Delete successful"
      });
    }
  );
});

module.exports = router;
