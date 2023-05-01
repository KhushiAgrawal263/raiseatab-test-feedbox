const express = require("express");
const router = express.Router();
const db = require("../config");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./requireLogin");
// const bcrypt = require('bcryptjs');

const upload = multer({});
const { authenticateGoogle, uploadToGoogleDrive } = require("../driveConfig");

// Register a user
router.post("/register", upload.single("logo"), async (req, res) => {
  console.log("register");
  const { name, email, password, companyAddress, companyName, gstNo, panNo } =
    req.body;
  console.log(name, req.file);

  if (req.file) {
    const auth = authenticateGoogle();
    const response = await uploadToGoogleDrive(
      req.file,
      auth,
      process.env.DRIVE_LOGO
    );

    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;

      // Insert user into database with hashed password
      const sqlInsert =
        "INSERT INTO users (name,email,password,logo,companyAddress,companyName,gstNo,panNo) VALUES (?,?,?,?,?,?,?,?);";
      db.query(
        sqlInsert,
        [
          name,
          email,
          hash,
          response.data.id,
          companyAddress,
          companyName,
          gstNo,
          panNo,
        ],
        (err, result) => {
          if (err) {
            console.log(err, "err");
            res.status(200).json(err);
          } else {
            console.log(result, "result");
            res.status(200).json("Successfully Registered");
          }
        }
      );
    });
  }
});

// Login a user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json("Error fetching user");
      } else if (results.length === 0) {
        res.status(401).json("Invalid credentials");
      } else {
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2d" }
          );
          res.json({ token });
        } else {
          res.status(401).json("Invalid credentials");
        }
      }
    }
  );
});

// Get Logged In user
router.get("/getUser", verifyToken, (req, res) => {
  const userId = req.user.userId;
  const query = `SELECT * FROM users WHERE id = ${userId}`;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

// Generate invoice and save as draft
router.post("set/invoice/draft", upload.single("logo"), async (req, res) => {

});

module.exports = router;
