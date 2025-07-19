const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const apiDir = path.join(__dirname, "apis");

fs.readdirSync(apiDir).forEach((file) => {
  if (file.endsWith(".js")) {
    const { meta, onStart } = require(`./apis/${file}`);
    const routePath = meta.path.split("?")[0];
    app.get(routePath, (req, res) => onStart({ req, res }));
    console.log(`✅ Loaded ${meta.name} at ${routePath}`);
  }
});

app.get("/", (req, res) => {
  res.send("🧠 Vern REST API is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});