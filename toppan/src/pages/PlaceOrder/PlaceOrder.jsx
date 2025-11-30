import React, { useState, useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalCartAmount, token, drink_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    drink_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    console.log("Order Items:", orderItems);
    console.log("Customer Data:", data);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 10;
  const vat = subtotal * 0.15;
  const totalWithVat = subtotal + deliveryFee + vat;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={handlePlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="title"> Customer Delivery Details</p>

        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />

          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />

        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />

          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />

          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
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

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
