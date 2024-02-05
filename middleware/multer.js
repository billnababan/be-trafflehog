const multer = require("multer");
const { fileDir } = require("../file_handler.cjs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileDir());
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now().toString();
    const fileExtension = file.originalname.split(".").pop(); // Mendapatkan ekstensi file
    const validExtensions = ["jpg", "jpeg", "png"]; // Daftar ekstensi file yang diizinkan

    if (validExtensions.includes(fileExtension.toLowerCase())) {
      cb(null, `${uniqueSuffix}.${fileExtension}`); // Menyimpan file dengan ekstensi yang sesuai
    } else {
      cb(new Error("Invalid file extension"));
    }
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const validMimeTypes = ["image/jpeg", "image/png"]; // Daftar tipe mime yang diizinkan
    if (validMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
}).single("profil");

export default upload;
