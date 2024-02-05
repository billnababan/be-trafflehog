const Router = require("express").Router();
const trufflehogController = require("../controllers/newDetect");

Router.post("/deteksi", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    const result = await trufflehogController.detectCredentials(url);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = Router;
