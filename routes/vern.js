const { createCanvas, loadImage } = require("canvas");
const { Readable } = require("stream");

const meta = {
  name: "vern",
  version: "1.0.0",
  description: "Generate a custom image using Vern's template with user text",
  author: "Vern",
  method: "get",
  category: "canvas",
  path: "/vern?text="
};

async function onStart({ req, res }) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: "Missing 'text' query parameter.",
      usage: "/vern?text=Hello World"
    });
  }

  try {
    const width = 720;
    const height = 480;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const backgroundUrl = "https://i.ibb.co/4wpSssTt/518003935-1750673682216923-3507286462968653534-n-jpg-stp-dst-jpg-p480x480-tt6-nc-cat-101-ccb-1-7-nc.jpg";
    const background = await loadImage(backgroundUrl);
    ctx.drawImage(background, 0, 0, width, height);

    ctx.font = "bold 42px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;
    ctx.fillText(text, width / 2, height / 2 + 90);

    res.setHeader("Content-Type", "image/png");
    const stream = canvas.createPNGStream();
    Readable.from(stream).pipe(res);
  } catch (error) {
    console.error("❌ Vern API Error:", error.message || error);
    res.status(500).json({
      status: false,
      message: "Failed to generate image.",
      error: error.message
    });
  }
}

module.exports = { meta, onStart };
