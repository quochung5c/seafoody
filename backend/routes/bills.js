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
      res.status(201).json({ response });
    }
  );
});

router.patch("/credit/:creditNum", (req, res) => {
  connection.query(
    `UPDATE Payment SET '${req.body.expireDate}',${req.body.amount} WHERE creditNum = '${req.params.creditNum}' `,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(301).json({ response });
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
  connection.query(
    `SELECT user.nickname, user.email, user.phoneNumber, orderstatus.statusText, hoadon.* from Hoadon
    INNER JOIN user ON hoadon.user = user.uid
    inner join orderstatus on hoadon.statusCode = orderstatus.statusCode;`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            created_date: moment(item.created_date).format("LLLL"),
            shipping_time: moment(item.shipping_time).format("LLLL"),
            payment_method: item.payment_method,
            statusCode: item.statusCode,
            status: item.statusText,
            comment: item.comments,
            address: item.shipping_address,
            customer: {
              uid: item.uid,
              nickname: item.nickname,
              email: item.email,
              phoneNumber: item.phoneNumber
            }
          };
        })
      });
    }
  );
});

// 2. POST a bill
router.post("/hoadon", (req, res) => {
  if (req.body.payment_method === "Credit Card") {
    connection.query(
      `SELECT Payment.creditNum FROM Payment WHERE user = ${req.body.customer}`,
      (error, document) => {
        if (error) {
          res.status(400).json({ error });
          return;
        }
        if (document.length === 0) {
          res.status(403).json({
            message: "Bạn cần có thẻ ngân hàng để thực hiện giao dịch này!"
          });
        } else {
          connection.query(
            `INSERT INTO HoaDon(user,created_date,shipping_time,shipping_address,payment_method,statusCode,comments,creditCard) VALUES
             (
             ${req.body.customer},
             NOW(),
             '${req.body.shipping_time}',
             '${req.body.shipping_address}',
             '${req.body.payment_method}',
             1,
             '${req.body.comments}',
             '${document[0].creditNum}'
             )`,
            (error, doc) => {
              if (error) {
                res.status(400).json({ error });
                return;
              }
              res.status(201).json({ response: doc });
            }
          );
        }
      }
    );
  } else {
    connection.query(
      `INSERT INTO HoaDon(user,created_date,shipping_time,shipping_address,payment_method,statusCode,comments) VALUES
       (
        ${req.body.customer},
       NOW(),
       '${req.body.shipping_time}',
       '${req.body.shipping_address}',
       '${req.body.payment_method}',
       1,
       '${req.body.comments}'
       )`,
      (error, doc) => {
        if (error) {
          res.status(400).json({ error });
          return;
        }
        res.status(201).json({ response: doc });
      }
    );
  }
});

router.patch("/hoadon/:id", (req, res) => {
  connection.query(
    `UPDATE Hoadon SET shipping_time = '${req.body.shipping_time}',shipping_address = '${req.body.shipping_address}', 
  payment_method = '${req.body.payment_method}', statusCode = ${req.body.status}, comments = '${req.body.comments}' WHERE id = ${req.params.id} `,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({ response });
    }
  );
});

// 2. SELECT a bill
router.get("/hoadon/:id", (req, res) => {
  connection.query(
    `SELECT user.nickname, user.email, user.phoneNumber, orderstatus.statusText, hoadon.* from Hoadon
    INNER JOIN user ON hoadon.user = user.uid
    inner join orderstatus on hoadon.statusCode = orderstatus.statusCode
    WHERE hoadon.id = ${req.params.id};`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({ data: doc });
    }
  );
});

router.delete("/hoadon/:id", (req, res) => {
  connection.query(
    `DELETE FROM HoaDon WHERE id = ${req.params.id}`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({ data: doc });
    }
  );
});

// Product - Hoadon Management

router.get("/", (req, res) => {
  connection.query(
    `SELECT QL_Hoadon.*, promotion.promoPercent from (SELECT product_hoadon.id, product_hoadon.qty, product.promotion, product.pricePerRatio, product.id AS productId, product.productName, product.price AS pricePerProduct, (product.price*product_hoadon.qty) AS sumOfProduct FROM product_hoadon
  INNER JOIN product ON product_hoadon.product = product.id) AS QL_Hoadon 
    INNER JOIN promotion ON QL_Hoadon.promotion = promotion.promotionId;`,
    (error, document) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: document.map(item => {
          return {
            id: item.id,
            productId: item.productId,
            quantity: item.qty,
            productName: item.productName,
            price: `${item.pricePerProduct}/${item.pricePerRatio}`,
            promo_percent: item.promoPercent,
            sum:
              item.promoPercent !== 0
                ? item.sumOfProduct -
                  (item.sumOfProduct / 100) * item.promoPercent
                : item.sumOfProduct
          };
        })
      });
    }
  );
});
router.get("/:hoadon", (req, res) => {
  connection.query(
    `SELECT QL_Hoadon.*, promotion.promoPercent from (SELECT product_hoadon.id, product_hoadon.qty,  product.promotion, product.pricePerRatio, product.id AS productId, product.productName, product.price AS pricePerProduct, (product.price*product_hoadon.qty) AS sumOfProduct FROM product_hoadon
    INNER JOIN product ON product_hoadon.product = product.id WHERE hoadon = ${req.params.hoadon}) AS QL_Hoadon 
      INNER JOIN promotion ON QL_Hoadon.promotion = promotion.promotionId;`,
    (error, document) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: document.map(item => {
          return {
            id: item.id,
            productId: item.productId,
            quantity: item.qty,
            productName: item.productName,
            price: `${item.pricePerProduct}/${item.pricePerRatio}`,
            promo_percent: item.promoPercent,
            sum:
              item.promoPercent !== 0
                ? item.sumOfProduct -
                  (item.sumOfProduct / 100) * item.promoPercent
                : item.sumOfProduct
          };
        })
      });
    }
  );
});

router.post("/:hoadon", (req, res) => {
  connection.query(
    `INSERT INTO product_hoadon (hoadon,product,qty) values (${req.params.hoadon},${req.body.product},${req.body.qty})`,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(201).json({
        response,
        message: "Success"
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  connection.query(
    `delete from product_hoadon WHERE id = ${req.params.id}`,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        response,
        message: "Success"
      });
    }
  );
});

router.patch("/:id", (req, res) => {
  // Chỉ có thể update qty
  connection.query(
    `UPDATE product_hoadon SET qty = ${req.body.qty} WHERE id = ${req.params.id}`,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        response,
        message: "Success"
      });
    }
  );
});

module.exports = router;
