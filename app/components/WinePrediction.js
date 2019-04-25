import React from "react";
import { connect } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";

class WinePrediction extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {this.props.wines.allWines ? (
          <div>
            <Jumbotron>
              <h1>Here are the probabilities of the country of origin of your wine based on your description</h1>
              <ListGroup>
                <ListGroup.Item key="1">Italy: {this.props.wines.wineToPredict.data.Italy}</ListGroup.Item>
                <ListGroup.Item key="2">Argentina: {this.props.wines.wineToPredict.data.Argentina}</ListGroup.Item>
                <ListGroup.Item key="3">Portugal: {this.props.wines.wineToPredict.data.Portugal}</ListGroup.Item>
                <ListGroup.Item key="4">US: {this.props.wines.wineToPredict.data.US}</ListGroup.Item>
                <ListGroup.Item key="5">Spain: {this.props.wines.wineToPredict.data.Spain}</ListGroup.Item>
                <ListGroup.Item key="6">France: {this.props.wines.wineToPredict.data.France}</ListGroup.Item>
                <ListGroup.Item key="7">Germany: {this.props.wines.wineToPredict.data.Germany}</ListGroup.Item>
                <ListGroup.Item key="8">Chile: {this.props.wines.wineToPredict.data.Chile}</ListGroup.Item>
              </ListGroup>
              <p>
                <Link to="/wines">
                  <Button variant="primary">See all wines</Button>
                </Link>
                <Link to="/">
                  <Button variant="success">Back Home</Button>
                </Link>
              </p>
            </Jumbotron>
          </div>
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    wines: state.wines
  };
};

export default connect(mapState)(WinePrediction);
