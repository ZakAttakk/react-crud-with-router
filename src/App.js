import React from "react";
import Name from "./components/Name";
import Users from "./components/Users";
import SpecificUser from "./components/SpecificUser";
import About from "./components/About";
import Home from "./components/Home";
import { Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstNameInput: "",
      lastNameInput: "",
      names: null,
    };

    this.ENDPOINT = "https://crudcrud.com/api/1288b3eaee094b84a0d90d170a27ba36";
  }

  componentDidMount = () => {
    this.getNames();
  };

  setStateCallback = () => {
    // console.log(this.state);
  };

  getNames = () => {
    fetch(this.ENDPOINT + "/names")
      .then((result) => result.json())
      .then((data) => {
        console.log(data)
        this.setState({ names: data }, this.setStateCallback);
      });
  };

  submitName = (fn, ln) => {
    console.log(fn, ln);
    fetch(this.ENDPOINT + "/names", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first: fn, last: ln }),
    }).then((result) => {
      this.getNames();
      console.log(result);
    });
  };

  deleteName = (id) => {
    fetch(this.ENDPOINT + "/names/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      console.log(result);
      this.getNames();
    });
  };

  updateName = (id, fn, ln) => {
    // console.log(id, fn, ln)
    fetch(this.ENDPOINT + "/names/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first: fn, last: ln }),
    }).then((result) => {
      console.log(result);
      this.getNames();
    });
  };

  handleChange = (e) => {
    var id = e.target.getAttribute("id");
    if (id == "firstName") {
      this.setState({ firstNameInput: e.target.value });
    }
    if (id == "lastName") {
      this.setState({ lastNameInput: e.target.value });
    }
  };

  render() {
    

    var names = <div>LOADING</div>;
    if (this.state.names !== null) {
      // console.log(this.state.names)
      var names = this.state.names.map((n, index) => {
        var combinedName = n.first + " " + n.last;
        var id = n._id;
        return (
          <div key={id}>
            <Name
              deleteName={this.deleteName}
              updateName={this.updateName}
              id={id}
              combinedName={combinedName}
            />
            <Link to={id}>More Info</Link>
          </div>
        );
      });

      
    }

    return (
      <div>
        <h1>My CRUD App</h1>
        <br />
        <button onClick={this.getNames}>Get Names</button>
        <br />
        <br />
        First:{" "}
        <input
          value={this.state.firstNameInput}
          id="firstName"
          onChange={this.handleChange}
        ></input>
        <br />
        Last:{" "}
        <input
          value={this.state.lastNameInput}
          id="lastName"
          onChange={this.handleChange}
        ></input>
        <br />
        <br />
        <button
          onClick={() =>
            this.submitName(this.state.firstNameInput, this.state.lastNameInput)
          }
        >
          Submit Name
        </button>
        <br />
        <br />
        {names}
        <br />
        <Link to="/about">About</Link>
        <br />
        <Link to="/users">Users</Link>
        <br />
        <Link to="/">Home</Link>
        <br />
        <br />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users names={this.state.names} />
          </Route>
          <Route
            path="/:slug"
            render={(props) => (
              <SpecificUser {...props} />
            )}
          ></Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
