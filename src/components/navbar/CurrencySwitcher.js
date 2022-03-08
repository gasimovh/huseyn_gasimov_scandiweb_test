import React, { Component } from "react";
import arrow from "../../assets/img/arrow.svg";
import { graphql } from "@apollo/client/react/hoc";
import { GET_CURRENCIES } from "../../queries/queries";

import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { selectCurrency } from "../../store/currency/currencySlice";

class CurrencySwitcher extends Component {
  showCurrencies(currencies) {
    return currencies?.map((currency) => {
      return (
        <div
          onClick={() => {
            this.props.dispatch(selectCurrency(currency));
          }}
          className="currency"
          key={currency.symbol}
        >
          {currency.symbol} {currency.label}
        </div>
      );
    });
  }

  render() {
    const { currencies } = this.props.data;
    const { showCurrencyList } = this.props;
    return (
      <div className="currency-switcher">
        <div
          onClick={() => this.props.toggleShowCurrencyList()}
          className="selected-currency"
        >
          {this.props.selectedCurrency.symbol}
          <span>
            <img
              className={
                showCurrencyList ? "arrow-icon arrow-icon-active" : "arrow-icon"
              }
              src={arrow}
              alt="arrow icon"
            />
          </span>
          <div
            ref={this.myRef}
            className={
              showCurrencyList
                ? "currency-list currency-list-active"
                : "currency-list"
            }
          >
            {this.showCurrencies(currencies)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: state.currency.selectedCurrency
});

const gqlWrapper = graphql(GET_CURRENCIES);
const reduxWrapper = connect(mapStateToProps);

export default compose(reduxWrapper, gqlWrapper)(CurrencySwitcher);
