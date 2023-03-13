import React, { useContext, useRef, useState, useEffect } from 'react';
import { PlayersContext } from '../context/PlayersContextProvider';
import GameMap from '../components/Gameboard/GameMap';
import Flights from '../components/Gameboard/Flights';
import { graph } from '../file';
import Map from '../classes/Map';
import axios from 'axios';
import { shortest_path } from '../classes/utils/shortestPath';
import {
  Box,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import GameOverModalComponent from '../components/Gameboard/GameOverModalComponent';
import GameDescribe from '../components/Gameboard/GameDescribe';
import Path from '../components/Gameboard/Path';

const init_spy_position = 0;
const init_agent1_position = 1;
const init_agent2_position = 7;
const init_target_position = 28;

let FullEpisode = false;
let PlaySteps = false;

const Gameboard = () => {
  const [isAgent1Show, setIsAgent1Show] = useState(true);

  const { player2 } = useContext(PlayersContext);
  console.log(player2);

  const [flagIsGameOver, setFlagIsGameOver] = useState(false);
  const [currentsPlayer, setCurrentsPlayer] = useState(null); //manage who's turn it is to play, options: null/spy/agents
  const [gameStatus, setGameStatus] = useState({
    status: '',
    text: '',
  });

  const flightsIds = Object.keys(graph);

  //current selected airport on the map
  const [selectedAirport, setSelectedAirport] = useState();

  //current tagert position on the map
  const [targetPosition, setTargetPosition] = useState(
    flightsIds[init_target_position]
  );

  //player plane current location on the map
  const [spy, setSpy] = useState({
    id: flightsIds[init_spy_position],
    color: '#000000',
  });
  //opponent player current location on the map

  const [agents, setAgents] = useState([
    { id: flightsIds[init_agent1_position], color: '#0000ff' },
    { id: flightsIds[init_agent2_position], color: '#006400' },
  ]);

  const updateSpyLocationId = (newId) => {
    setSpy({ id: newId, color: spy.color });
  };

  //manage turn in game
  useEffect(() => {
    if (!flagIsGameOver && currentsPlayer) {
      // if (currentsPlayer == 'spy')
      // else if (currentsPlayer == 'agents')
      //agents turn to play
    }
  }, [currentsPlayer, flagIsGameOver]);

  useEffect(() => {
    console.log('in useEffct spy/agents', 'flagIsGameOver=', flagIsGameOver);

    if (!flagIsGameOver && spy && agents && isGameOver()) {
      console.log('in useEffct spy/agents, in if- ');
      setFlagIsGameOver(true);
      // startNewGame();
    }
  }, [spy, agents]);

  //useEfect to know when The game ended
  useEffect(() => {
    console.log('in useEffct flagGameIsOver/Round');
    console.log(
      'currentsPlayer=',
      currentsPlayer,
      'flagIsGameOver=',
      flagIsGameOver
    );

    if (
      flagIsGameOver &&
      (currentsPlayer == 'spy' || currentsPlayer == 'agents')
    ) {
      // alert("Game Over");
      console.log(
        'in use effect, game is over after, flagGameOver=',
        flagIsGameOver
      );

      setTimeout(
        () => {
          setGameStatus({ ...gameStatus, openModal: true }); //to open the gameOverModal
        },
        currentsPlayer && currentsPlayer === 'spy' ? 1100 : 2100
      );
    }
  }, [flagIsGameOver]);

  const updateAgentLocationId = (id, agentNum) => {
    const newAgents = [...agents];
    newAgents[agentNum].id = id;
    setAgents(newAgents);
  };

  //initiate new Map object and set it as Ref
  const { current: map } = useRef(
    new Map(
      spy,
      updateSpyLocationId,
      agents,
      updateAgentLocationId,
      setSelectedAirport,
      targetPosition
    )
  );

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const startNewGame = async () => {
    FullEpisode = false;
    PlaySteps = false;
    //stop interval

    console.log('this.chart.series:', map.chart.series);
    console.log('this.chart.series._values', map.chart.series._values);

    var tmpSpy = {
      id: flightsIds[init_spy_position],
      color: '#000000',
    };
    setSpy(tmpSpy);

    var tmpAgents = [
      { id: flightsIds[init_agent1_position], color: '#0000ff' },
      { id: flightsIds[init_agent2_position], color: '#006400' },
    ];
    setAgents(tmpAgents);

    //alert('start new game')
    await map.deleteAllPlayersFromMap();
    console.log('startNewGame');
    map.initiatePlayers(tmpSpy, tmpAgents); //

    setCurrentsPlayer(null);

    setGameStatus(null);

    console.log(
      'startNewGame: ',
      'spy: ',
      spy.id,
      'agent1:',
      agents[0].id,
      'agent2:',
      agents[1].id
    );
    console.log(
      'startNewGame2:',
      'init_spy_position:',
      flightsIds[init_spy_position],
      'initAgent1:',
      flightsIds[init_agent1_position],
      'initAgent2:',
      flightsIds[init_agent2_position]
    );
    console.log(`${agents[0].id} ${flightsIds[init_agent1_position]}`);
    console.log(`${agents[1].id} ${flightsIds[init_agent2_position]}`);
    //map.setPlane(`${spy.id} ${flightsIds[init_spy_position]}`); //initialise spy
    //map.placeOpponentPlane(`${agents[0].id} ${flightsIds[init_agent1_position]}`, 0); //initialise agent1
    //map.placeOpponentPlane(`${agents[1].id} ${flightsIds[init_agent2_position]}`, 1); //initialise agent2

    console.log('start new game before', flagIsGameOver);
    setFlagIsGameOver(false);
    console.log('start new game after', flagIsGameOver);
  };

  const isGameOver = () => {
    console.log(
      'gameOver: ',
      'spy=',
      spy.id,
      'agent1=',
      agents[0].id,
      'agent2=',
      agents[1].id
    );

    if (spy.id === targetPosition) {
      //spy in target
      console.log('game over- spy in target');

      setFlagIsGameOver(true);
      setGameStatus({
        status: 'Win',
        text: 'Spy in target',
      });
      return true;
    } else if (spy.id === agents[0].id || spy.id === agents[1].id) {
      //spy caught
      console.log('game over- spy cuaght');
      setFlagIsGameOver(true);

      setGameStatus({
        status: 'Lose',
        text: `Spy cuaght by agent ${spy.id === agents[0].id ? '1' : '2'}`,
      });
      return true;
    } else {
      //game not over
      return false;
    }
  };

  const executeTurn = () => {
    setCurrentsPlayer('spy');
  };

  //const playAgents = async (spyNewId) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <GameDescribe />

      <Grid container spacing={0.5}>
        <Grid item xs={3}>
          <Flights
            state={spy}
            selectedAirport={selectedAirport}
            isSpy={true}
            map={map}
            targetPosition={targetPosition}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            border: 1,
            boxShadow: 3,
            maxHeight: '91vh',
            marginTop: '1rem',
            paddingRight: '0.3rem',
            paddingBottom: '0.3rem',
          }}
        >
          <GameMap
            spy={spy}
            agents={agents}
            graph={graph}
            map={map}
            agentNum={0}
          />
        </Grid>
        <Grid item xs={3}>
          {isAgent1Show ? (
            <Flights
              key={`agent1`}
              state={agents[0]}
              selectedAirport={selectedAirport}
              isSpy={false}
              map={map}
              targetPosition={targetPosition}
              agentNum={0}
              spyLocation={spy.id}
              isAgent1Show={isAgent1Show}
              setIsAgent1Show={setIsAgent1Show}
            />
          ) : (
            <Flights
              key={`agent2`}
              state={agents[1]}
              selectedAirport={selectedAirport}
              isSpy={false}
              map={map}
              targetPosition={targetPosition}
              agentNum={1}
              spyLocation={spy.id}
              isAgent1Show={isAgent1Show}
              setIsAgent1Show={setIsAgent1Show}
            />
          )}
        </Grid>
      </Grid>
      <GameOverModalComponent
        open={gameStatus && gameStatus.openModal}
        gameStatus={gameStatus}
        onClose={() => setGameStatus(null)}
      />
    </Box>
  );
};

export default Gameboard;
