import axios from "axios";
import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";

  // -----------------------------
  // FIX 1: Load token from localStorage
  // -----------------------------
  const [token, setTokenState] = useState("");
  const [drink_list, setDrinkList] = useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setTokenState(savedToken);
    }
  }, []);

  // -----------------------------
  // FIX 2: Save token correctly
  // -----------------------------
  const setToken = (newToken) => {
    setTokenState(newToken);
    localStorage.setItem("token", newToken);
  };

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = drink_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchDrinkList = async () => {
    const response = await axios.get(url + "/api/drink/list");
    setDrinkList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchDrinkList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    drink_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
