import React, { Component } from "react";

class Tweet extends Component {
  render() {
    return (
      <div className="tweet">
        <div className="head">
          <img
            src={this.props.obj.user.profile_image_url_https}
            className="profilepic"
            alt="Profile"
          />
          <div
            className="user"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <strong>{this.props.obj.user.name}</strong>
            </div>
            <div>{this.props.obj.user.screen_name}</div>
          </div>
        </div>
        <div className="body">{this.props.obj.text}</div>
        <div className="footer">
          <a
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/${this.props.obj.user.screen_name}/status/${this.props.obj.id_str}`}
          >
            View Tweet
          </a>
        </div>
      </div>
    );
  }
}

export default Tweet;
