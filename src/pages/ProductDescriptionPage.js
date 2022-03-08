import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCT_BY_ID } from "../queries/queries";
import ItemAttribute from "../components/attributes/ItemAttribute";
import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
import { toast } from "react-toastify";
import { setFeaturedImage } from "../store/product/productSlice";
import { generateKey, roundTo2Decimal } from "../utils/helperFunctions";
import DescriptionModal from "../components/DescriptionModal";
import dompurify from "dompurify";
import parse from "html-react-parser";

class ProductDescriptionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggleShow = (event) => {
    this.setState({
      show: !this.state.show
    });
  };

  showPrice(product, selectedCurrency) {
    return product?.prices.map((price) => {
      //Filter out the amount according to the selected currency
      return (
        price.currency.label === selectedCurrency.label && (
          <div className="price-value" key={generateKey()}>
            {selectedCurrency.symbol}
            {roundTo2Decimal(price.amount)}
          </div>
        )
      );
    });
  }
  showImages(product) {
    return product?.gallery.map((img) => {
      return (
        <img
          onClick={() => this.props.dispatch(setFeaturedImage(img))}
          src={img}
          key={img}
          alt={product?.name}
        />
      );
    });
  }

  showAttributes(product) {
    return product?.attributes.map((attribute, index) => {
      return (
        <ItemAttribute
          product={product}
          customStyle={"PDP"}
          attribute={attribute}
          key={index}
        />
      );
    });
  }

  addProductToCart(product, selectedAttributes) {
    return (
      <button
        onClick={() => {
          if (product?.inStock) {
            if (product?.attributes.length === 0) {
              this.props.dispatch(
                addToCart({
                  product
                })
              );
            } else {
              if (selectedAttributes.length !== product?.attributes.length) {
                toast.warn("Please select all attributes 👆", {
                  autoClose: 3000,
                  position: "bottom-right"
                });
              } else {
                this.props.dispatch(
                  addToCart({
                    product
                  })
                );
              }
            }
          } else {
            toast.info("This product is out of stock.", {
              autoClose: 3000,
              position: "bottom-right"
            });
          }
        }}
        className="btn btn-primary btn-lg"
      >
        Add to cart
      </button>
    );
  }
  render() {
    const { product } = this.props.data;
    const { selectedAttributes, featuredImage, selectedCurrency } = this.props;
    const isDescriptionLong = product?.description.length > 300;
    const { show } = this.state;

    return (
      <div className="product-description-page">
        <div className="all-images">{this.showImages(product)}</div>
        <div className="featured-image">
          <img src={featuredImage} alt={product?.name} />
        </div>
        <div className="right-description">
          <p className="brand">{product?.brand}</p>
          <p className="name">{product?.name}</p>
          <div className="attributes">{this.showAttributes(product)}</div>
          <p className="price">Price:</p>
          {this.showPrice(product, selectedCurrency)}
          {this.addProductToCart(product, selectedAttributes)}
          {isDescriptionLong ? (
            <button
              onClick={this.toggleShow}
              className="btn btn-outline-secondary btn-sm read-description"
            >
              Read description
            </button>
          ) : (
            <div className="description">
              {parse(dompurify.sanitize(product?.description))}
            </div>
          )}
          {show && (
            <div
              onClick={this.toggleShow}
              className="description-overlay"
            ></div>
          )}
          {show && (
            <DescriptionModal productDescription={product?.description} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.items,
  selectedCurrency: state.currency.selectedCurrency,
  selectedAttributes: state.cart.selectedAttributes,
  featuredImage: state.product.featuredImage
});

const reduxWrapper = connect(mapStateToProps);

const gqlWrapper = graphql(GET_PRODUCT_BY_ID, {
  options: ({
    match: {
      params: { id }
    }
  }) => {
    return {
      variables: {
        id: id
      }
    };
  }
});

export default compose(reduxWrapper, gqlWrapper)(ProductDescriptionPage);
