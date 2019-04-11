import React from "react";
import { connect } from "react-redux";
import { getAllWines } from "../store/wine";

class AllWines extends React.Component {
  render() {
    return (
      <div>
        <h1>All Wines!</h1>
      </div>
    );
  }
}

const mapState = state => {
  return {
    wines: state.wines
  };
};
const mapDispatch = dispatch => {
  return {
    getWines: dispatch(getAllWines())
  };
};

export default connect(
  mapState,
  mapDispatch
)(AllWines);
