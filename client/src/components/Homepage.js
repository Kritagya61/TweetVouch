//To show the TweetDetails of The THe User and his Friends From Past Three Days

import Header from "./Header";
import React, { Component } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import DomainDisplay from "./Domain";
import User from "./User";
import Loading from "./Loading";
import Axios from "axios";

import Tweet from "./tweet";

export default class HomePage extends Component {
  dummy = [];
  domain = [];
  result;
  max = 0;
  state = {
    user: {},
    error: null,
    authenticated: false,
    tweets: [],
    fetching: true,
    items: [],
    counter: 0,
  };

  //This Function helps InfiniteScroll to get more data to fetch
  fetchMoreData = () => {
    var j;
    for (
      j = this.state.counter;
      j < this.state.counter + 5 && j < this.state.tweets.length;
      j++
    ) {
      this.dummy[j - this.state.counter] = this.state.tweets[j];
    }
    this.setState({
      counter: j,
      items: this.state.items.concat(this.dummy),
    });
  };

  //This Function Helps to show the User Who has shared The most number of tweets
  renderUser = () => {
    return <User user={this.result} number={this.max} />;
  };

  //This function renders tweet of user and his friends from past 3 days on the Tweets tab in the frontened
  renderTweet = (item, index) => {
    if (index < this.state.tweets.length) {
      return (
        <div key={index}>
          <Tweet obj={this.state.tweets[index]} key={index} />
        </div>
      );
    } else {
      return <div key={index}></div>;
    }
  };

  //This Component shows the List of Domain in the Domains from past 7 Days Tab in frontended
  renderDomain = () => {
    let domaincomponent = this.domain.map((item, index) => (
      <DomainDisplay key={index} details={item} />
    ));
    return domaincomponent;
  };

  //Renders the Tweet using Infinite Scroll
  renderItems = () => {
    return (
      <div>
        {/* <h1>You have login succcessfully!</h1> */}
        <h2>Welcome {this.state.user.name}!</h2>

        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((item, index) => this.renderTweet(item, index))}
        </InfiniteScroll>
      </div>
    );
  };
  reloding = () => {
    setTimeout(function () {
      window.location.reload();
    }, 5000);
  };
  renderLoader = () => {
    return (
      <div>
        <Loading />
      </div>
    );
  };
  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'

    Axios.get("/auth/login/success")
      .then((res) => {
        this.setState({
          authenticated: true,
          user: res.data.user,
        });
        Axios.get("/tweets").then((res) => {
          var temp = [];
          temp = res.data;
          this.setState({
            tweets: [].concat.apply([], temp),
          });

          if (res.data.hasOwnProperty("error")) {
            this.reloding();
            this.setState({
              fetching: false,
            });
          } else {
            this.setState({
              fetching: true,
            });
          }
          var frequency = {};
          var frequency1 = {};

          for (var k = 0; k < this.state.tweets.length; k++) {
            for (
              var j = 0;
              j < this.state.tweets[k].entities.urls.length;
              j++
            ) {
              var url = this.state.tweets[k].entities.urls[j].expanded_url;

              if (url.slice(0, 33) !== "https://twitter.com/i/web/status/") {
                var urlParts = url
                  .replace("http://", "")
                  .replace("https://", "")
                  .replace("www.", "")
                  .split(/[/?#]/);
                var domain = urlParts[0];
                frequency[domain] = (frequency[domain] || 0) + 1;
              }
            }

            frequency1[this.state.tweets[k].user.name] =
              (frequency1[this.state.tweets[k].user.name] || 0) + 1;
            if (frequency1[this.state.tweets[k].user.name] > this.max) {
              this.max = frequency1[this.state.tweets[k].user.name];
              this.result = this.state.tweets[k].user.name;
            }
          }

          for (var key in frequency) {
            this.domain.push([key, frequency[key]]);
          }

          this.domain.sort(function compare(kv1, kv2) {
            return kv2[1] - kv1[1];
          });

          var i;
          for (i = 0; i < 5 && i < res.data.length; i++) {
            this.dummy[i] = this.state.tweets[i];
          }
          this.setState({
            items: this.dummy,
            counter: i,
          });
        });
      })
      .catch((e) => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user",
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    if (authenticated === true) {
      return (
        <div>
          <Header
            authenticated={authenticated}
            handleNotAuthenticated={this._handleNotAuthenticated}
            user={this.state.user.name}
          />
          <div className="container">
            <ul className="nav nav-tabs nav-justified">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#home">
                  Tweets of friends from past 7 days
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#menu1">
                  Top Domains in Tweets of past 7 days
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#menu3">
                  User with Most Shared Links
                </a>
              </li>
            </ul>

            <div className="tab-content" style={{ marginTop: "16px" }}>
              <div id="home" className="tab-pane fade show active">
                {this.state.fetching === false
                  ? this.renderLoader()
                  : this.renderItems()}
              </div>
              <div id="menu1" className="tab-pane fade">
                <h3>Top Domains</h3>
                {this.state.fetching === false
                  ? this.renderLoader()
                  : this.renderDomain()}
              </div>

              <div id="menu3" className="tab-pane fade">
                <h3>User With Most Shared Links</h3>
                {this.renderUser()}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header
            authenticated={authenticated}
            handleNotAuthenticated={this._handleNotAuthenticated}
          />

          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Twitter Top Links</h1>
              <p className="lead">
                This Site shows tweets of yours friends from past 7 days and Top
                domains shared and The user with most links
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}
