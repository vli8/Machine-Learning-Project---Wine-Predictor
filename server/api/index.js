const router = require("express").Router();
const { Wines, NewWines } = require("../db/index");
const Sequelize = require("sequelize");
const network = require("../index.js");
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
//Use of req.body here and machine learning brain.js,
//we are not injecting anything in the database
//look for the post route on line 66 to know how to add something to the db
router.post("/winePrediction", async (req, res, next) => {
  try {
    console.log("BODY: ", req.body);
    console.log("network: ", network);
    const predictedCountry = network.run(req.body.description);
    console.log("finished running: ");
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
