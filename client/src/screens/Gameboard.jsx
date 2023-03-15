import React, { useContext, useState, useEffect, useCallback } from 'react';
import { PlayersContext } from '../context/PlayersContextProvider';
import GameMap from '../components/Gameboard/GameMap';
import Flights from '../components/Gameboard/Flights';
import { graph } from '../file';
import Map from '../classes/Map';
import axios from 'axios';
import { shortest_path } from '../classes/utils/shortestPath';
import { Box, Grid } from '@mui/material';
import GameOverModalComponent from '../components/Gameboard/GameOverModalComponent';
import GameDescribe from '../components/Gameboard/GameDescribe';
import ToggleAgents from '../components/Gameboard/ToggleAgents';

const init_spy_position = 0;
const init_agent1_position = 1;
const init_agent2_position = 7;
const init_target_position = 28;

const spy_color = '#000000';
const agent1Color = '#0000ff';
const agent2Color = '#006400';

const flightsIds = Object.keys(graph);

const initial_spy = {
  id: flightsIds[init_spy_position],
  color: spy_color,
};

const initial_agents = [
  { id: flightsIds[init_agent1_position], color: agent1Color },
  { id: flightsIds[init_agent2_position], color: agent2Color },
];

const Gameboard = () => {
  const [turn, setTurn] = useState(null);
  const [steps, setSteps] = useState(null);

  const { player1, player2 } = useContext(PlayersContext);

  //Hold map class object
  const [map, setMap] = useState(null);
  //current selected airport on the map
  const [selectedAirport, setSelectedAirport] = useState();
  //current tagert position on the map
  const [targetPosition, setTargetPosition] = useState(null);
  //player plane current location on the map
  const [spy, setSpy] = useState(null);
  //opponent player current location on the map
  const [agents, setAgents] = useState([]);
  //represent which agents num to present in agents Flights component
  const [isAgent1Show, setIsAgent1Show] = useState(true);
  //messgae for game describe
  const [message, setMessage] = useState('');

  const changeAgent = () => {
    setIsAgent1Show(isAgent1Show ? false : true);
  };

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const updateSpyLocationId = (newId) => {
    setSpy({ id: newId, color: spy_color });
  };

  const updateAgentLocationId = (agents) => {
    setAgents(agents);
  };

  const createNewMap = useCallback(() => {
    const map = new Map(
      structuredClone(initial_spy),
      updateSpyLocationId,
      structuredClone(initial_agents),
      updateAgentLocationId,
      setSelectedAirport,
      flightsIds[init_target_position]
    );
    setMap(map);
  }, []);

  const startGame = useCallback(() => {
    setSteps(0);
    setTargetPosition(flightsIds[init_target_position]);
    setSpy(initial_spy);
    setAgents(initial_agents);
    setTurn('spy');
    createNewMap();
  }, [createNewMap]);

  const spyMove = (location) => {
    setMessage(
      `Spy moved from ${graph[spy.id].name} to ${graph[location].name}`
    );
    map.setPlane(`${spy.id} ${location}`);
    setTurn('agent 1');
    setSteps((prev) => prev + 1);
  };

  const agentMove = (location, agentNum) => {
    setMessage(
      `Agent ${agentNum + 1} moved from ${graph[agents[agentNum].id].name} to ${
        graph[location].name
      }`
    );
    map.placeOpponentPlane(`${agents[agentNum].id} ${location}`, agentNum);
    if (turn === 'agent 1') {
      setTurn('agent 2');
    } else {
      setTurn('spy');
    }
    setSteps((prev) => prev + 1);
  };

  const checkWin = useCallback(async () => {
    const isSpyWin = spy?.id === targetPosition;
    const isAgentsWin = agents.some((agent) => agent?.id === spy?.id);
    if (isAgentsWin) {
      await sleep(1000);
      alert('agents win');
    }
    if (isSpyWin) {
      await sleep(1000);
      alert('spy win');
    }
  }, [agents, spy?.id, targetPosition]);

  const resetGame = () => {
    map.initiatePlayers(initial_spy, initial_agents);
    startGame();
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    checkWin();
  }, [spy, agents, targetPosition, checkWin]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <GameDescribe
        resetGame={resetGame}
        message={message}
        steps={steps}
        turn={turn}
      />
      <Grid container spacing={0.5} mt={5}>
        <Grid item xs={3}>
          <Flights
            state={spy}
            isSpy={true}
            targetPosition={targetPosition}
            turn={turn}
            spyMove={spyMove}
            agentMove={agentMove}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            border: 1,
            boxShadow: 3,
            maxHeight: '91vh',
          }}
        >
          <GameMap map={map} graph={graph} />
        </Grid>
        <Grid item xs={3}>
          <ToggleAgents isAgent1Show={isAgent1Show} changeAgent={changeAgent} />
          {isAgent1Show ? (
            <Flights
              key={'agent1'}
              state={agents[0]}
              isSpy={false}
              targetPosition={targetPosition}
              turn={turn}
              spyMove={spyMove}
              agentMove={agentMove}
              agentNum={0}
              spyLocation={spy?.id}
            />
          ) : (
            <Flights
              key={'agent2'}
              state={agents[1]}
              isSpy={false}
              targetPosition={targetPosition}
              turn={turn}
              spyMove={spyMove}
              agentMove={agentMove}
              agentNum={1}
              spyLocation={spy?.id}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Gameboard;
