const express = require("express");
const morgan = require("morgan");
const path = require("path");
const PORT = 3500;
const seedDB = require("./db/seed");
const db = require("./db/database");

const app = express();
app.use(morgan("dev")); //middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

let counter = 0;
const startServerConnectDB = async () => {
  await db.sync({ force: true });
  console.log("db synced");
  counter === 0 ? await seedDB() : console.log("already seeded");
  counter++;
  app.listen(PORT, () => {
    seedDB(), console.log(`Listening on port ${PORT}`);
  });
};

startServerConnectDB();
