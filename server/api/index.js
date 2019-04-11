const router = require("express").Router();
const { Wines } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const allData = await Wines.findAll();
    res.send(allData);
  } catch (error) {
    console.log("ERROR", error);
  }
});

module.exports = router;
