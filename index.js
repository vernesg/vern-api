const express = require("express");
const app = express();
const path = require("path");
const { onStart } = require("./routes/vern");

// Serve static files from public
app.use(express.static(path.join(__dirname, "public")));

// Vern route
app.get("/vern", (req, res) => onStart({ req, res }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Vern API running at http://localhost:${PORT}`);
});