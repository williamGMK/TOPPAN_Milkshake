import React from "react";
import "./PlaceOrder.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);

  const subtotal = getTotalCartAmount();
  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 10;
  const vat = subtotal * 0.15;
  const totalWithVat = subtotal + deliveryFee + vat;

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title"> Customer Delivery Details</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R{subtotal}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>R{deliveryFee}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>VAT (15%)</p>
              <p>R{vat.toFixed(2)}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <b>R{totalWithVat.toFixed(2)}</b>
            </div>
          </div>

          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
