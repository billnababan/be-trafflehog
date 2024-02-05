const { CredentialsDetectorController, getRepo, getAllRepo, deleteRepo } = require("../controllers/detectRepo");
const credentialsDetector = new CredentialsDetectorController();
const Router = require("express").Router();
Router.post("/check", async (req, res) => {
  const url = req.body.url;
  const fileType = req.body.fileType || "html";

  const result = await credentialsDetector.detectCredentials(url, fileType);

  if (result.credentials) {
    res.status(200).json(result);
  } else if (result.error) {
    res.status(500).json({ message: result.error });
  } else {
    res.status(200).json(result);
  }
});
Router.get("/", getRepo);
Router.get("/getAllRepo", getAllRepo);

Router.delete("/deleteRepo/:id", deleteRepo);

module.exports = Router;
