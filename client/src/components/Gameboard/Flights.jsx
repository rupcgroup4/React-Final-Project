import React, { useEffect, useState } from 'react';
import { graph } from '../../file';
import { shortest_path } from '../../classes/utils/shortestPath';
import {
  Box,
  List,
  ListItemText,
  Divider,
  ListItemButton,
  Typography,
} from '@mui/material';
import Path from './Path';

//This component show the flight that departure from the selected air port on the map
const Flights = ({
  state,
  isSpy,
  targetPosition,
  turn,
  spyMove,
  agentMove,
  agentNum,
  spyLocation,
}) => {
  const role = isSpy ? 'spy' : `agent ${agentNum + 1}`;
  //departure flights from current selected airport on the map
  const [flights, setFlights] = useState();

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
    if (isSpy && turn === role) {
      spyMove(location);
    } else if (turn === role) {
      agentMove(location, agentNum);
    }
  };

  //this useEffect used to updated the fligts when the currentId is changed (selected airPort)
  useEffect(() => {
    const flights = graph[state?.id]?.destinations;
    setFlights(flights);
  }, [state?.id]);

  return (
    <Box
      border={1}
      sx={{
        width: '90%',
        boxShadow: 2,
        borderRadius: '16px',
        margin: 'auto',
      }}
    >
      <Box
        pl={2}
        sx={{
          bgcolor: state?.color,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        color={'white'}
      >
        <Typography
          variant='h6'
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            textTransform: 'capitalize',
          }}
        >
          {role}
        </Typography>
        <Typography mt={0} variant='h6' sx={{ fontFamily: 'monospace' }}>
          Position: {graph[state?.id]?.name}
        </Typography>
      </Box>
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
        >
          {flights?.map((flight, idx) => (
            <Box key={idx}>
              <ListItemButton onClick={() => movePlayer(flight)}>
                <ListItemText primary={graph[flight].name} />
              </ListItemButton>
              {/* {Last flight without divider} */}
              {idx === Object.keys(graph).length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Box>

      <Path path={path} />
    </Box>
  );
};

export default Flights;
