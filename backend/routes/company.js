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
    `SELECT Company.CompanyId, Company.CompanyName, Company.location, Company.phoneNumber, Company.description FROM Company;`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: doc.map(item => {
          return {
            id: item.CompanyId,
            name: item.CompanyName,
            location: item.location,
            phoneNumber: item.phoneNumber,
            description: item.description
          };
        })
      });
    }
  );
});

router.get("/:id", (req, res) => {
  connection.query(
    `SELECT * FROM Company WHERE CompanyId = ${req.params.id};`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: doc.map(item => {
          return {
            id: item.CompanyId,
            avatar: item.avatarUrl,
            name: item.CompanyName,
            location: item.location,
            phoneNumber: item.phoneNumber,
            description: item.description
          };
        })
      });
    }
  );
});

router.get("/products/:company", (req, res) => {
  connection.query(
    `SELECT product.id, product.productName, product.price, product.likes, product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, 
    Company.CompanyName, product.Company, promotion.promocode FROM ((Product 
      INNER JOIN Company ON product.Company = Company.CompanyId)
        INNER JOIN promotion ON product.promotion = promotion.promotionId)
      WHERE product.Company = ${req.params.company};`,
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

router.post("/", upload.single("image"), (req, res) => {
  cloudinary.uploader
    .upload(req.file.path, { resource_type: "image" })
    .then(doc => {
      connection.query(
        `insert INTO Company(companyName,avatarUrl,location,description,phoneNumber) values (
          '${req.body.companyName}',
          '${doc.secure_url}',
          '${req.body.location}',
          '${req.body.description}',
          '${req.body.phoneNumber}');`,
        (error, response) => {
          if (error) {
            res.status(400).json({ error });
          }
          res.status(201).json({ response });
        }
      );
    });
});

router.get("/searchById/:id", (req, res) => {
  connection.query(
    `SELECT Company.CompanyId, Company.CompanyName, Company.location, Company.phoneNumber, Company.description FROM Company WHERE Company.CompanyId = ${req.params.id};`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: doc.map(item => {
          return {
            id: item.companyId,
            name: item.companyName,
            location: item.location,
            phoneNumber: item.phoneNumber,
            description: item.description
          };
        })
      });
    }
  );
});

router.get("/searchByName/:name", (req, res) => {});

// Lấy các người dùng thuộc công ty
router.get("/users/:Company", (req, res) => {
  connection.query(
    `SELECT * FROM User WHERE Company = ${req.params.Company}`,
    (error, document) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({ counts: document.length, data: document });
    }
  );
});

router.delete("/:Company", (req, res) => {
  connection.query(
    `DELETE FROM Company WHERE CompanyId = ${req.params.Company}`,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({ message: "Đã xóa thành công", response });
    }
  );
});

router.patch("/:Company", (req, res) => {
  connection.query(
    `UPDATE Company SET CompanyName = '${req.body.CompanyName}',
  location = '${req.body.location}', description = '${req.body.description}',
  phoneNumber = '${req.body.phoneNumber}' WHERE CompanyId = ${req.params.Company} `,
    (error, response) => {
      if (error) {
        res.status(400).json({ message: "Có lỗi", error });
        return;
      }
      res.status(200).json({ response });
    }
  );
});

module.exports = router;
