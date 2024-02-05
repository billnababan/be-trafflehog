require("dotenv").config();
const express = require("express");
// const { NODE_PORT } = require("./config/configs");
const cors = require("cors");
const app = express();
const authApi = require("./router-api/auth-api");

const scan = require("./router-api/backup");

const scannerRoutes = require("./router-api/hasil");

const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
const path = require("path");

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));
app.use(cors({ origin: "*" }));

app.use(errorHandler);
// app.use("/public/images/", express.static(path.join(__dirname, "public/images/")));
app.use("/api/auth", authApi);

app.use("/api/detect", scan);

app.use("/api/detectt", scannerRoutes);

// app.post("/upload", upload.array("images", 4), (req, res) => {
//   console.log("UPLOAD MULTIPLES");

//   const imagePath = req.file;
//   console.log("req.file", imagePath);
//   const imagePaths = req.files;
//   console.log("req.files", imagePaths);
//   res.json({
//     data: imagePaths,
//   });
// });

// app.post("/upload-single", upload.single("images"), (req, res) => {
//   console.log("UPLOAD SINGLE");
//   const imagePath = req.file;
//   console.log("req.file", imagePath);
//   const imagePaths = req.files;
//   console.log("req.files", imagePaths);
//   res.json({
//     data: imagePath,
//   });
// });

app.listen(4000, () => {
  console.log(`Server is Running on port 4000 http://localhost:4000`);
});
