const express = require("express");
const morgan = require("morgan");
const path = require("path");
const PORT = 3500;
const seedDB = require("./db/seed");
const db = require("./db/database");
const brain = require("brain.js");
const { Wines } = require("./db/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const network = new brain.recurrent.LSTM();

module.exports = network;

const app = express();
app.use(morgan("dev")); //middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", require("./api"));

app.use((err, req, res, next) => {
  console.log("ERROR: ", err);
  res.status(404);
});

const startServerConnectDB = async () => {
  await db.sync({ force: true });
  console.log("db synced, in the process of seeding the db...");
  await seedDB();
  await trainingData();
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

const trainingData = async () => {
  const allWines = await Wines.findAll({
    where: {
      country: {
        [Op.ne]: null
      }
    }
  });

  const trainingData = [];
  for (let i = 0; i < 30; i++) {
    trainingData.push({
      input: allWines[i].description,
      output: allWines[i].country
    });
  }
  await network.train(trainingData, { iterations: 10 });
  console.log("finished training Data!!!");
};
startServerConnectDB();
