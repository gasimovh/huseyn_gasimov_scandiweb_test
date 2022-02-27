import React, { Component } from "react";
import Card from "../components/Card";
import { graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCTS_BY_CATEGORY } from "../queries/queries";
import CardSkeletonLoader from "../utils/CardSkeletonLoader";

import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { resetSelectedAttributes } from "../store/cart/cartSlice";

class ProductListingPage extends Component {
  //show fetched products
  showProducts() {
    //resets the selected attributes to implement add product with default attributes to cart
    this.props.dispatch(resetSelectedAttributes());

    const { data } = this.props;
    return data.loading
      ? [1, 2, 3, 4, 5, 6].map((i) => <CardSkeletonLoader key={i} />)
      : data.category.products.map((product) => {
          return <Card product={product} key={product.id} />;
        });
  }

  render() {
    return (
      <div>
        <h1 className="category-name">{this.props.category.currentCategory}</h1>
        <div className="grid-container">{this.showProducts()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category
});

const gqlWrapper = graphql(GET_PRODUCTS_BY_CATEGORY, {
  options: ({ category: { currentCategory } }) => {
    return {
      variables: {
        category: currentCategory
      }
    };
  }
});
const reduxWrapper = connect(mapStateToProps);

export default compose(reduxWrapper, gqlWrapper)(ProductListingPage);
