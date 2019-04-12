import React from "react";
import { connect } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { addWine, getAllWines } from "../store/wine";
import brain from "brain.js";
import Spinner from "react-bootstrap/Spinner";

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

  componentDidMount() {
    this.props.getWines();
  }

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
    const network = new brain.recurrent.LSTM();

    // const trainingData = this.props.wines.allWines.data.map(wine => ({
    //   input: wine.description,
    //   output: wine.country
    // }));
    // const cleanData = trainingData.filter(wine => wine.input !== null || wine.output !== null);

    const data = [];
    for (let i = 0; i < 7; i++) {
      data.push({
        input: this.props.wines.allWines.data[i].description,
        output: this.props.wines.allWines.data[i].country
      });
    }
    console.log("training data: ", data);
    network.train(data, { iterations: 5 });
    console.log("training data is over");
    const output = network.run("The wine is sweet and red like its grapes from italy");
    console.log(output);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted!");
    this.trainData();
    // this.props.addWine(this.state);
    // this.props.history.push("/winePredictor");
  }

  render() {
    return (
      <div>
        {this.props.wines.allWines ? (
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
const mapDisaptch = dispatch => {
  return {
    addWine: newWine => dispatch(addWine(newWine)),
    getWines: () => dispatch(getAllWines())
  };
};

export default connect(
  mapState,
  mapDisaptch
)(PredictWine);
