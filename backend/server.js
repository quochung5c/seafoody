const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { connection } = require("./connection");
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/uploads", express.static("uploads"));
app.use("/", express.static(__dirname));

app.listen(8088, () => {
  console.log("Listening on port 8088");
});
