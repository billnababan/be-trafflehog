const { exec } = require("child_process");
const { log, error } = require("console");
const { query } = require("../config/db");
const fs = require("fs");
const { stdout, stderr } = require("process");

// async function detectCredentials(req, res) {
//   const url = req.body;
//   // console.log(url.url);
//   try {
//     const command = `trufflehog --regex --entropy False ${url.url}`;
//     console.log(command);

//     exec(command, (error, stdout, stderr) => {
//       // console.log(stdout);
//       return res.status(200).json({ data: stdout });
//     });
//   } catch (error) {
//     return {
//       url,
//       error: error.message,
//     };
//   }
// }

async function detectCredentials(req, res) {
  const url = req.body;
  // console.log(url.url);
  try {
    const command = `trufflehog --regex --entropy False ${url.url}`;
    console.log(command);
    exec(command, async (error, stdout, stderr) => {
      // Validasi jika terdapat private key
      // Simpan hasil scanning ke dalam database
      const result = {
        repo_url: url.url,
        credential: stdout,
        date: new Date(),
      };
      await query(
        "INSERT INTO result_repo (repo_url, credential, date) VALUES (?, ?, ?)",
        [result.repo_url, result.credential, result.date]
      );
      return res.status(200).json({
        message: "Private key detected!",
        data: result,
      });
    });
  } catch (error) {
    return {
      url,
      error: error.message,
    };
  }
}

async function scanALlRepo(req, res) {
  const git_url = req.body;
  // console.log(url.url);
  try {
    const command = `trufflehog ${git_url.git_url}`;
    console.log(command);

    exec(command, (error, stdout, stderr) => {
      // console.log(stdout);
      return res.status(200).json({ data: stdout });
    });
  } catch (error) {
    return {
      git_url,
      error: error.message,
    };
  }
}

module.exports = {
  detectCredentials,
  scanALlRepo,
};
