const router = require("express").Router();
const { Wines, NewWines } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const allData = await Wines.findAll();
    res.send(allData);
  } catch (error) {
    console.log("ERROR", error);
  }
});
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
