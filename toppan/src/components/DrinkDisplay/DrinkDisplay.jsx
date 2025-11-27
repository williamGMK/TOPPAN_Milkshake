import React, { useContext } from "react";
import "./DrinkDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import DrinkItem from "../DrinkItem/DrinkItem";
function DrinkDisplay({ category }) {
  const { drink_list } = useContext(StoreContext);
  return (
    <div className="drink-display" id="drink-display">
      <h2>Top milk near you</h2>
      <div className="drink-display-list">
        {drink_list.map((item, index) => {
          return (
            <DrinkItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DrinkDisplay;
