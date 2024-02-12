const Router = require("express").Router();
const trufflehogController = require("../controllers/newDetect");

Router.post("/deteksi", trufflehogController.detectCredentials);
Router.post("/scan", trufflehogController.scanALlRepo);
module.exports = Router;
