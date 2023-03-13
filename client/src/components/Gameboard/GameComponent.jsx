import React, { useEffect, useState, useRef } from "react";
import GameMap from "./GameMap";
import Flights from "./Flights";
import { graph } from "../file";
import Map from "../classes/Map";
import axios from "axios";
import { shortest_path } from "../classes/utils/shortestPath";
import { Box, Grid, Fab } from "@mui/material";
import GameOverModalComponent from "./GameOverModalComponent";

const init_spy_position = 0;
const init_agent1_position = 1;
const init_agent2_position = 7;
const init_target_position = 28;

let FullEpisode = false;
let PlaySteps = false;

const GameComponent = (props) => {
  const intervalGame = useRef(null);

  const [flagIsGameOver, setFlagIsGameOver] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const[currentsPlayer, setCurrentsPlayer] = useState(null); //manage who's turn it is to play, options: null/spy/agents
  const[autoPlay, setAutoPlay] = useState(false);

useEffect(() => {
  console.log("autoPlay=", autoPlay, " currentsPlayer=", currentsPlayer);

  if(autoPlay && currentsPlayer == null) {

    setTimeout(() => {
      executeTurn()}, 1000);
  }

}, [autoPlay, currentsPlayer]);


const startAutoPlay = () => {
  setAutoPlay(true);
}

// const stopAutoPlay = () => {

// }

  const [gameStatus, setGameStatus] = useState({
    status: "",
    text: "",
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
    color: "#000000",
  });
  //opponent player current location on the map

  const [agents, setAgents] = useState([
    { id: flightsIds[init_agent1_position], color: "#0000ff" },
    { id: flightsIds[init_agent2_position], color: "#006400" },
  ]);

  const updateSpyLocationId = (newId) => {
    setSpy({ id: newId, color: spy.color });
  };

  // useEffect(() => {
  //   let counter = 0;
  //   for (const i in graph) {
  //     const path = shortest_path(0, counter, graph);
  //     console.log(`traget: ${counter}  -- length: ${path.length - 1}`);
  //     counter++;
  //   }
  // }, []);

  
  //manage turn in game
  useEffect(() => {
    if(!flagIsGameOver && currentsPlayer){
      if( currentsPlayer == 'spy')
        PlaySpy();
      else if(currentsPlayer == 'agents')//agents turn to play
        playAgents();
    }
  },[currentsPlayer, flagIsGameOver]);

  useEffect(() => {
    console.log("in useEffct spy/agents", "flagIsGameOver=", flagIsGameOver);

    if (!flagIsGameOver && spy && agents && isGameOver()) {
      console.log( "in useEffct spy/agents, in if- ");
      setFlagIsGameOver(true);
      // startNewGame();
    }

  }, [spy, agents]);

  //useEfect to know when The game ended
  useEffect(() => {
    console.log("in useEffct flagGameIsOver/Round");
    console.log("currentsPlayer=", currentsPlayer, "flagIsGameOver=", flagIsGameOver);


    if (flagIsGameOver && ((currentsPlayer=='spy') || (currentsPlayer=='agents' && roundOver))) { 
      // alert("Game Over");
      console.log("in use effect, game is over after, flagGameOver=",flagIsGameOver, "roundOver=",roundOver);

      setAutoPlay(false); 

      setTimeout(() => {
        setGameStatus({...gameStatus,openModal:true}); //to open the gameOverModal
      }, currentsPlayer && currentsPlayer=='spy'? 1100 : 2100);
      
    }

    if(roundOver)
       setCurrentsPlayer(null);

  }, [flagIsGameOver, roundOver]);

  const updateAgentLocationId = (id, agentNum) => {
    const newAgents = [...agents];
    newAgents[agentNum].id = id;
    setAgents(newAgents);
    if (agentNum === agents.length - 1) {
      setRoundOver(true);
    }
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
    clearInterval(intervalGame.current);

    setAutoPlay(false); //??needed??

    console.log("this.chart.series:", map.chart.series);
    console.log("this.chart.series._values", map.chart.series._values);

    var tmpSpy = {
      id: flightsIds[init_spy_position],
      color: "#000000",
    };
    setSpy(tmpSpy);

    var tmpAgents = [
      { id: flightsIds[init_agent1_position], color: "#0000ff" },
      { id: flightsIds[init_agent2_position], color: "#006400" },
    ];
    setAgents(tmpAgents);

    //alert('start new game')
    await map.deleteAllPlayersFromMap();
    console.log("startNewGame");
    map.initiatePlayers(tmpSpy, tmpAgents); //

    setCurrentsPlayer(null);

    setGameStatus(null);


    console.log("startNewGame: ","spy: ",spy.id,"agent1:",agents[0].id,"agent2:", agents[1].id);
    console.log("startNewGame2:","init_spy_position:",flightsIds[init_spy_position],"initAgent1:",flightsIds[init_agent1_position],"initAgent2:",flightsIds[init_agent2_position]);
    console.log(`${agents[0].id} ${flightsIds[init_agent1_position]}`);
    console.log(`${agents[1].id} ${flightsIds[init_agent2_position]}`);
    //map.setPlane(`${spy.id} ${flightsIds[init_spy_position]}`); //initialise spy
    //map.placeOpponentPlane(`${agents[0].id} ${flightsIds[init_agent1_position]}`, 0); //initialise agent1
    //map.placeOpponentPlane(`${agents[1].id} ${flightsIds[init_agent2_position]}`, 1); //initialise agent2

    console.log("start new game before", flagIsGameOver);
    setFlagIsGameOver(false); 
    console.log("start new game after", flagIsGameOver);
  };

  const isGameOver = () => {
    console.log("gameOver: ","spy=",spy.id,"agent1=",agents[0].id,"agent2=",agents[1].id);

    if (spy.id === targetPosition) {//spy in target
      console.log("game over- spy in target");

      setFlagIsGameOver(true);
      setGameStatus({
        status: "Win",
        text: "Spy in target",
      });
      return true;

    } else if (spy.id === agents[0].id || spy.id === agents[1].id) {//spy caught
      console.log("game over- spy cuaght");
      setFlagIsGameOver(true);

      setGameStatus({
        status: "Lose",
        text: `Spy cuaght by agent ${spy.id === agents[0].id ? "1" : "2"}`,
      });
      return true;
    } else {
      //game not over
      return false;
    }

  };

  const PlayGame = async () => {
    FullEpisode = true;
    await PlaySpy();

    intervalGame.current = setInterval(() => {
      PlaySpy();
    }, 4500);
    
  };

const executeTurn = () => {

  setRoundOver(false);
  setCurrentsPlayer('spy');
}

  const PlaySpy = async () => {
  

    if (!FullEpisode) {
      PlaySteps = true;
    }

    const res = await axios.post("http://localhost:8000/spy", {
      spy_position: spy.id,
      agent1_position: agents[0].id,
      agent2_position: agents[1].id,
      target_position: targetPosition,
      isTrainedModel: props.isTrainedModel,
    });

    const { result } = res.data;
    console.log("PlaySpy", result);
    await map.setPlane(`${spy.id} ${result}`);

    console.log("in playSpy- flagisGameOver=",flagIsGameOver,"roundOver=",roundOver);

    /*
    if (flagIsGameOver) {
      console.log("gameover from spyPlay");
      return false;
    } else playAgents(result);
    */
   setCurrentsPlayer('agents');

  };

  //const playAgents = async (spyNewId) => {

  const playAgents = async () => {
    // const res = await axios.post('http://localhost:8000/agents', {
    //   spy_position: spy.id,
    //   agent1_position: agents[0].id,
    //   agent2_position: agents[1].id,
    //   target_position: targetPosition,
    // });

    // const { result } = res.data;
    // console.log(result);

    const flightsIds = Object.keys(graph);
    const spyIndex = flightsIds.indexOf(spy.id);
    console.log("flightsIds=", flightsIds, "spyIndex", spyIndex);
    for (let i = 0; i < agents.length; i++) {
      const agentIndex = flightsIds.indexOf(agents[i].id);
      const path = shortest_path(agentIndex, spyIndex, graph);

      //spy flew to agent
      if (path.length === 1) {
        console.log("pathLength==1");
        return;
        
      }

      const pathIds = path.map((i) => flightsIds[i]);
      console.log("agentIndex=", agentIndex, "path", path, "pathIds", pathIds);
      await sleep(1000);
      map.placeOpponentPlane(`${agents[i].id} ${pathIds[1]}`, i);

      if (i === 0) {
        if (flagIsGameOver) {
          console.log("agentPaly gameover");
          return false;
        }
      } else {
        //i==1
        if (flagIsGameOver) {
          console.log("agentPaly gameover");
          return false;
        }
      }
    }

    // map.setPlane(`${spyPlaneLocationId} ${result}`);
  };

  return (
    <Box mt={-7} sx={{ flexGrow: 1 }}>
      <GameOverModalComponent open={gameStatus && gameStatus.openModal} gameStatus={gameStatus} onClose={()=> setGameStatus(null)} />
      <div
        style={{
          textAlign: "center",
          position: "relative",
      
        }}
      >
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          //disabled={FullEpisode ? true : false}
          disabled={autoPlay ? true : false || flagIsGameOver? true : false}

        
          variant="extended"
          size="small"
          color="primary"
          onClick={executeTurn}
        >
          Play Step
        </Fab>
        
        <Fab
        //disabled={FullEpisode ? true : false || PlaySteps ? true : false}
          disabled={autoPlay ? true : false || flagIsGameOver? true : false}

          variant="extended"
        
          size="small"
          color="primary"
          onClick={startAutoPlay}
        >
          Auto Play Game
        </Fab>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          onClick={startNewGame}
        >
          Start New Game
        </Fab>
        </Box>
      </div>

      <Grid container spacing={0.5}>
        <Grid item xs={3}>
          <Flights
            state={spy}
            selectedAirport={selectedAirport}
            isSpy={true}
            map={map}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            border: 1,
            boxShadow: 3,
            maxHeight: "91vh",
            marginTop: "1rem",
            paddingRight: "0.3rem",
            paddingBottom: "0.3rem",
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
          {agents.map((agent, idx) => (
            <Flights
              key={`agent${idx}`}
              state={agent}
              selectedAirport={selectedAirport}
              isSpy={false}
              map={map}
              agentNum={idx}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameComponent;
