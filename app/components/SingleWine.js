import React from "react";
import { connect } from "react-redux";
import { getSelectedWine } from "../store/wine";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class SingleWine extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getSelectedWine(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        {this.props.wines.selectedWine ? (
          <div>
            <Jumbotron fluid>
              <Container>
                <h1>Title: {this.props.wines.selectedWine.data[0].title}</h1>
                <Card.Text> Description:</Card.Text>
                <Card.Text>{this.props.wines.selectedWine.data[0].description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  Points: {this.props.wines.selectedWine.data[0].points}{" "}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Author: {this.props.wines.selectedWine.data[0].taster_name} (
                  {this.props.wines.selectedWine.data[0].taster_twitter_handle}){" "}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Country: {this.props.wines.selectedWine.data[0].country}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Variety: {this.props.wines.selectedWine.data[0].variety}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Price: $
                  {this.props.wines.selectedWine.data[0].price !== null
                    ? this.props.wines.selectedWine.data[0].price
                    : "Not provided"}
                </Card.Subtitle>
              </Container>
              <hr />
              <Link to="/wines">
                <Button variant="primary">See all wines</Button>
              </Link>
              <Link to="/">
                <Button variant="success">Back Home</Button>
              </Link>
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

const mapDispatch = dispatch => {
  return {
    getSelectedWine: id => dispatch(getSelectedWine(id))
  };
};

export default connect(
  mapState,
  mapDispatch
)(SingleWine);
