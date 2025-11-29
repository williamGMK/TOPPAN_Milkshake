import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite Milkshake here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of cups
          crafted with the finest tastes. Our mission is to satisfy your testy
          experience, one delicious meal at a time
        </p>
        <button
          onClick={() => {
            const menu = document.getElementById("menu");
            if (menu) {
              menu.scrollIntoView({ behavior: "smooth" });
            }
            if (typeof setCategory === "function") {
              setCategory("All");
            }
          }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

export default Header;
