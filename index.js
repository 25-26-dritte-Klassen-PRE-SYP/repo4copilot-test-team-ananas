const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//Endpoints
app.get("/", (req, res) => {
  res.send("Server läuft auf Vercel!");
});

app.get("/ananas", (req, res) => {
  res.send("Ananas!");
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

module.exports = app;
