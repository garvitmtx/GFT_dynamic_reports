const express = require("express");
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

/* -----------------------------------------
   🔐 Middleware: Verify JWT Token
----------------------------------------- */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    req.user = user;
    next();
  });
}

/* -----------------------------------------
   ✅ API 1: Verify kit_id + phone
----------------------------------------- */
app.post("/api/verify-customer", async (req, res) => {
  try {
    const { kit_id, phone_number } = req.body;
    if (!kit_id || !phone_number) {
      return res.status(400).json({
        success: false,
        message: "kit_id and phone_number are required",
      });
    }

    const [rows] = await pool.execute(
      `SELECT * FROM customer_information 
       WHERE kit_id = ? AND mobile_number = ?`,
      [kit_id, phone_number]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid kit_id or phone number",
      });
    }

    // 🔥 Generate JWT token
    const token = jwt.sign(
      { kit_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      success: true,
      message: "Customer verified",
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


/* -----------------------------------------
   📄 API 2: Get Report (Protected)
----------------------------------------- */
app.get("/api/report/:kit_id", authenticateToken, async (req, res) => {
  try {
    const { kit_id } = req.params;

    // 🔐 Ensure user can only access their own report
    if (req.user.kit_id !== kit_id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this report",
      });
    }

    const [rows] = await pool.execute(
      `SELECT report_json FROM gft_reports WHERE kit_id = ?`,
      [kit_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.json({
      success: true,
      report: rows[0].report_json,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


/* -----------------------------------------
   🚀 Start Server
----------------------------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
