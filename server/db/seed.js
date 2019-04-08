const wineData = require("../../winemag-data-130k-v2.json");
const { Wines } = require("./index");

const seed = async () => {
  try {
    for (let i = 0; i < 1000; i++) {
      await Wines.create(wineData[i]);
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

module.exports = seed;
