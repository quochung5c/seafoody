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
    `SELECT company.companyId, company.companyName, company.location, company.phoneNumber, company.description FROM company;`,
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

router.get("/:id", (req, res) => {
  connection.query(
    `SELECT * FROM company WHERE companyId = ${req.params.id};`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        data: doc.map(item => {
          return {
            id: item.companyId,
            avatar: item.avatarUrl,
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

router.get("/products/:company", (req, res) => {
  connection.query(
    `SELECT product.id, product.productName, product.price, product.likes, product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, product.company, promotion.promocode, employee.firstName, employee.lastName FROM (((Product 
      INNER JOIN Company ON product.company = company.companyId)
        INNER JOIN promotion ON product.promotion = promotion.promotionId)
        INNER JOIN employee ON product.employee = employee.empId)
      WHERE product.company = ${req.params.company};`,
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
    `SELECT company.companyId, company.companyName, company.location, company.phoneNumber, company.description FROM company WHERE company.companyId = ${req.params.id};`,
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
            employees: item.NumberOfEmp,
            location: item.location,
            phoneNumber: item.phoneNumber,
            description: item.description
          };
        })
      });
    }
  );
});

router.get("/searchByName/:name", (req, res) => {
  connection.query(
    `SELECT company.companyId, COUNT(empId) AS NumberOfEmp, employee.company as companyId, company.companyName, company.location, company.phoneNumber, company.description FROM employee 
           INNER JOIN Company ON employee.company = company.companyId WHERE company.companyName LIKE '%${req.params.name}%' group by company ;`,
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
            employees: item.NumberOfEmp,
            location: item.location,
            phoneNumber: item.phoneNumber,
            description: item.description
          };
        })
      });
    }
  );
});

router.delete("/:company", (req, res) => {
  connection.query(
    `DELETE FROM Company WHERE companyId = ${req.params.company}`,
    (error, response) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({ message: "Đã xóa thành công", response });
    }
  );
});

module.exports = router;