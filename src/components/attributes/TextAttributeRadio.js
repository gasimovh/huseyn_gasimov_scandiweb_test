import React, { Component } from "react";
import { connect } from "react-redux";
import { setAttribute } from "../../store/cart/cartSlice";

class TextAttributeRadio extends Component {
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
    const isPDP = customStyle === "PDP"; //dispatch setAttribute if component rendered in PDP
    const canDisable = selectedAttributePurchase
      ? selectedAttributePurchase.value !== value
      : false; //1st side checks if prop exists. disables all fields(except selected attribute) in cartoverlay and cartpage
    const canNotDisable = selectedAttributePurchase
      ? selectedAttributePurchase.value === value
      : false;
    return (
      <div className={`text-attribute-component-${customStyle}`}>
        <input
          type="radio"
          id={id}
          className={`text-attribute-${customStyle}`}
          value={value}
          name={name}
          selected={isSelected === this.props.value}
          onChange={this.handleOnChange}
          disabled={canDisable} //disabled style for non-selected attribute in cart
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
        <label
          htmlFor={this.props.id}
          {...(canDisable && { className: "text-disabled" })} //disabled style for non-selected attribute in cart
          {...(canNotDisable && { className: "text-select" })} //selected style for selected attribute in cart
        >
          {this.props.value}
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart,
  selectedAttributes: state.cart.selectedAttributes
});

export default connect(mapStateToProps)(TextAttributeRadio);
