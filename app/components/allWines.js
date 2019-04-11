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
        <CardGroup>
          {this.props.wines.payload ? (
            <div>
              {this.props.wines.payload.data.map(wine => {
                return (
                  <Card key={wine.id}>
                    <Card.Img
                      variant="top"
                      src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
                    />
                    <Card.Body>
                      <Card.Title>{wine.title}</Card.Title>
                      <Card.Text>{wine.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">Points: {wine.points}</small>
                    </Card.Footer>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div />
          )}
        </CardGroup>
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
