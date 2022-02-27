import { gql } from "@apollo/client";

const GET_PRODUCTS_BY_CATEGORY = gql`
  query ($category: String!) {
    category(input: { title: $category }) {
      products {
        id
        name
        brand
        inStock
        description
        gallery
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_ID = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      description
      gallery
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;
const GET_CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

export {
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_BY_ID,
  GET_CURRENCIES,
  GET_CATEGORIES
};
