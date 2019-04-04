const wineData = require("../../winemag-data-130k-v2.json");
const { Wines } = require("./index");

const seed = async () => {
  try {
    for (wine in wineData) {
      await Wines.create(wine);
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

module.exports = seed;
