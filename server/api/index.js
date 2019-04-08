const router = require("express").Router();
const { Wines } = require("../db/index");

router.get("/", async (req, res, next) => {
  const allData = await Wines.findAll();
  res.send(allData);
});

module.exports = router;
