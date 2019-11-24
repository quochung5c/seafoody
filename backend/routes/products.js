const router = require("express").Router();
const moment = require("moment");
const connection = require("../connection");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

moment.locale("vi");

cloudinary.config({
  cloud_name: "vn-esports",
  api_key: 996178356223912,
  api_secret: "rC8_6QyIf1DIbokVgSYe0VLsJwQ"
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const filterUpload = function(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: filterUpload,
  limits: 1024 * 1024 * 25
});

router.get("/", (req, res) => {
  connection.query(
    `SELECT product.id, product.productName, product.price, product.likes, 
    product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, 
    product.company, promotion.promocode FROM ((Product 
        INNER JOIN Company ON product.company = company.companyId)
          INNER JOIN promotion ON product.promotion = promotion.promotionId);`,
    // `SELECT * FROM Product`,
    (err, doc) => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            company_id: item.companyId,
            name: item.productName,
            type: item.productType,
            price: `${
              item.promoPercent > 0
                ? item.price - (item.price / 100) * item.promoPercent
                : item.price
            }/${item.pricePerRatio}`,
            promotion_percent: item.promoPercent + " %",
            promotion: item.promotion,
            company: item.companyName,
            promotion: item.promocode,
            likes: item.likes,
            created_at: moment(item.posted_at).format("LLLL"),
            description: item.description
          };
        })
      });
      if (err) res.status(400).json({ err });
    }
  );
});

router.get("/searchById/:id", (req, res) => {
  connection.query(
    `SELECT product.id, product.productName, product.price, product.likes, 
    product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, 
    product.company, promotion.promocode FROM ((Product 
        INNER JOIN Company ON product.company = company.companyId)
          INNER JOIN promotion ON product.promotion = promotion.promotionId) WHERE id = ${req.params.id};`,
    (err, doc) => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            company_id: item.companyId,
            name: item.productName,
            type: item.productType,
            price: `${item.price}/${item.pricePerRatio}`,
            promotion: item.promotion,
            company: item.companyName,
            promotion: item.promocode,
            likes: item.likes,
            created_at: moment(item.posted_at).format("LLLL"),
            description: item.description
          };
        })
      });
      if (err) res.status(400).json({ err });
    }
  );
});

router.get("/searchByName/:name", (req, res) => {
  connection.query(
    `SELECT product.id, product.productName, product.price, product.likes, 
    product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, 
    product.company, promotion.promocode FROM ((Product 
        INNER JOIN Company ON product.company = company.companyId)
          INNER JOIN promotion ON product.promotion = promotion.promotionId) WHERE product.productName LIKE '%${req.params.name}%';`,
    (err, doc) => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            company_id: item.companyId,
            name: item.productName,
            type: item.productType,
            price: `${item.price}/${item.pricePerRatio}`,
            promotion: item.promotion,
            company: item.companyName,
            promotion: item.promocode,
            likes: item.likes,
            created_at: moment(item.posted_at).format("LLLL"),
            description: item.description
          };
        })
      });
      if (err) res.status(400).json({ err });
    }
  );
});

router.get("/orderByPrice/ascending", (req, res) => {
  connection.query(
    `SELECT product.id, product.productName, product.price, product.likes, 
    product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, 
    product.company, promotion.promocode FROM ((Product 
        INNER JOIN Company ON product.company = company.companyId)
          INNER JOIN promotion ON product.promotion = promotion.promotionId) ORDER BY product.price;`,
    (err, doc) => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            company_id: item.companyId,
            name: item.productName,
            type: item.productType,
            price: `${item.price}/${item.pricePerRatio}`,
            promotion: item.promotion,
            company: item.companyName,
            promotion: item.promocode,
            likes: item.likes,
            created_at: moment(item.posted_at).format("LLLL"),
            description: item.description
          };
        })
      });
      if (err) res.status(400).json({ err });
    }
  );
});

