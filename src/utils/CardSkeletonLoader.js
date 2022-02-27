import React, { Component } from "react";

export default class CardSkeletonLoader extends Component {
  render() {
    return (
      <div className="skeleton-wrapper">
        <div className="skeleton-bg image"></div>
        <div className="skeleton-bg title"></div>
        <div className="skeleton-bg subtitle"></div>
      </div>
    );
  }
}
