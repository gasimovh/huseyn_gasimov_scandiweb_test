import React, { Component } from "react";
import { ReactComponent as EmptyCart } from "../assets/img/empty-cart.svg";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
import { setFeaturedImage } from "../store/product/productSlice";
import { roundTo2Decimal } from "../utils/helperFunctions";

class Card extends Component {
  render() {
    const { product, selectedCurrency } = this.props;
    return (
      <div
        onClick={() =>
          this.props.dispatch(setFeaturedImage(product.gallery[0]))
        }
        className={
          product.inStock
            ? // true
              `card`
            : `card card-disabled`
        }
      >
        <Link
          className={product.inStock ? `` : `link-disabled`}
          to={`/products/${product.id}`}
        >
          <div className="card-img-cont">
            {product.inStock || (
              <div className="out-of-stock">Out of Stock</div>
            )}
            <img src={product.gallery[0]}></img>
          </div>
        </Link>
        <button
          //addToCart: adding product to store
          onClick={() =>
            this.props.dispatch(
              addToCart({
                product
              })
            )
          }
          className="add-to-cart-btn"
        >
          <EmptyCart className="empty-cart-icon" />
        </button>
        <div className="card-content">
          <div className="card-content-title">
            {product.brand} {product.name}
          </div>
          {product.prices.map((price) => {
            //Filter out the amount according to the selected currency
            if (price.currency.label === selectedCurrency.label) {
              return (
                <div className="card-content-price" key={product.id}>
                  {selectedCurrency.symbol}
                  {roundTo2Decimal(price.amount)}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart,
  selectedCurrency: state.currency.selectedCurrency
});

export default connect(mapStateToProps)(Card);
