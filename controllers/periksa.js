const { exec } = require("child_process");

const scanCredentials = async (req, res) => {
  try {
    const { repository } = req.query;

    if (!repository) {
      return res.status(400).json({ error: "Repository is required" });
    }

    const command = `trufflehog git ${repository} --only-verified`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (stderr) {
        return res.status(500).json({ error: stderr });
      }

      res.status(200).json({ output: stdout });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  scanCredentials,
};
