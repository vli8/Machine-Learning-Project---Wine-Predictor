import React from "react";
import { connect } from "react-redux";
import { getAllWines } from "../store/wine";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

class AllWines extends React.Component {
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
            {this.props.wines.allWines.data.map(wine => {
              return (
                <div key={wine.id}>
                  <Card style={{ width: "26rem" }}>
                    <Card.Body>
                      <Card.Title>
                        {wine.id}: {wine.title}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Points: {wine.points}</Card.Subtitle>
                      <Card.Text>{wine.description}</Card.Text>
                      <Card.Subtitle className="mb-2 text-muted">Author: {wine.taster_name}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">
                        Price: ${wine.price !== null ? wine.price : "Not Provided"}
                      </Card.Subtitle>
                      <Link to={`/wines/${wine.id}`}>See more...</Link>
                    </Card.Body>
                  </Card>
                  <br />
                </div>
              );
            })}
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
    getWines: () => dispatch(getAllWines())
  };
};

export default connect(
  mapState,
  mapDispatch
)(AllWines);
