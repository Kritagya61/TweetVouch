import React, { Component } from "react";

export class User extends Component {
  render() {
    return (
      <div>
        <div className="card text-center">
          <div className="card-header">User who shared most links</div>
          <div className="card-body">
            <h5 className="card-title">{this.props.user}</h5>
            <p className="card-text">
              {this.props.user} has shared {this.props.number} number of links.
            </p>
            {/* <div className="btn btn-primary">Go somewhere</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default User;
