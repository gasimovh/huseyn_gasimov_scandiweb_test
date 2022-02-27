import React, { Component } from "react";
import arrow from "../../assets/img/arrow.svg";
import { graphql } from "@apollo/client/react/hoc";
import { GET_CURRENCIES } from "../../queries/queries";

import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { selectCurrency } from "../../store/currency/currencySlice";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrencyList: false
    };
  }

  toggleCurrencyList = (event) => {
    this.setState({
      showCurrencyList: !this.state.showCurrencyList
    });
  };

  myRef = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ showCurrencyList: false });
    }
  };

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
    const { showCurrencyList } = this.state;
    return (
      <div onClick={this.toggleCurrencyList} className="currency-switcher">
        <div className="selected-currency">
          {this.props.selectedCurrency.symbol}
          <span>
            <img
              className={
                showCurrencyList ? "arrow-icon arrow-icon-active" : "arrow-icon"
              }
              src={arrow}
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
