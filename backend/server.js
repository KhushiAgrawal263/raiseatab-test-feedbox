const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const userController = require("./router/user")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// [Personal Name]
// [Logo]
// [Your Company Name]
// [Your Company Address]
// [Company GST No.]
// [Company PAN No.]
// [City, State, ZIP Code]
// [Phone Number]
// [Email Address]
// [Website URL]
// [Your Company's Bank Account Information] -:
// Bank name, Acc. No., IFSC Code, Branch
// Password


// Add new user
app.use('/',userController);

app.listen(
  process.env.PORT,
  console.log(`server is listening on the port: ${process.env.PORT}`)
);
