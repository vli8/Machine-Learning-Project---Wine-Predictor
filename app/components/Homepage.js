import React from "react";
import { connect } from "react-redux";
import { getAllWines } from "../store/wine";

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <h1>React App on Machine Learning</h1>
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
    getWines: dispatch(getAllWines())
  };
};

export default connect(
  mapstate,
  mapDispatch
)(Homepage);
