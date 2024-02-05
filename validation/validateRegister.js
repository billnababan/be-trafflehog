// const { query } = require("../config/db");

// // REGEX PATTERNS
// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // const phoneNumberPattern = /^\d{10,}$/;
// // const passwordPattern = /^(?=.*[a-zA-Z0-9!@#$%^&*]).{8,}$/;

// // const validateRegistrationFields = async (req, res, next) => {
// //   // Check for required fullname field
// //   console.log("Data yang diterima di server:", req.body);
// //   if (!req.body.fullname || req.body.fullname.trim() === "") {
// //     return res.status(400).json({
// //       success: false,
// //       message: "Silahkan isi nama lengkap!",
// //     });
// //   }

// //   if (!req.body.email || req.body.email.trim() === "") {
// //     return res.status(400).json({ success: false, message: "Silahkan isikan email!" });
// //   }
// //   // check email pattern
// //   if (!emailPattern.test(req.body.email)) {
// //     return res.status(400).json({ success: false, message: "Silahkan isi email!" });
// //   }

// //   try {
// //     const [rows] = await query("SELECT email FROM users WHERE email = ?", [req.body.email]);

// //     console.log(rows);
// //     if (rows && rows.length > 0) {
// //       return res.status(400).json({ success: false, message: "Email sudah terdaftar!" });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ success: false, message: "Internal Server Error!" });
// //   }

// //   // const phoneNumber = req.body.phone_number && req.body.phone_number.toString().trim();

// //   // if (!phoneNumber || phoneNumber === "") {
// //   //   return res.status(400).json({ success: false, message: "Silahkan isi nomor telepon!" });
// //   // }

// //   // if (!phoneNumberPattern.test(phoneNumber)) {
// //   //   return res.status(400).json({
// //   //     success: false,
// //   //     message: "Silahkan isi nomor telepon dengan benar!",
// //   //   });
// //   // }

// //   // If all checks pass, proceed to the next middleware or route handler
// //   next();
// // };

// // module.exports = validateRegistrationFields;
