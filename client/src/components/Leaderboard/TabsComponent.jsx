import * as React from 'react';
import { Box, Tab, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableComponent from './TableComponent';

export default function TabsComponent(props) {
  const [value, setValue] = React.useState('Global');

  const handleChange = (event, newValue) => {
    props.setType(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography
        variant='h2'
        textAlign={'center'}
        mt={3}
        mb={3}
        style={{
          fontFamily: '"Caveat", "cursive"',
        }}
      >
        Leaderboard
      </Typography>
      <TabContext value={value} style={{ display: 'none' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <TabList onChange={handleChange}>
            <Tab label='Global' value='Global' />
            <Tab label='Spy' value='Spy' />
            <Tab label='Agents' value='Agents' />
          </TabList>
        </Box>
        <TabPanel value='Global'>
          <TableComponent leaderBoard={props.leaderBoard} />
        </TabPanel>
        <TabPanel value='Spy'>
          <TableComponent leaderBoard={props.leaderBoard} />
        </TabPanel>
        <TabPanel value='Agents'>
          <TableComponent leaderBoard={props.leaderBoard} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
