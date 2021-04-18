const router = require("express").Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../connection");
const moment = require("moment");

moment.locale("vi");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM User;", (err, doc) => {
    if (err) res.status(400).json({ err });
    if (!doc) return res.status(404).json({ message: "Not found" });
    else {
      return res.status(200).json({
        data: doc.map((item) => {
          return {
            nickname: item.nickname,
            phoneNumber: item.phoneNumber,
            id: item.uid,
            gender: item.gender,
            avatar: item.avatarUrl,
            location: item.location,
            created_at: moment(item.created_at).format("LLLL"),
            email: item.email,
          };
        }),
      });
    }
  });
});

router.get("/:uid", (req, res) => {
  connection.query(
    `SELECT * FROM User WHERE uid = ${req.params.uid}`,
    (err, doc) => {
      res.status(200).json({
        data: doc.map((item) => {
          return {
            nickname: item.nickname,
            phoneNumber: item.phoneNumber,
            id: item.uid,
            gender: item.gender,
            avatar: item.avatarUrl,
            company: item.company,
            location: item.location,
            created_at: moment(item.created_at).format("LLLL"),
            email: item.email,
          };
        }),
      });
      if (err) {
        res.status(400).json({ err });
        return;
      }
    }
  );
});

router.get("/gender/:gender", (req, res) => {
  connection.query(
    `SELECT * FROM User WHERE gender = '${req.params.gender}';`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: doc.map((item) => {
          return {
            nickname: item.nickname,
            phoneNumber: item.phoneNumber,
            id: item.uid,
            gender: item.gender,
            avatar: item.avatarUrl,
            location: item.location,
            created_at: moment(item.created_at).format("LLLL"),
            email: item.email,
          };
        }),
      });
    }
  );
});

router.get("/searchByName/:name", (req, res) => {
  connection.query(
    `SELECT * FROM User WHERE nickname LIKE '%${req.params.name}%'`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: doc.map((item) => {
          return {
            nickname: item.nickname,
            phoneNumber: item.phoneNumber,
            id: item.uid,
            gender: item.gender,
            avatar: item.avatarUrl,
            location: item.location,
            created_at: moment(item.created_at).format("LLLL"),
            email: item.email,
          };
        }),
      });
    }
  );
});

router.get("/searchByEmail/:email", (req, res) => {
  connection.query(
    `SELECT * FROM User WHERE email LIKE '%${req.params.email}%'`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: doc.map((item) => {
          return {
            nickname: item.nickname,
            phoneNumber: item.phoneNumber,
            id: item.uid,
            gender: item.gender,
            avatar: item.avatarUrl,
            location: item.location,
            created_at: moment(item.created_at).format("LLLL"),
            email: item.email,
          };
        }),
      });
    }
  );
});

router.get("/orderByName/ascending", (req, res) => {
  connection.query(`SELECT * FROM User ORDER BY nickname`, (error, doc) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({
      data: doc.map((item) => {
        return {
          nickname: item.nickname,
          phoneNumber: item.phoneNumber,
          id: item.uid,
          gender: item.gender,
          avatar: item.avatarUrl,
          location: item.location,
          created_at: moment(item.created_at).format("LLLL"),
          email: item.email,
        };
      }),
    });
  });
});

router.get("/orderByName/descending", (req, res) => {
  connection.query(
    `SELECT * FROM User ORDER BY nickname DESC`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: doc.map((item) => {
          return {
            nickname: item.nickname,
            phoneNumber: item.phoneNumber,
            id: item.uid,
            gender: item.gender,
            avatar: item.avatarUrl,
            location: item.location,
            created_at: moment(item.created_at).format("LLLL"),
            email: item.email,
          };
        }),
      });
    }
  );
});

router.patch("/:id", (req, res) => {
  // connection.query(
  //   `SELECT * FROM Company WHERE companyId = ${req.body.company}`,
  //   (error,
  //   response => {
  //     if (errors) {
  //       res.status(400).json({ error });
  //       return;
  //     }
  //     if (!response) {
  //       res
  //         .status(403)
  //         .json({ message: "Không tìm thấy mã công ty. Vui lòng thử lại" });
  //       return;
  //     }
  //   })
  // );
  connection.query(
    `UPDATE User SET email = '${req.body.email}', phoneNumber = '${req.body.phoneNumber}',
      location = '${req.body.location}', gender = '${req.body.gender}',company = ${req.body.company} 
      WHERE uid = ${req.params.id}`,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(301).json({ response });
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
          r: "pg",
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
        res
          .status(400)
          .json({ message: "Không tìm thấy tài khoản", data: doc });
        return;
      }
      bcrypt.compare(req.body.password, doc[0].password, (err, done) => {
        if (err) {
          res.status(403).json({
            error: err,
            status: 403,
            message: "Sai mật khẩu",
          });
          return;
        }
        const token = jwt.sign(
          {
            id: doc.uid,
            nickname: doc.nickname,
            email: doc.email,
          },
          "s3cr3t",
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          message: "Logged in",
          headers: `Bearer ${token}`,
          data: doc,
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
        message: "Delete successful",
      });
    }
  );
});

module.exports = router;
