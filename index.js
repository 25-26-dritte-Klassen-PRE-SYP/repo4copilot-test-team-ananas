const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server läuft auf Vercel!');
});

// Wichtig für lokales Testen, Vercel handling ist serverless
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

module.exports = app; // Wichtig für Vercel!
