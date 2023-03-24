import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  gameId,
  date,
  playAs, //0=spy, 1=agents
  opponent,
  win,
  totalSteps
) {
  return { gameId, date, playAs, opponent, win, totalSteps };
}

export default function BasicTable({ gameData }) {
  let rows = [];
  if (gameData) {
    for (let i = 0; i < gameData.length; i++) {
      rows.push(
        createData(
          i+1,
          gameData[i].date,
          gameData[i].playAs,
          gameData[i].opponent,
          gameData[i].win,
          gameData[i].totalSteps
        )
      );
    }
  }

  return (
    <TableContainer component={Paper} sx={{ width: '75%', mx: '12.5%' }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>Game</TableCell>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>
              Date
            </TableCell>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>
              Play As
            </TableCell>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>
              Opponent
            </TableCell>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>
              Win
            </TableCell>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>
              Total Steps
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' component='th' scope='row'>
                {row.gameId}
              </TableCell>
              <TableCell align='center'>{row.date}</TableCell>
              <TableCell align='center'>
                {row.playAs ? 'Spy' : 'Agents'}
              </TableCell>
              <TableCell align='center'>{row.opponent}</TableCell>
              <TableCell align='center'>{row.win ? 'Yes' : 'No'}</TableCell>
              <TableCell align='center'>{row.totalSteps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
