import React, { useState } from "react";
import "./DrinkItem.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

function DrinkItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="drink-item">
      <div className="drink-item-img-container">
        <img
          className="drink-item-image"
          src={url + "/images/" + image}
          alt={name}
        />

        {!cartItems?.[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="drink-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />

            <p>{cartItems[id]}</p>

            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="drink-item-info">
        <div className="drink-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="drink-item-desc">{description}</p>
        <p className="drink-item-price">R{price}</p>
      </div>
    </div>
  );
}

export default DrinkItem;
