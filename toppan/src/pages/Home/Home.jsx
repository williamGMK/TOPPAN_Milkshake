import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import DrinkDisplay from "../../components/DrinkDisplay/DrinkDisplay";

function Home() {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <DrinkDisplay category={category} />
    </div>
  );
}

export default Home;
