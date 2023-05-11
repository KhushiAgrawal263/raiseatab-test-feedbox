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

// Register a user
router.post("/register", upload.single("logo"), async (req, res) => {
  console.log("register");
  const { name, email, password, companyAddress, companyName, gstNo, panNo,logo,personalAddress,city,state, country, pin } =
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
        "INSERT INTO users (response.data.id,name,email,hash,logo,companyAddress,companyName,gstNo,panNo,address,city,state,zipcode,phoneNo,country) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
      db.query(
        sqlInsert,
        [
          response.data.id,
          name,
          email,
          hash,
          logo,
          companyAddress,
          companyName,
          gstNo,
          panNo,
          personalAddress,
          city,
          state,
          country,
          pin
          
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

// Get Logged In user
router.get("/getInvoiceData/:id", verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const query = `SELECT * FROM invoices WHERE invoice_id = ${id} AND user_id=${userId}`;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});
const nodemailer = require("nodemailer");
const fs = require("fs");

// Send mail on invoice generation
router.post(
  "/sendmail/invoice/client",
  upload.single("pdf"),
  verifyToken,
  async (req, res) => {
    try {
      console.log("kjbhg");
      console.log("skmck", req.body, req.file);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: false,
        auth: {
          user: "anushkashah02.feedbox@gmail.com",
          pass: "yceufigcgnnttczm",
        },
      });

      const mailOptions = {
        from: "<anushkashah02.feedbox@gmail.com>",
        to: "<shahanushka67@gmail.com>",
        subject: "My PDF Attachment",
        text: "Please find attached my PDF",
        attachments: [
          {
            filename: req.file.originalname,
            content: req.file.buffer,
            contentType: "application/pdf",
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// Generate invoice and save as draft
router.post("/set/invoice/draft/:type", verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    const {invoice_id,invoiceDate,client_name,client_comp_name,invoiceTotal,client_add,client_comp_add,client_city,client_state,client_zip,client_contactNo,client_email,client_country,subTotal,tax,total,dueDate,yourName}= req.body;
    const clone = [invoice_id,invoiceDate,invoiceTotal,client_name,client_comp_name,client_add,client_comp_add,client_city,client_state,client_zip,client_contactNo,client_email,client_country,subTotal,tax,total,dueDate,yourName,req.user.userId,"draft"]
    let sqlInsert;
    if (req.params.type === "mentoring") {
      sqlInsert =
        "INSERT INTO invoices (invoice_id,invoice_date,invoice_total,client_name,client_comp_name,client_add,client_comp_add,client_city,client_state,client_zip,client_contactNo,client_email,client_country,subtotal,tax,total,dueDate,yourName,user_id,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    }
    db.query(sqlInsert, clone, (err, result) => {
      if (err) {
        console.log(err);
        res.status(200).json(err);
      } else {
        console.log("dobe");
        res.status(200).json(true);
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

// update items on invoice generation
router.post("/update/items/invoice/:invoiceid", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    let clone = req.body;
    req.body.map((data) => {
      const userquery =
        "INSERT INTO items (name,quantity,rate,amount,user_id,invoice_id) VALUES (?,?,?,?,?,?);";
      db.query(
        userquery,
        [data.name, data.quantity, data.rate, data.amount, req.user.userId, req.params.invoiceid],
        (err, result) => {
          if (err) throw err;
          // res.status(200).json(result);
          console.log(result);
        }
      );
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// svae invoice pdf to backend
router.post(
  "/save/invoice/pdf",
  upload.single("pdf"),
  verifyToken,
  async (req, res) => {
    try {
      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(
        req.file,
        auth,
        process.env.DRIVE_INVOICE_PDF
      );
      console.log(response.data.id);

      const {invoice_id,invoice_date,client_name,client_email}=req.body

      sqlInsert =
        "INSERT INTO invoices (invoice_id,invoice_date,client_name,client_email,pdf,user_id,status) VALUES (?,?,?,?,?,?,?);";

      db.query(sqlInsert, [invoice_id,invoice_date,client_name,client_email,response.data.id,req.user.userId,"unpaid"], (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json(err);
        } else {
          console.log("dobe");
          res.status(200).json(true);
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// get drafts of a particular user
router.get("/get/draft/invoices", verifyToken, async (req, res) => {
  console.log(req.user.userId);
  try {
    const sqlInsert = `select * from users JOIN invoices on users.user_id= invoices.user_id where invoices.user_id=${req.user.userId}`;
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
