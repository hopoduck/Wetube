const express = require("express");
const app = express();

const PORT = 5555;
function handleListening() {
  console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req, res) {
  res.send("Hello from home");
}

function handleProfile(req, res) {
  res.send("Yout are no my asdasd");
}

app.get("/profile", handleProfile);

app.get("/", handleHome);

app.listen(PORT, handleListening);
