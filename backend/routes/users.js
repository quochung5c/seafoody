const router = require("express").Router();
const connection = require("../connection");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM user", (err, doc) => {
    res.status(200).json({ doc });
    if (err) res.status(400).json({ err });
  });
});

module.exports = router;
