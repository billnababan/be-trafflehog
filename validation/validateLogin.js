// const { query } = require("../config/db");
// const bcrypt = require("bcrypt");

// const validateLogin = async (req, res, next) => {
//   if (!req.body.email || req.body.email.trim() === "") {
//     return res.status(400).json({ success: false, message: "Silahkan isikan email!" });
//   }

//   try {
//     const [rows] = await query("SELECT email, password FROM users WHERE email = ?", [req.body.email]);

//     console.log(rows);
//     if (!rows.length > 0) {
//       return res.status(400).json({ success: false, message: "Email atau Password salah!" });
//     }

//     const user = rows[0];
//     const passwordHash = user.password;

//     // Compare the entered password with the hashed password from the database
//     const isPasswordValid = await bcrypt.compare(req.body.password, passwordHash);

//     if (!isPasswordValid) {
//       return res.status(400).json({ success: false, message: "Email atau Password salah!" });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Internal Server Error!" });
//   }
// };

// module.exports = validateLogin;
