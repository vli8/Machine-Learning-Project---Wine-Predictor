const db = require("./database");
const Sequelize = require("sequelize");

//defining models
const Wine = db.define("wine", {
  points: {
    type: Sequelize.STRING,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING
  },
  taster_name: {
    type: Sequelize.STRING
  },
  taster_twitter_handle: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  designation: {
    type: Sequelize.STRING
  },
  variety: {
    type: Sequelize.STRING
  },
  region_1: {
    type: Sequelize.STRING
  },
  province: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  Winery: {
    type: Sequelize.STRING
  }
});

module.exports = Wine;
