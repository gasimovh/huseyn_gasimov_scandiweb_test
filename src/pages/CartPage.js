import React, { Component } from "react";
import CartItem from "../components/cart/CartItem";
import { generateKey } from "../utils/helperFunctions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CartPage extends Component {
  showCartItems() {
    const { items } = this.props;
    return items.length === 0 ? (
      <div className="empty-cart-page">
        Your cart is empty.
        <br />
        <Link to={"/"}>Go back to shopping</Link>
      </div>
    ) : (
      items.map((item) => {
        return (
          <div key={generateKey()}>
            <div className="cart-page-line" key={generateKey()}></div>
            <CartItem
              customStyle={"cartPage"}
              key={item.cartItemId}
              item={item}
            />
          </div>
        );
      })
    );
  }
  render() {
    return (
      <div className="cart-page">
        <h1 className="cart-page-name">CART</h1>
        {this.showCartItems()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.items
});

export default connect(mapStateToProps)(CartPage);
