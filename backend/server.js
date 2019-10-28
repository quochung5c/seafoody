const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connection } = require("./connection");
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/", express.static(__dirname));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
