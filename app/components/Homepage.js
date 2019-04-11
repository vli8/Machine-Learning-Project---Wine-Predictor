import React from "react";
import { connect } from "react-redux";
import { getAllWines } from "../store/wine";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    // this.props.getWines();
  }
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome to the wine predictor</h1>
          <p>
            This is a machine learning project on wine prediction using JS and tenserflow.js for the data mining class.
            We predict the price of the wine based on the reviews
          </p>
          <p>
            <Link to="/wines">
              <Button variant="primary">See all wines</Button>
            </Link>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

const mapstate = state => {
  return {
    wines: state.wines
  };
};
const mapDispatch = dispatch => {
  return {
    getWines: () => dispatch(getAllWines())
  };
};

export default connect(
  mapstate,
  mapDispatch
)(Homepage);