router.get("/orderByPrice/descending", (req, res) => {
  connection.query(
    `SELECT product.id, product.productName, product.price, product.likes, 
    product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, 
    product.company, promotion.promocode FROM ((Product 
        INNER JOIN Company ON product.company = company.companyId)
          INNER JOIN promotion ON product.promotion = promotion.promotionId) ORDER BY product.price DESC;`,
    (err, doc) => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            company_id: item.companyId,
            name: item.productName,
            type: item.productType,
            price: `${item.price}/${item.pricePerRatio}`,
            promotion: item.promotion,
            company: item.companyName,
            promotion: item.promocode,
            likes: item.likes,
            created_at: moment(item.posted_at).format("LLLL"),
            description: item.description
          };
        })
      });
      if (err) res.status(400).json({ err });
    }
  );
});

router.get("/filterBy/:genre", (req, res) => {
  connection.query(
    `SELECT product.id, product.productName, product.price, product.likes, 
    product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, 
    product.company, promotion.promocode FROM ((Product 
        INNER JOIN Company ON product.company = company.companyId)
          INNER JOIN promotion ON product.promotion = promotion.promotionId) WHERE productType = '${req.params.genre}';`,
    (req, doc) => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            company_id: item.companyId,
            name: item.productName,
            type: item.productType,
            price: `${item.price}/${item.pricePerRatio}`,
            promotion: item.promotion,
            company: item.companyName,
            promotion: item.promocode,
            likes: item.likes,
            created_at: moment(item.posted_at).format("LLLL"),
            description: item.description
          };
        })
      });
      if (err) res.status(400).json({ err });
    }
  );
});

// Lấy promotion
router.get("/promotion", (req, res) => {
  connection.query("SELECT * FROM Promotion", (error, doc) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json({
      data: doc.map(item => {
        return {
          id: item.promotionId,
          code: item.promocode,
          percent: item.promoPercent,
          expired: moment(item.expiredDate).format("LLLL"),
          description: item.promoDescription
        };
      })
    });
  });
});

// Upload sản phẩm
// Mã user, tên sản phẩm, giá sản phẩm, loại sản phẩm, mô tả sản phẩm, mã khuyến mãi, định lượng giá, hình ảnh
router.post("/", upload.single("product"), (req, res) => {
  cloudinary.uploader
    .upload(req.file.path, { resource_type: "image" })
    .then(document => {
      connection.query(
        `SELECT company.* FROM User INNER JOIN Company ON user.company = company.companyId WHERE user = ${req.body.user}`,
        (error, doc) => {
          if (doc.length === 0) {
            res.status(403).json({ message: "Bạn phải tham gia 1 công ty để đăng sản phẩm!" });
            return;
          } else {
            console.log(document.secure_url);
            connection.query(
              `INSERT INTO Product (productName,price,productType,posted_at,company,description,promotion,pricePerRatio,imageUrl) VALUES (
          '${req.body.productName}',${req.body.price},'${req.body.productType}',NOW(),${doc[0].company},'${req.body.description}',${req.body.promotion},'${req.body.pricePerRatio}','${document.secure_url}'
        );`,
              (err, response) => {
                if (err) {
                  res.status(400).json({ err });
                  return;
                }
                res.status(200).json({ response });
              }
            );
          }

          if (error) {
            res.status(400).json({ error });
            return;
          }
        }
      );
    });
});

router.get("/favorites/:product", (req, res) => {
  connection.query(
    `SELECT user.nickname, user.email FROM Favorites
    INNER JOIN Product ON favorites.product = product.id
      INNER JOIN User ON favorites.customer = user.uid
  WHERE product.id = ${req.params.product};`,
    (err, doc) => {
      res.status(200).json({
        data: doc
      });
      if (err) res.status(400).json({ err });
    }
  );
});

router.patch("/likes/:product", (req, res) => {
  connection.query(
    `INSERT INTO Favorites(product,customer) VALUES (${req.params.product},${req.body.user}); 
    UPDATE Product SET likes = likes + 1 WHERE id = ${req.params.product};`,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(201).json({ response });
    }
  );
});

router.delete("/:product", (req, res) => {
  connection.query(
    `DELETE FROM Product WHERE id = ${req.params.product}`,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({ response });
    }
  );
});

module.exports = router;
