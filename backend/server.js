const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const userController = require("./router/user")

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Add new user
app.use('/',userController);

app.listen(
  process.env.PORT,
  console.log(`server is listening on the port: ${process.env.PORT}`)
);
