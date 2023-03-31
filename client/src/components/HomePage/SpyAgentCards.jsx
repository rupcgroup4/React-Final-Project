import React from 'react';
import '../../CSS/cardStyle.css';
import spyImg from '../../img/Spy.png';
import agentsImg from '../../img/Agents.png';
import { Box } from '@mui/material';
export const SpyAgentCards = () => {
  return (
    <div>
      <Box className='container' sx={{ display: { xs: 'block', md: 'flex' } }}>
        <div className='card'>
          <div className='image'>
            <img src={spyImg} alt=''></img>
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
            <img src={agentsImg} alt=''></img>
          </div>
          <div className='content'>
            <h3>Agents</h3>
            <p>
              The goal of the agents is to catch the spy before he reaches the
              target airport.
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default SpyAgentCards;
