const wineData = require("../../winemag-data-130k-v2.json");
const { Wines } = require("./index");

const seed = async () => {
  try {
    // await Promise.all(
    //   wineData.map(async wine => {
    //     await Wines.create(wine);
    //   })
    // );
    for (let i = 0; i < 50000; i++) {
      await Wines.create(wineData[i]);
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

module.exports = seed;
