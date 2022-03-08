import React, { Component } from "react";
import dompurify from "dompurify";
import parse from "html-react-parser";

export default class DescriptionModal extends Component {
  render() {
    console.log(this.props);
    const { productDescription } = this.props;
    return (
      <div className="description-modal">
        <div className="description">
          {parse(dompurify.sanitize(productDescription))}
        </div>
      </div>
    );
  }
}
