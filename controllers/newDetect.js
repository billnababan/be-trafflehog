const { exec } = require("child_process");
const fs = require("fs");

async function detectCredentials(url) {
  try {
    const command = `trufflehog ${url}`;
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ stdout, stderr });
      });
    });

    if (stderr) {
      throw new Error(stderr);
    }

    const credentials = JSON.parse(stdout);

    if (credentials && credentials.matches && credentials.matches.length > 0) {
      const output = {
        detectorType: "Trufflehog",
        decoderType: "PLAIN",
        rawResult: credentials,
        line: 0,
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        message: `Found credentials using Trufflehog`,
      };

      // Insert output into database
      const date = new Date().toISOString().slice(0, 19).replace("T", " "); // Convert to MySQL datetime format
      fs.appendFileSync("result_repo.txt", `${date} ${JSON.stringify(output)}\n`);

      return output;
    } else {
      return {
        data: {
          url,
          message: "No credentials found.",
        },
      };
    }
  } catch (error) {
    return {
      url,
      error: error.message,
    };
  }
}

module.exports = {
  detectCredentials,
};
