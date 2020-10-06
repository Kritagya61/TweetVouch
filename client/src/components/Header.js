import { Link } from "react-router-dom";

import React, { Component } from "react";

export class Header extends Component {
  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:5000/auth/twitter", "_self");
  };

  _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:5000/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };

  renderControls = () => {
    if (this.props.authenticated === false) {
      return (
        <button
          type="button"
          className="nav-item btn btn-primary"
          onClick={this._handleSignInClick}
          style={{
            cursor: "pointer",
          }}
        >
          Sign In with Twitter
        </button>
      );
    } else {
      return (
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.props.user}
          </Link>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <button
              className="dropdown-item"
              style={{
                cursor: "pointer",
              }}
              onClick={this._handleLogoutClick}
            >
              Logout
            </button>
          </div>
        </li>
      );
    }
  };
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        id="mainNav"
      >
        <Link className="navbar-brand" to="/">
          Twitter_Top_Links
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">{this.renderControls()}</ul>
        </div>
      </nav>
    );
  }
}

export default Header;
