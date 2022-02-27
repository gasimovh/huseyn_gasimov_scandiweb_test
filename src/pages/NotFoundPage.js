import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="not-found-page">
        <div className="four-o-four">404</div>
        <div className="text">Page Not Found</div>
        <div className="buttons">
          <Link to="/">
            <button className="btn btn-primary btn-sm">Home</button>
          </Link>
          <Link to="/cart">
            <button className="btn btn-primary btn-sm">Cart</button>
          </Link>
        </div>
      </div>
    );
  }
}
