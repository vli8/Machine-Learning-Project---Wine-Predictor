const express = require("express");
const morgan = require("morgan");
const path = require("path");
const PORT = 3500;

const app = express();
app.use(morgan("dev")); //middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
