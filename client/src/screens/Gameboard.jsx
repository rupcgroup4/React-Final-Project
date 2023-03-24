import React, { useContext, useState, useEffect, useCallback } from 'react';
import { PlayersContext } from '../context/PlayersContextProvider';
import GameMap from '../components/Gameboard/GameMap';
import Flights from '../components/Gameboard/Flights';
import { graph } from '../file';
import Map from '../classes/Map';
import axios from 'axios';
import { Box, Divider, Grid } from '@mui/material';
import GameOverModalComponent from '../components/Gameboard/GameOverModal';
import GameDescribe from '../components/Gameboard/GameDescribe';
import ToggleAgents from '../components/Gameboard/ToggleAgents';
import usePlayersStore from '../store/playerStore';
import { API_URL } from '../utils/constants';
import GameAlert from '../components/Gameboard/GameAlert';
import GameOverModal from '../components/Gameboard/GameOverModal';

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

  const { player1, player2, player2Logout } = usePlayersStore();

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
  const [gameDescribeMessage, setGameDescribeMessage] = useState('');
  //
  const [winner, setWinner] = useState(null);
  //
  const [isGameOver, setIsGameOver] = useState(false);
  //
  const [roleWin, setRoleWin] = useState('');

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

  const saveGameStats = useCallback(async () => {
    const spyEmail = 'Email' in player1 ? player1.Email : 'Guest';
    const agentsEmail = 'Email' in player2 ? player2.Email : 'Guest';

    const res = await axios.post(`${API_URL}/games`, {
      Date: new Date().toLocaleDateString(),
      Spy: spyEmail,
      Agents: agentsEmail,
      Steps: steps,
      Winner: winner,
    });
    console.log(res);
  }, [player1, player2, steps, winner]);

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
    setWinner(null);
    setSteps(0);
    setTargetPosition(flightsIds[init_target_position]);
    setSpy(initial_spy);
    setAgents(initial_agents);
    setTurn('spy');
    createNewMap();
  }, [createNewMap]);

  const spyMove = (location) => {
    setGameDescribeMessage(
      `Spy moved from ${graph[spy.id].name} to ${graph[location].name}`
    );
    map.setPlane(`${spy.id} ${location}`);
    setTurn('agent 1');
    setSteps((prev) => prev + 1);
    checkWin();
  };

  const agentMove = (location, agentNum) => {
    setGameDescribeMessage(
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
    checkWin();
  };

  const setWinnerEmail = useCallback(
    (winRole) => {
      const isPlayer1Win = player1.role === winRole;
      const winnerEmail = isPlayer1Win ? player1?.Email : player2?.Email;
      setWinner(winnerEmail);
      setRoleWin(winRole);
    },
    [player1?.Email, player1?.role, player2?.Email]
  );

  const checkWin = useCallback(async () => {
    const isSpyWin = spy?.id === targetPosition;
    const isAgentsWin = agents.some((agent) => agent?.id === spy?.id);
    if (isAgentsWin) {
      await sleep(1000);
      setIsGameOver(true);
      setWinnerEmail('agents');
    } else if (isSpyWin) {
      await sleep(1000);
      setIsGameOver(true);
      setWinnerEmail('spy');
    }
    if (isSpyWin || isAgentsWin) {
      setTurn('');
    }
    setTimeout(() => {
      setGameDescribeMessage('');
    }, 2000);
  }, [agents, setWinnerEmail, spy?.id, targetPosition]);

  const resetGame = () => {
    startGame();
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    checkWin();
  }, [spy, agents, targetPosition, checkWin]);

  useEffect(() => {
    if (winner) {
      saveGameStats();
    }
  }, [saveGameStats, winner]);

  //Logout Player 2 when leaving gameboard
  useEffect(() => {
    return () => {
      player2Logout();
    };
  }, [player2Logout]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box></Box>

      <Grid container spacing={0.5}>
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <GameDescribe resetGame={resetGame} steps={steps} turn={turn} />
        </Grid>

        <Grid item md={3}>
          <Flights
            state={spy}
            isSpy={true}
            targetPosition={targetPosition}
            turn={turn}
            spyMove={spyMove}
            agentMove={agentMove}
          />
        </Grid>
        <Grid item md={6}>
          <Box
            sx={{
              border: 1,
              boxShadow: 3,
              maxHeight: '91vh',
              borderRadius: '16px',
            }}
          >
            <GameMap map={map} graph={graph} />
          </Box>
          <GameAlert message={gameDescribeMessage} />
        </Grid>
        <Grid item md={3}>
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
      <GameOverModal
        open={isGameOver}
        setOpen={setIsGameOver}
        roleWin={roleWin}
      />
    </Box>
  );
};

export default Gameboard;
