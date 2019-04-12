import React from "react";
import { connect } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { addWine } from "../store/wine";

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
  handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted!");
    this.props.addWine(this.state);
    this.props.history.push("/winePredictor");
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
