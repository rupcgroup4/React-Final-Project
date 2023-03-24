import React from 'react';
import '../../CSS/cardStyle.css';
export const SpyAgentCards = () => {
  return (
    <div>
      <div className='container'>
        <div className='card'>
          <div className='image'>
            <img src='/Spy.png' alt=''></img>
          </div>
          <div className='content'>
            <h3>Spy</h3>
            <p>
              The goal of the spy is to reach the target airport without getting
              caught by the agents.
            </p>
          </div>
        </div>
        <div className='card'>
          <div className='image'>
            <img src='/Agents.png' alt=''></img>
          </div>
          <div className='content'>
            <h3>Agents</h3>
            <p>
              The goal of the agents is to catch the spy before he reaches the
              target airport.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SpyAgentCards;
