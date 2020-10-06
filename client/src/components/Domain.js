import React, { Component } from "react";

export class Domain extends Component {
  render() {
    return (
      <div>
        <div className="list-group">
          <div className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{this.props.details[0]}</h5>
              <small>{this.props.details[1]} number of tweets</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Domain;
