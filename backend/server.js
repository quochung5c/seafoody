const express = require("express");
const app = express();
const { connection } = require("./connection");
const userRoute = require('./routes/users');

express.urlencoded({extended: true});
express.json();

app.use('/users',userRoute);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
