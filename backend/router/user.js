const express = require("express");
const router = express.Router();
const db = require("../config")

router.post("/register", (req, res) => {
    console.log("register")
    console.log(req.body);
    const { name, email,password,logo,address,comAddress, comGstNo, comPanNo, city, state, zipCode, phoneNo, emailAdd, websiteUrl, bankName, accNo, ifscCode, branch } = req.body;
    console.log(name,email);
    // const sqlInsert = "INSERT INTO users (name,email) VALUES (?,?);";
    // db.query(sqlInsert, [name, email], (err, result) => {
    //   if (err) {
    //     console.log(err, "err");
    //     res.status(200).json(err);
    //   } else {
    //     console.log(result, "result");
    //     res.status(200).json(result);
    //   }
    // });
  });


module.exports = router;
