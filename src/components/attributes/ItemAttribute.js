import React, { Component } from "react";
import { connect } from "react-redux";
import SwatchAttributeRadio from "./SwatchAttributeRadio";
import TextAttributeRadio from "./TextAttributeRadio";

class ItemAttribute extends Component {
  loadAttribute() {
    const { attribute, product, customStyle, selectedAttributePurchase } =
      this.props;
    return attribute.items.map((item) => {
      return this.props.attribute.type === "text" ? (
        <TextAttributeRadio
          selectedAttributePurchase={selectedAttributePurchase}
          customStyle={customStyle}
          product={product}
          id={item.value + attribute.name + new Date().getTime()}
          value={item.value}
          name={attribute.name}
          key={item.value}
        ></TextAttributeRadio>
      ) : (
        <SwatchAttributeRadio
          selectedAttributePurchase={selectedAttributePurchase}
          customStyle={customStyle}
          product={product}
          id={item.value + attribute.name + new Date().getTime()}
          value={item.value}
          name={attribute.name}
          key={item.value}
        ></SwatchAttributeRadio>
      );
    });
  }
  render() {
    return (
      <div className="attribute-item">
        <div className="attribute-item-conditional-load">
          <div className="attribute-item-name">
            {this.props.attribute?.name}:
          </div>
          <div className="attribute-item-set">{this.loadAttribute()}</div>
        </div>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart,
  selectedAttributes: state.cart.selectedAttributes
});

export default connect(mapStateToProps)(ItemAttribute);
