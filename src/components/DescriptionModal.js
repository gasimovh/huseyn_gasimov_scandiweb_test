import React, { Component } from "react";
import dompurify from "dompurify";

export default class DescriptionModal extends Component {
  render() {
    console.log(this.props);
    const { productDescription } = this.props;
    return (
      <div className="description-modal">
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(productDescription)
          }}
        />
      </div>
    );
  }
}
