const express = require("express");
const router = express.Router();
const db = require("../config");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const { verifyToken } = require("./requireLogin");

const upload = multer({});
const { authenticateGoogle, uploadToGoogleDrive } = require("../driveConfig");

async function generatePdf(component) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(component);
  const pdf = await page.pdf({ format: "A4" });
  await browser.close();
  return pdf;
}

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
            { userId: user.user_id },
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
router.get("/getUser", verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const query = `SELECT * FROM users WHERE user_id = ${userId}`;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

// Generate invoice and save as draft
router.post("/set/invoice/draft/:type", verifyToken, async (req, res) => {
  try {
    let clone = Object.values(req.body);
    clone.push(req.user.userId)
    clone.push("draft")
    console.log(clone);
    let sqlInsert;
    if(req.params.type==="mentoring"){
      sqlInsert =
      "INSERT INTO invoices (invoice_id,invoice_date,invoice_total,client_name,client_comp_name,client_add,client_comp_add,client_city,client_state,client_zip,client_contactNo,client_email,client_country,subtotal,tax,total,dueDate,user_id,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    }
    db.query(sqlInsert, clone, (err, result) => {
      if (err) {
        console.log(err);
        res.status(200).json(err);
      } else {
        console.log("dobe");
        res.status(200).json(result);
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// update user on invoice generation
router.post(
  "/update/user/invoice/:id",
  upload.single("logo"),
  verifyToken,
  async (req, res) => {
    try {
      console.log(req.body, "llll");
      console.log(req.file, "file");
      if (req.file) {
        const auth = authenticateGoogle();
        const newlogo = await uploadToGoogleDrive(
          req.file,
          auth,
          process.env.DRIVE_LOGO
        );
        const drive = google.drive({ version: "v3", auth });
        drive.files
          .delete({
            fileId: req.body.logoId,
          })
          .then(async function (response) {
            const { logoId, ...cloneVal } = req.body;
            console.log(cloneVal);
            const newClone = Object.values(cloneVal);
            newClone.push(newlogo.data.id);
            console.log(newClone, "new clone");
            const userquery = `UPDATE users SET companyName = ?, companyAddress=?, city=?, state=?, zipcode=?, country=?, email=?, phoneNo=?, logo=? where user_id=${req.params.id}`;
            db.query(userquery, newClone, (err, result) => {
              if (err) throw err;
              res.status(200).json(result);
            });
          });
      } else {
        const { logoId, ...cloneVal } = req.body;
        console.log(cloneVal);
        const userquery = `UPDATE users SET companyName = ?, companyAddress=?, city=?, state=?, zipcode=?, country=?, email=?, phoneNo=?  where user_id=${req.params.id}`;
        db.query(userquery, Object.values(cloneVal), (err, result) => {
          if (err) throw err;
          res.status(200).json(result);
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// get drafts of a particular user
router.get("/get/draft/invoices", verifyToken, async (req, res) => {
  console.log(req.user.userId);
  try {
    const userquery = `UPDATE users SET name = ${req.body.name} where user_id=${req.user.userId}`;
    db.query(sqlInsert, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });

    // const sqlInsert =
    //     `select * from users JOIN invoices on users.user_id= invoices.user_id where invoices.user_id=${req.user.userId}`;
    //     db.query(sqlInsert, (err, result) => {
    //       if (err) throw err;
    //       res.status(200).json(result);
    //     });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
