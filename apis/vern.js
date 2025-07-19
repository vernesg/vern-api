const { createCanvas, loadImage } = require("canvas");

const meta = {
  name: "vern",
  version: "1.0.0",
  description: "Generate a custom Vern image with your text",
  author: "Vern",
  method: "get",
  category: "canvas",
  path: "/vern?text=your_message"
};

async function onStart({ req, res }) {
  const text = req.query.text;
  if (!text) {
    return res.status(400).json({
      error: "Missing 'text' query parameter.",
      usage: "/vern?text=Hello from Vern"
    });
  }

  try {
    const width = 720, height = 480;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const bg = await loadImage("https://i.ibb.co/0yYtkDsx/517987164-2462247384160187-5794400419543583610-n-jpg-stp-dst-jpg-p480x480-tt6-nc-cat-105-ccb-1-7-nc.jpg");
    ctx.drawImage(bg, 0, 0, width, height);

    ctx.font = "bold 42px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;
    ctx.fillText(text, width / 2, height / 2 + 90);

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "image/png");
    canvas.createPNGStream().pipe(res);
  } catch (error) {
    console.error("❌ Vern API Error:", error.message || error);
    res.status(500).json({ error: "Failed to generate image." });
  }
}

module.exports = { meta, onStart };