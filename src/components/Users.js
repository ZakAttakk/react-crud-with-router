import React from "react";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    console.log(this.props.names);
    var allUser = <div></div>
    if (this.props.names){
      var allUsers = this.props.names.map(n => {
        return (
          <div key={n._id}>
            {n.first} {n.last}
          </div>
        )
      })
    }
    
    return (
      <div className="border">
        {allUsers}

      </div>
    );
  }
}

export default Users;
