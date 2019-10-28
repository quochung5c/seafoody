const router = require("express").Router();
const moment = require("moment");
const connection = require("../connection");

moment.locale("vi");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM product", (err, doc) => {
    res.status(200).json({ doc });
    if (err) res.status(400).json({ err });
  });
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
        counts: doc.length,
        data: doc
        // data: doc.map(item => {
        //   return {
        //     id: item.id,
        //     name: item.productName,
        //     type: item.productType,
        //     price: `${item.price}/${item.pricePerRatio}`,
        //     promotion: item.promotion,
        //     likes: item.likes,
        //     created_at: moment(item.posted_at).format("LLLL"),
        //     description: item.description
        //   };
        // })
      });
      if (err) res.status(400).json({ err });
    }
  );
});

module.exports = router;
