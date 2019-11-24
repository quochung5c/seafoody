const router = require("express").Router();
const moment = require("moment");
const connection = require("../connection");

// Check the list of bill status
router.get("/status", (req, res) => {
  connection.query(`SELECT * FROM OrderStatus`, (error, data) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({ data });
  });
});

// Credit card
// 1. GET Credit card
router.get("/credit", (req, res) => {
  connection.query(`SELECT * FROM Payment`, (error, data) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({ counts: data.length, data: data });
  });
});

// 2. Insert credit card
router.post("/credit", (req, res) => {
  connection.query(
    `INSERT INTO Payment VALUES ('${req.body.creditNum}',${req.body.user},'${req.body.expireDate}',${req.body.amount})`,
    (err, response) => {
      if (err) {
        res.status(400).json({ err });
        return;
      }
      res.status(200).json({ response });
    }
  );
});

// 3. GET credit card with USER ID
router.get("/credit/:user", (req, res) => {
  connection.query(
    `SELECT user.nickname, user.email, user.phoneNumber, payment.* FROM Payment
	INNER JOIN User ON payment.user = user.uid;`,
    (err, doc) => {
      if (err) {
        res.status(400).json({ err });
        return;
      }
      res.status(200).json({ counts: doc.length, data: doc });
    }
  );
});

// 4. DELETE Credit Card
router.delete("/credit/:creditNum", (req, res) => {
  connection.query(
    `DELETE FROM Payment WHERE creditNum = ${req.params.creditNum}`,
    (error,
    response => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({ response });
    })
  );
});

// Bill
// 1. View the list of all bills
router.get("/hoadon", (req, res) => {
  connection.query(`SELECT * FROM HoaDon`, (error, doc) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({ data: doc });
  });
});
// 2. POST a bill
router.post("/hoadon", (req, res) => {
  connection.query(
    `INSERT INTO HoaDon(customer,created_date,shipping_time,shipping_address,payment_method,statusCode,comments,creditCard) VALUES 
     (
     ${req.body.customer},
     NOW(),
     '${req.body.shipping_time}',
     '${req.body.shipping_address}',
     '${req.body.payment_method}',
     1,
     '${req.body.comments}',
     '${req.body.creditCard}'
     )`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(201).json({ response: doc });
    }
  );
});

// 2. SELECT a bill
router.get("/hoadon/:id", (req, res) => {
  connection.query(
    `SELECT hoadon.id, hoadon.shipping_address, hoadon.payment_method, hoadon.shipping_time, hoadon.comments, user.nickname, user.email, orderstatus.statusText, payment.amount, payment.creditNum FROM HoaDon 
	inner join user on hoadon.customer = user.uid
    inner join orderstatus on hoadon.statusCode = orderstatus.statusCode
    inner join payment on hoadon.creditCard = payment.creditNum
WHERE id = ${req.params.id};`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({ data: doc });
    }
  );
});

// 3. DELETE a bill
// router.delete("/hoadon/:id", (req, res) => {
//   connection.query(
//     `DELETE FROM HoaDon WHERE id = ${req.params.id}`,
//     (error, doc) => {
//       if (error) {
//         res.status(400).json({ error });
//         return;
//       }
//       res.status(200).json({ data: doc });
//     }
//   );
// });

// // 4. EDIT a bill
// router.patch("/hoadon/:id", (req, res) => {
//   connection.query(
//     `SELECT * FROM HoaDon WHERE id = ${req.params.id}`,
//     (error, doc) => {
//       if (doc.length === 0) {
//         res.status(404).json({ message: "Không tìm thấy nội dung cần sửa" });
//         return;
//       }
//     }
//   );
//   connection.query(
//     `UPDATE Hoadon SET id = ${req.params.id}, 
//     shipping_address = "${req.body.shipping_address}" , 
//     comments = "${req.body.comments}", 

//     WHERE id = ${req.params.id};  `,
//     (error, doc) => {
//       if (error) {
//         res.status(400).json({ error });
//         return;
//       }
//       res.status(200).json({ data: doc });
//     }
//   );
// });

module.exports = router;
