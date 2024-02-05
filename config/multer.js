const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images"); // Set the destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}`;
    const extension = path.extname(file.originalname).toLowerCase();
    const filename = `${uniqueSuffix.substring(0, 150)}${extension}`;
    cb(null, filename); // Rename the file
  },
});

const fileFilter = (req, file, cb) => {
  // Check file type, size, or any other conditions
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heif"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // cb(new Error("File tidak didukung."));
    cb(null, false); // Indicate that the file is not accepted
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB file size limit
  },
  fileFilter: fileFilter,
});

module.exports = upload;
