const axios = require("axios");
const jsBeautifier = require("js-beautify").html;
const yaml = require("js-yaml");
const { query } = require("../config/db");
const asyncHandler = require("express-async-handler");

class CredentialsDetectorController {
  constructor() {
    this.hardcodedCredentials = [
      "password",
      "username",
      "database",
      "PASSWORD",
      "DATABASE",
      "USERBAME",
      "DB_PASSWORD",
      "DB_NAME",
      "DB_PORT",
      "email",
      "USERNAME",
      "pass",
      "PASS",
      // Add more credentials as needed
    ];
  }

  async detectCredentials(url, fileType = "html,js,php, .env, json, jsx") {
    try {
      let content;

      switch (fileType) {
        case "html":
          const htmlResponse = await axios.get(url);
          content = htmlResponse.data;
          break;
        case "js":
          const jsResponse = await axios.get(url);
          content = jsResponse.data.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
          break;
        case "php":
          const phpResponse = await axios.get(url);
          content = phpResponse.data;
          break;
        case ".env":
          const envResponse = await axios.get(url, { responseType: "text" });
          content = envResponse.data;
          break;
        case "json":
          const jsonResponse = await axios.get(url, { responseType: "json" });
          content = JSON.stringify(jsonResponse.data, null, 2);
          break;
        case "jsx":
          const jsxResponse = await axios.get(url);
          content = jsxResponse.data;
          break;
        case "ts":
          const tsResponse = await axios.get(url);
          content = tsResponse.data;
          break;
        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }

      let beautifiedContent;

      if (fileType === "html") {
        beautifiedContent = jsBeautifier(content, { indent_size: 2 });
      } else if (fileType === "js") {
        beautifiedContent = jsBeautifier(content, { indent_size: 2 });
      } else if (fileType === "php") {
        // You can add PHP formatting here if needed
        beautifiedContent = content;
      } else if (fileType === "json") {
        beautifiedContent = content;
      } else if (fileType === "jsx") {
        beautifiedContent = jsBeautifier(content, { indent_size: 2 });
      } else if (fileType === "ts") {
        beautifiedContent = jsBeautifier(content, { indent_size: 2 });
      }

      const credentialsFound = this.hardcodedCredentials.filter((credential) => {
        return beautifiedContent.includes(credential);
      });
      const credentials = credentialsFound.join(", "); // Assuming credentialsFound is an array of credentials

      // Insert result into database
      // Inside the detectCredentials method of CredentialsDetectorController

      if (credentialsFound.length > 0) {
        const output = {
          detectorType: "AWS",
          decoderType: "PLAIN",
          rawResult: credentials,
          line: 0,
          commit: "N/A",
          file: "N/A",
          email: "N/A",
          repository: "N/A",
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
          message: `Found ${credentialsFound.length} credentials`,
        };

        // Insert output into database
        const date = new Date().toISOString().slice(0, 19).replace("T", " "); // Convert to MySQL datetime format
        await query("INSERT INTO result_repo (repo_url, credential, date) VALUES (?, ?, ?)", [url, JSON.stringify(output), date]);

        return output;
      } else {
        return {
          data: {
            url,
            fileType,
            message: "No credentials found.",
          },
        };
      }
    } catch (error) {
      return {
        url,
        fileType,
        error: error.message,
      };
    }
  }
}

const getRepo = asyncHandler(async (req, res) => {
  try {
    const repo = await query("SELECT id FROM result_repo");
    res.json({ status: "ok", repo: repo });
  } catch (error) {
    res.status(500).json({ message: "Failed to get data repo", status: "failed" });
  }
});

const getAllRepo = asyncHandler(async (req, res) => {
  try {
    const result = await query("SELECT * FROM result_repo");
    res.json({ status: "ok", result: result });
  } catch (error) {
    res.status(500).json({ message: "Failed to get all data from result_repo", status: "failed" });
  }
});

const deleteRepo = asyncHandler(async (req, res) => {
  try {
    const repoId = req.params.id;
    const repoExist = await query("SELECT * FROM result_repo WHERE id = ?", [repoId]);
    if (repoExist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "data repo not found",
      });
    }
    await query("DELETE FROM result_repo where id = ? ", [repoId]);
    res.json({
      success: true,
      message: "data Repository deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting Repository from database",
    });
  }
});

module.exports = { CredentialsDetectorController, getRepo, getAllRepo, deleteRepo };
