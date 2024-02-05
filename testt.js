const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/detect", (req, res) => {
  const repositoryUrl = req.body.repositoryUrl;

  // Lakukan deteksi hardcoded credentials dengan menggunakan command git clone
  exec(`git clone ${repositoryUrl}`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    try {
      // Tunggu hingga klona selesai sebelum melanjutkan
      await new Promise((resolve, reject) => {
        exec("echo 'Klona Selesai'", (cloneError, cloneStdout, cloneStderr) => {
          if (cloneError) {
            reject(cloneError);
            return;
          }
          resolve();
        });
      });

      // Lakukan pencarian berbasis konten dalam file-file di repositori yang telah di-clone
      exec("grep -rE 'password|username|database|DB_PORT|DB_PASSWORD|secret' .", { cwd: repositoryUrl.split("/").pop() }, (grepError, grepStdout, grepStderr) => {
        if (grepError) {
          console.error(`Error running grep: ${grepStderr}`);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        // Cek apakah hasil deteksi kosong atau tidak
        const detectionResult = grepStdout.trim();
        if (detectionResult === "") {
          res.json({ result: "No hardcoded credentials detected." });
        } else {
          // Jika ada hasil, tampilkan hasil deteksi
          res.json({ result: "Hardcoded credentials detected!", details: detectionResult });
        }

        // Hapus repositori sementara setelah selesai deteksi
        exec(`rm -rf "${repositoryUrl.split("/").pop()}"`, (removeError, removeStdout, removeStderr) => {
          if (removeError) {
            console.error(`Error removing temporary directory: ${removeStderr}`);
          }
        });
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
