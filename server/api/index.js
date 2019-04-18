const router = require("express").Router();
const { Wines, NewWines } = require("../db/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const brain = require("brain.js");
/*-----------------------------------------------------------------*/

router.get("/", async (req, res, next) => {
  try {
    const allData = await Wines.findAll();
    res.send(allData);
  } catch (error) {
    console.log("ERROR", error);
  }
});

/*-----------------------------------------------------------------*/

router.post("/winePrediction", async (req, res, next) => {
  try {
    console.log("BODY: ", req.body);
    const allWines = await Wines.findAll({
      where: {
        country: {
          [Op.ne]: null
        }
      }
    });

    const network = new brain.recurrent.LSTM();
    const trainingData = [];
    for (let i = 0; i < 30; i++) {
      trainingData.push({
        input: allWines[i].description,
        output: allWines[i].country
      });
    }
    network.train(trainingData, { iterations: 10 });
    console.log("finished training Data!!!");
    const predictedCountry = network.run(
      "Raw black-cherry aromas are direct and simple but good. This has a juicy feel that thickens over time, with oak character and extract becoming more apparent. A flavor profile driven by dark-berry fruits and smoldering oak finishes meaty but hot."
    );
    console.log(predictedCountry);
    res.send(req.body);
  } catch (error) {
    console.log("error in wine prediction route", error);
  }
});

/*-----------------------------------------------------------------*/

router.get("/:id", async (req, res, next) => {
  try {
    const singleWine = await Wines.findAll({
      where: {
        id: req.params.id
      }
    });
    res.json(singleWine);
  } catch (error) {
    console.log("error in :id route", error);
  }
});

/*-----------------------------------------------------------------*/

router.post("/addWine", async (req, res, next) => {
  try {
    console.log(req.body);
    const newWine = await NewWines.create(req.body);
    console.log("Im here");
    res.send(newWine);
  } catch (error) {
    console.log("error in post", error);
  }
});

module.exports = router;
