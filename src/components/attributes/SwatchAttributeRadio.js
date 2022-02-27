import React, { Component } from "react";
import { connect } from "react-redux";
import { setAttribute } from "../../store/cart/cartSlice";

class SwatchAttributeRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: ""
    };
  }
  handleOnChange = (e) => {
    this.setState({ isSelected: e.target.value });
  };

  render() {
    const { isSelected } = this.state;
    const { id, name, value, product, customStyle, selectedAttributePurchase } =
      this.props;
    const isPDP = customStyle === "PDP";
    const canDisable = selectedAttributePurchase
      ? selectedAttributePurchase.value !== value
      : false; //1st side checks if prop exists. disables all fields(except selected attribute) in cartoverlay and cartpage
    const canNotDisable = selectedAttributePurchase
      ? selectedAttributePurchase.value === value
      : false;
    return (
      <div className={`swatch-attribute-component-${customStyle}`}>
        <input
          type="radio"
          id={id}
          className={`swatch-attribute-${customStyle}`}
          value={value}
          name={name}
          selected={isSelected === this.props.value}
          onChange={this.handleOnChange}
          disabled={canDisable}
          onClick={() => {
            isPDP &&
              this.props.dispatch(
                setAttribute({
                  value: value,
                  name: name,
                  productId: product.id
                })
              );
          }}
        />
        <label htmlFor={id}>
          <span
            style={{ backgroundColor: `${value}` }}
            // disables all fields(except selected attribute) in cartoverlay and cartpage
            {...(canDisable && { className: "swatch-disabled" })}
            {...(canNotDisable && { className: "swatch-select" })}
          >
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart,
  selectedAttributes: state.cart.selectedAttributes
});

export default connect(mapStateToProps)(SwatchAttributeRadio);
