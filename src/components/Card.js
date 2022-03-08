import React, { Component } from "react";
import { ReactComponent as EmptyCart } from "../assets/img/empty-cart.svg";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
import { setFeaturedImage } from "../store/product/productSlice";
import { generateKey, roundTo2Decimal } from "../utils/helperFunctions";

class Card extends Component {
  showPrices(product, selectedCurrency) {
    return product.prices.map((price) => {
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
  render() {
    const { product, selectedCurrency } = this.props;
    return (
      <div
        onClick={() =>
          this.props.dispatch(setFeaturedImage(product.gallery[0]))
        }
        className={product.inStock ? `card` : `card card-disabled`}
      >
        <Link to={`/products/${product.id}`}>
          <div className="card-img-cont">
            {product.inStock || (
              <div className="out-of-stock">Out of Stock</div>
            )}
            <img src={product.gallery[0]} alt={`${product.name}`}></img>
          </div>
        </Link>
        {product.inStock && (
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
        )}
        <div className="card-content">
          <div className="card-content-title">
            {product.brand} {product.name}
          </div>
          {this.showPrices(product, selectedCurrency)}
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
