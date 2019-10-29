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

router.post("/register", (req, res) => {
  // Find exists
  connection.query(
    `SELECT * FROM User WHERE email = '${req.body.email}'`,
    (error, doc) => {
      if (error) return res.status(400).json({ error });
      if (doc.length > 0)
        return res.status(404).json({ message: "Email đã được sử dụng" });
        connection.end();
    }
  );
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.status(400).json({ err });
    const avatar = gravatar.url(req.body.email, {
      s: 200,
      d: "retro",
      protocol: "http",
      r: "pg"
    });
    connection.query(
      `insert INTO User (nickname,created_at,gender,location,phoneNumber,email,avatarUrl,password) values ('${req.body.nickname}',NOW(),'${req.body.gender}','${req.body.location}','${req.body.phoneNumber}','${req.body.email}','${avatar}','${hash}');`,
      (error, doc) => {
        if (error) {
          res.status(400).json({ error });
        }
        res.status(201).json({ doc });
      }
    );
  });
});
router.post("/login", (req, res) => {
  // Find exist
  connection.query(
    `SELECT * FROM User WHERE email = '${req.body.email}'`,
    (err, doc) => {
      if (doc.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy tài khoản" });
      }
      if (err) return res.status(400).json({ err });
      bcrypt.compare(req.body.password, doc.password, err => {
        if (err) res.status(403).json({ error: "Sai mật khẩu", error: err });
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
        return res.status(200).json({
          message: "Logged in",
          headers: `Bearer ${token}`
        });
      });
    }
  );
});

module.exports = router;
