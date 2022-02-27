import React, { Component } from "react";
import CartItem from "./CartItem";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { generateKey, roundTo2Decimal } from "../../utils/helperFunctions";

class CartOverlay extends Component {
  handleRouterClick = () => {
    this.props.history.push("/cart");
  };

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "unset";
  }

  showTotalPrice(items, selectedCurrency) {
    let totalPrice = 0;
    items.map((item) => {
      item.prices.map((price) => {
        //Filter out the amount according to the selected currency
        if (price.currency.label === selectedCurrency.label) {
          totalPrice += roundTo2Decimal(price.amount) * item.quantity;
        }
      });
    });
    return roundTo2Decimal(totalPrice);
  }

  showCartItems(items) {
    if (items.length === 0) {
      return (
        <div className="empty-cart">
          Your cart is empty. <br />
          <span onClick={() => this.props.toggleShow()}>Close cart</span>
        </div>
      );
    } else {
      // console.log(items);
      return items.map((item) => {
        return (
          <div className="cart-overlay-items" key={generateKey()}>
            <CartItem
              customStyle={"cartOverlay"}
              key={item.cartItemId}
              item={item}
            />
          </div>
        );
      });
    }
  }
  render() {
    const { items, selectedCurrency } = this.props;
    const itemCount = items.length;

    return (
      <div className="cart-overlay">
        <div className="cart-overlay-header">
          <h4>My Bag</h4>
          {itemCount !== 0 && itemCount !== 1 && <p>, {itemCount} items</p>}
          {itemCount === 1 && <p>, {itemCount} item</p>}
        </div>
        <div className="cart-overlay-body">{this.showCartItems(items)}</div>
        <div className="cart-overlay-total">
          <p>Total</p>
          <div className="total-price">
            {selectedCurrency.symbol}
            {this.showTotalPrice(items, selectedCurrency)}
          </div>
        </div>
        <div className="cart-overlay-buttons">
          <button
            onClick={() => {
              this.handleRouterClick();
              this.props.toggleShow();
            }}
            className="btn btn-outline-secondary btn-sm"
          >
            view bag
          </button>
          <button className="btn btn-primary btn-sm">check out</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.items,
  selectedCurrency: state.currency.selectedCurrency
});
const reduxWrapper = connect(mapStateToProps);

export default compose(withRouter, reduxWrapper)(CartOverlay);
