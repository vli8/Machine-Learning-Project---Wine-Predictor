const wineData = require("../../winemag-data-130k-v2.json");
const Wines = require("./index");

const seed = async () => {
  try {
    await Wines.create({
      points: "87",
      title: "Nicosia 2013 Vulk\u00e0 Bianco  (Etna)",
      description:
        "Aromas include tropical fruit, broom, brimstone and dried herb. The palate isn't overly expressive, offering unripened apple, citrus and dried sage alongside brisk acidity.",
      taster_name: "Kerin O\u2019Keefe",
      taster_twitter_handle: "@kerinokeefe",
      price: 15,
      designation: "Vulk\u00e0 Bianco",
      variety: "White Blend",
      region_1: "Etna",
      region_2: null,
      province: "Sicily & Sardinia",
      country: "Italy",
      winery: "Nicosia"
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

module.exports = seed;
