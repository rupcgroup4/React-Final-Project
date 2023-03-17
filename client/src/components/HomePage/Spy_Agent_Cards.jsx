import React from "react";
import "../../CSS/cardStyle.css";
export const Spy_Agent_Cards = () => {
  return (
    <div>
      <div class="container">
        <div class="card">
          <div class="image">
            <img src="/Spy.png"></img>
          </div>
          <div class="content">
            <h3>Spy</h3>
            <p>The goal of the spy...</p>
          </div>
        </div>
        <div class="card">
          <div class="image">
            <img src="/Agents.png"></img>
          </div>
          <div class="content">
            <h3>Agents</h3>
            <p>The goal of the agents...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Spy_Agent_Cards;
