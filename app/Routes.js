import React from "react";
import { connect } from "react-redux";
import { getAllWines } from "./store/wine";
import { HashRouter, Switch, Route } from "react-router-dom";
import AllWines from "./components/AllWines";
import SingleWine from "./components/SingleWine";
import PredictWine from "./components/PredictWine";
import HomePage from "./components/Homepage.js";

class Routes extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getWines();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/wines" component={AllWines} />
        <Route exact path="/wines/:id" component={SingleWine} />
        <Route exact path="/predict" component={PredictWine} />
      </Switch>
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
    getWines: () => dispatch(getAllWines())
  };
};

export default connect(
  mapState,
  mapDispatch
)(Routes);
