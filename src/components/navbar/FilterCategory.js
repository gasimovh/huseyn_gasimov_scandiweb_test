import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { GET_CATEGORIES } from "../../queries/queries";
import { Link } from "react-router-dom";

import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { selectCategory } from "../../store/category/categorySlice";
import { generateKey } from "../../utils/helperFunctions";

class FilterCategory extends Component {
  showCategories(categories, loading) {
    const { currentCategory } = this.props.category;
    return loading ? (
      <div>Loading...</div>
    ) : (
      categories.map((category, index) => {
        return (
          <Link to="/" key={generateKey()}>
            <div
              //on click updates the selected category in store
              onClick={() => {
                this.props.dispatch(selectCategory(category.name));
              }}
              //applies style when category selected
              className={
                currentCategory === category.name
                  ? "category-active"
                  : "category-inactive"
              }
              key={index}
            >
              {category.name}
            </div>
          </Link>
        );
      })
    );
  }
  render() {
    const { categories, loading } = this.props.data;
    return (
      <div className="categories">
        {this.showCategories(categories, loading)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category
});

const gqlWrapper = graphql(GET_CATEGORIES);
const reduxWrapper = connect(mapStateToProps);

export default compose(reduxWrapper, gqlWrapper)(FilterCategory);
