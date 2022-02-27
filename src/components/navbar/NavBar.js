import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import FilterCategory from "./FilterCategory";
import CurrencySwitcher from "./CurrencySwitcher";
import CartOverlay from "../cart/CartOverlay";
import cartIcon from "../../assets/img/empty-cart.svg";
import { connect } from "react-redux";

class NavBar extends Component {
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

  render() {
    const { show } = this.state;
    const badgeCounter = this.props.items.length;
    return (
      <nav className="nav-bar">
        <FilterCategory />
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="action-bar">
          <CurrencySwitcher />
          <div className="cart-icon-container">
            {badgeCounter > 0 && (
              <span onClick={this.toggleShow} className="badge">
                {badgeCounter}
              </span>
            )}
            <img
              onClick={this.toggleShow}
              src={cartIcon}
              alt="cart-icon"
              className="cart-icon"
            />
          </div>
          {show && <div onClick={this.toggleShow} className="overlay"></div>}
          {show && <CartOverlay toggleShow={this.toggleShow} />}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.items
});

export default connect(mapStateToProps)(NavBar);
