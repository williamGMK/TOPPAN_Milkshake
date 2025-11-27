import React from "react";
import "./DrinkItem.css";
import { assets } from "../../assets/assets";

function DrinkItem({ id, name, price, description, image }) {
  return (
    <div className="drink-item">
      <div className="drink-item-img-container">
        <img className="drink-item-image" src={image} alt={name} />
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
