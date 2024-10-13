const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("dist"));
app.get("/", function (_, res) {
  const pathToHtmlFile = path.resolve(__dirname, "dist/index.html");
  res.sendFile(pathToHtmlFile);
});
app.post("/api", async function (req, res) {
  const formText = req.body.url;
  if (!formText) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    const response = await axios.post(
      "https://api.textrazor.com/",
      new URLSearchParams({
        extractors: "entities,topics",
        text: formText,
      }).toString(),
      {
        headers: {
          "x-textrazor-key": process.env.API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json({
      message: "Data received successfully",
      results: response.data,
    });
  } catch (error) {
    console.error("Error making request to TextRazor API:", error);
    res.status(500).json({ error: "Error processing request" });
  }
});

app.listen(9000, () => {
  console.log(`Server is running on http://localhost:9000`);
});
