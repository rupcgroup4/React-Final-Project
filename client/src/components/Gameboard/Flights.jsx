import React, { useEffect, useState } from 'react';
import { graph } from '../../file';
import { shortest_path } from '../../classes/utils/shortestPath';

import {
  Box,
  List,
  ListItemText,
  Divider,
  ListItemButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  FormGroup,
  Switch,
  FormControlLabel,
} from '@mui/material';
import Path from './Path';

//This component show the flight that departure from the selected air port on the map
const Flights = ({
  state,
  selectedAirport,
  isSpy,
  map,
  targetPosition,
  agentNum,
  spyLocation,
  isAgent1Show = null,
  setIsAgent1Show = null,
}) => {
  //departure flights from current selected airport on the map
  const [flights, setFlights] = useState();
  //departure flights from current selected airport on the map
  const [selectedAirportflights, setSelectedAirportFlights] = useState();
  //
  const [path, setPath] = useState([]);

  const calculatePath = (location) => {
    const ids = Object.keys(graph);
    const choosedIndex = ids.indexOf(location);
    let targetIndex;
    if (isSpy) {
      targetIndex = ids.indexOf(targetPosition);
    } else {
      targetIndex = ids.indexOf(spyLocation);
    }

    const path = shortest_path(choosedIndex, targetIndex, graph);

    const namePath = path.map((idx) => {
      return graph[ids[idx]].name;
    });

    setPath(namePath);
  };

  const movePlayer = (location) => {
    if (isSpy) {
      map.setPlane(`${state.id} ${location}`);
    } else {
      map.placeOpponentPlane(`${state.id} ${location}`, agentNum);
    }
  };

  const changeAgent = () => {
    setIsAgent1Show(isAgent1Show ? false : true);
  };

  //this useEffect used to updated the fligts when the currentId is change (selected airPort)
  useEffect(() => {
    const flights = graph[state.id]?.destinations;
    //console.log("state.id= ", graph[state.id]);
    // const flights = graph.edges.filter((flight) => flight.from === state.id);
    setFlights(flights);
  }, [state.id]);

  //this useEffect used to updated the fligts when the currentId is change (selected airPort)
  useEffect(() => {
    // const flights = graph.edges.filter(
    //   (flight) => flight.from === selectedAirport
    // );
    const flights = graph[selectedAirport]?.destinations;
    setSelectedAirportFlights(flights);
  }, [selectedAirport]);

  // useEffect(() => {
  //   const AirportNames = graph.map((airport) => (
  //     console.log(airport)
  //   ));

  // }, []);

  return (
    <Box
      border={1}
      sx={{
        width: '90%',
        boxShadow: 2,
        borderRadius: '16px',
        margin: 'auto',
        marginTop: '10px',
      }}
    >
      {!isSpy && (
        <FormGroup>
          <Box
            display={'flex'}
            alignItems={'center'}
            mb={-10}
            justifyContent={'flex-end'}
            zIndex={1}
          >
            <Typography ml={5} mr={3}>
              1
            </Typography>
            <FormControlLabel
              control={
                <Switch onChange={changeAgent} checked={!isAgent1Show} />
              }
            />
            <Typography mr={5}>2</Typography>
          </Box>
        </FormGroup>
      )}
      <AppBar
        position='static'
        sx={{ bgcolor: state.color, borderRadius: '16px' }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box>
              <Typography
                variant='h6'
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,

                  color: `white`,
                }}
              >
                {isSpy ? 'Spy' : `Agent ${agentNum + 1}`} - Position:
              </Typography>
              <Typography
                mt={0}
                variant='h7'
                component='h3'
                sx={{ fontFamily: 'monospace' }}
              >
                {`${state.id} - `}
                {graph[state.id]?.name}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          borderRadius: '16px',
          fontFamily: 'monospace',
          fontWeight: 700,
        }}
      >
        <Typography
          variant='h7'
          component='h3'
          sx={{ margin: '0.5rem 0 0.5rem 1.5rem' }}
        >
          Possible Flights: {flights?.length}
        </Typography>
        <Divider />
        <List
          sx={{
            width: '100%',
            maxHeight: 220,
            overflow: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
          component='nav'
        >
          {flights?.map((flight, idx) => (
            <div key={idx}>
              <ListItemButton onClick={() => calculatePath(flight)}>
                <ListItemText primary={graph[flight].name} />
              </ListItemButton>
              {/* {Last flight without divider} */}
              {graph[Object.keys(graph)[Object.keys(graph).length - 1]] ===
              graph[flight] ? (
                <Divider />
              ) : (
                ''
              )}
            </div>
          ))}
        </List>
      </Box>
      {/* <h5>Selected Airport flights</h5>
      {selectedAirportflights?.map((flight, idx) => (
        <div key={idx}>
          <p>
            from {selectedAirport} to {flight}
          </p>
        </div>
      ))} */}
      <Path path={path} />
    </Box>
  );
};

export default Flights;
