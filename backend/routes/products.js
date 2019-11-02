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
    `SELECT product.id, product.productName, product.price, product.productType, promotion.promoPercent, product.posted_at, product.description, product.pricePerRatio, company.companyName, product.company, promotion.promocode, employee.firstName, employee.lastName FROM (((Product 
        INNER JOIN Company ON product.company = company.companyId)
          INNER JOIN promotion ON product.promotion = promotion.promotionId)
          INNER JOIN employee ON product.employee = employee.empId);`,
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
            employee: `${item.firstName} ` + `${item.lastName}`,
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
    `SELECT product.productName, product.id, product.price, product.productType, product.posted_at, product.description, product.pricePerRatio,
  company.companyName, company.companyId,
  promotion.promocode, promotion.promotionId, 
  employee.firstName, employee.lastName FROM (((Product 
    INNER JOIN company ON product.id = company.companyId)
      INNER JOIN promotion ON product.promotion = promotion.promotionId)
      INNER JOIN employee ON product.employee = employee.empId) WHERE id = ${req.params.id}`,
    (err, doc) => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            employee_id: item.empId,
            company_id: item.companyId,
            name: item.productName,
            type: item.productType,
            price: `${item.price}/${item.pricePerRatio}`,
            promotion: item.promotion,
            company: item.companyName,
            promotion: item.promocode,
            employee: `${item.firstName} ` + `${item.lastName}`,
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
    `SELECT product.productName, product.id, product.price, product.productType, product.posted_at, product.description, product.pricePerRatio,
  company.companyName, company.companyId,
  promotion.promocode, promotion.promotionId, 
  employee.firstName, employee.lastName FROM (((Product 
    INNER JOIN company ON product.id = company.companyId)
      INNER JOIN promotion ON product.promotion = promotion.promotionId)
      INNER JOIN employee ON product.employee = employee.empId) WHERE product.productName LIKE '%${req.params.name}%';`,
    (err, doc) => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            employee_id: item.empId,
            company_id: item.companyId,
            name: item.productName,
            type: item.productType,
            price: `${item.price}/${item.pricePerRatio}`,
            promotion: item.promotion,
            company: item.companyName,
            promotion: item.promocode,
            employee: `${item.firstName} ` + `${item.lastName}`,
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
// Upload sản phẩm
router.post("/", upload.single("product"), (req, res) => {
  // Validate employee
  connection.query(
    `SELECT Employee.*, company.companyName FROM Employee INNER JOIN Company ON employee.company = company.companyId WHERE user = ${req.body.user}`,
    (error, doc) => {
      if (doc.length === 0) {
        res.status(403).json({ message: "Not found" });
        return;
      } else {
        console.log(doc[0].empId, doc[0].company);
        connection.query(
          `INSERT INTO Product (productName,price,productType,posted_at,company,description,promotion,pricePerRatio,productImg,employee) VALUES (
          '${req.body.productName}',${req.body.price},'${req.body.productType}',NOW(),${doc[0].company},'${req.body.description}',${req.body.promotion},'${req.body.pricePerRatio}',${req.body.productImg},${doc[0].empId}
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

router.get("/favorites/:id", (req, res) => {
  connection.query(
    `SELECT product.*, productimage.imageUrl FROM (((Favorites
         JOIN User ON favorites.customer = user.uid)
         JOIN Product ON favorites.product = product.id)
         JOIN productimage ON favorites.product = productimage.product)
     WHERE favorites.customer = ${req.params.id} AND productimage.featureIn = 1;`,
    (err, doc) => {
      res.status(200).json({
        data: doc.map(item => {
          return {
            id: item.id,
            employee_id: item.empId,
            company_id: item.companyId,
            name: item.productName,
            type: item.productType,
            price: `${item.price}/${item.pricePerRatio}`,
            promotion: item.promotion,
            company: item.companyName,
            promotion: item.promocode,
            employee: `${item.firstName} ` + `${item.lastName}`,
            likes: item.likes,
            created_at: moment(item.posted_at).format("LLLL"),
            description: item.descriptionF
          };
        })
      });
      if (err) res.status(400).json({ err });
    }
  );
});

module.exports = router;
