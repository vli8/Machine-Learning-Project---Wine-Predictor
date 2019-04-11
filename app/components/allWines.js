import React from "react";
import { connect } from "react-redux";
import { getAllWines } from "../store/wine";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
class AllWines extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getWines();
  }

  render() {
    return (
      <div>
        {this.props.wines.payload ? (
          <div>
            {this.props.wines.payload.data.map(wine => {
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
                      <Card.Link href="#">See more</Card.Link>
                    </Card.Body>
                  </Card>
                  <br />
                </div>
              );
            })}
          </div>
        ) : (
          <div />
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
