import React from "react";
import { connect } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

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
              <h1>The wine that you describe is from: {this.props.wines.wineToPredict.data}</h1>
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
