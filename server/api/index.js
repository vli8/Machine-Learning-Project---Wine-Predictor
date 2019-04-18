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
//Use of req.body here, we are not injecting anything in the database
//look for the post route on line 66 to know how to add something to the db
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
    const predictedCountry = network.run(req.body.description);
    console.log(predictedCountry);
    res.send(predictedCountry);
  } catch (error) {
    console.log("error in wine prediction route", error);
  }
});

/*-----------------------------------------------------------------*/
//use of req.params.id to query through the database from the browser to the backend
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
//Adding a row to the database
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
