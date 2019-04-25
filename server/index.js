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
const network = new brain.NeuralNetwork();

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
  try {
    const allWines = await Wines.findAll({
      where: {
        country: {
          [Op.ne]: null
        }
      }
    });

    const trainingData = [];
    for (let i = 0; i < allWines.length; i++) {
      const descriptionOfWine = allWines[i].description;
      const countryWine = allWines[i].country;
      trainingData.push({
        input: { [descriptionOfWine]: 1 },
        output: { [countryWine]: 1 }
      });
    }
    await network.train(trainingData, { hiddenLayers: [3] });
    console.log("finished training Data!!!");
  } catch (error) {
    console.log("Error in traininData(): ", error);
  }
};
startServerConnectDB();
