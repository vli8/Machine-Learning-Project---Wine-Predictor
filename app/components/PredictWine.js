import React from "react";
import { connect } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { addWine } from "../store/wine";
import brain from "brain.js";

class PredictWine extends React.Component {
  constructor() {
    super();
    this.state = {
      description: "",
      userName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  async handleChange(event) {
    if (event.target.name === "description") {
      await this.setState({
        description: event.target.value
      });
    } else if (event.target.name === "userName") {
      await this.setState({
        userName: event.target.value
      });
    }
    console.log("state: ", this.state);
  }

  trainData() {
    const network = new brain.NeuralNetwork();
    network.train([
      { input: [0, 0, 0], output: [0] },
      { input: [0, 0, 1], output: [0] },
      { input: [1, 0, 0], output: [1] },
      { input: [1, 1, 0], output: [1] }
    ]);
    const output = network.run([0, 1, 0]);
    console.log(output);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted!");
    // this.props.addWine(this.state);
    // this.props.history.push("/winePredictor");
    this.trainData();
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>We will predict the wine for you!</h1>
          <p>Describe what you taste and we will do the rest! Shazam for wines</p>
          <p>
            <Link to="/wines">
              <Button variant="primary">See all wines</Button>
            </Link>
          </p>
        </Jumbotron>
        <form onSubmit={this.handleSubmit}>
          <textarea name="description" onChange={this.handleChange} placeholder="Description" rows="4" cols="50" />
          <br />
          <input name="userName" onChange={this.handleChange} placeholder="user name" />
          <br />
          <br />
          {this.state.description ? (
            <button disabled={false} type="submit">
              Show me the wine!
            </button>
          ) : (
            <button disabled={true} type="submit">
              Show me the wine!
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    wine: state.wine
  };
};
const mapDisaptch = dispatch => {
  return {
    addWine: newWine => dispatch(addWine(newWine))
  };
};

export default connect(
  mapState,
  mapDisaptch
)(PredictWine);
