import React, { Component } from "react";
import ItemAttribute from "../attributes/ItemAttribute";
import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCT_BY_ID } from "../../queries/queries";
import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { increaseQty, decreaseQty } from "../../store/cart/cartSlice";
import { generateKey, roundTo2Decimal } from "../../utils/helperFunctions";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0
    };
  }
  handleLeftClick = (e) => {
    const index = this.state.imgIndex;
    if (index > 0) {
      this.setState({ imgIndex: index - 1 });
    }
  };
  handleRightClick = (length) => {
    const index = this.state.imgIndex;
    if (index < length - 1) {
      this.setState({ imgIndex: this.state.imgIndex + 1 });
    }
  };
  showPrice(product, selectedCurrency) {
    return product?.prices.map((price) => {
      //Filter out the amount according to the selected currency
      return (
        price.currency.label === selectedCurrency.label && (
          <div className="card-content-price" key={generateKey()}>
            {selectedCurrency.symbol}
            {roundTo2Decimal(price.amount)}
          </div>
        )
      );
    });
  }
  showAttributes(product) {
    return product?.attributes.map((attribute, index) => {
      return (
        <ItemAttribute
          customStyle={this.props.customStyle}
          attribute={attribute}
          selectedAttributePurchase={this.props.item.attributes[index]}
          key={index}
        />
      );
    });
  }
  render() {
    const { product } = this.props.data;
    const { customStyle, item, selectedCurrency } = this.props;
    const { imgIndex } = this.state;
    const onlyOneImage = product?.gallery.length === 1; //don't show img navigation arrows in cartpage
    return (
      <div className="cart-item">
        <div className="cart-item-left-side">
          <div className={`cart-item-left-side-brand-${customStyle}`}>
            {product?.brand}
          </div>
          <div className={`cart-item-left-side-name-${customStyle}`}>
            {product?.name}
          </div>
          <div className={`cart-item-left-side-price-${customStyle}`}>
            {this.showPrice(product, selectedCurrency)}
          </div>
          <div className="attributes">{this.showAttributes(product)}</div>
        </div>
        <div className="cart-item-right-side">
          <div className="cart-item-right-side-quantity">
            <button
              onClick={() => {
                this.props.dispatch(increaseQty(item));
              }}
              className={`btn btn-increase-${customStyle}`}
            ></button>

            <p className={`qty qty-${customStyle}`}>
              {this.props.item.quantity}
            </p>
            <button
              onClick={() => {
                this.props.dispatch(decreaseQty(item));
              }}
              className={`btn btn-decrease-${customStyle}`}
            ></button>
          </div>
          <div className="cart-item-right-side-img">
            {!onlyOneImage && (
              <div>
                <span
                  onClick={this.handleLeftClick}
                  className={`image-navigation-arrow-left-${customStyle}`}
                ></span>
                <span
                  onClick={() => this.handleRightClick(product?.gallery.length)}
                  className={`image-navigation-arrow-right-${customStyle}`}
                ></span>
              </div>
            )}
            <div className={`cart-item-right-side-img-${customStyle}`}>
              <span className="helper"></span>
              <img src={product?.gallery[imgIndex]} alt={product?.name} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  items: state.cart,
  selectedAttributes: state.cart,
  selectedCurrency: state.currency.selectedCurrency
});

const reduxWrapper = connect(mapStateToProps);

const gqlWrapper = graphql(GET_PRODUCT_BY_ID, {
  options: ({ item: { productId } }) => {
    return {
      variables: {
        id: productId
      }
    };
  }
});

export default compose(reduxWrapper, gqlWrapper)(CartItem);
