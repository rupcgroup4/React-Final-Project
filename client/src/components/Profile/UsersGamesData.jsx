import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  gameId: number,
  date: Date,
  playAs: bool, //0=spy, 1=agents
  opponent: string,
  win: bool,
  totalSteps: Number,
) {
  return { gameId, date, playAs, opponent, win, totalSteps };
}

export default function BasicTable({gameData}) {

    let rows = []
    if (gameData) { 
      for (let i = 0; i < gameData.length; i++) {
        rows.push(createData(
          gameData[i].gameId,
          gameData[i].date,
          gameData[i].playAs,
          gameData[i].opponent,
          gameData[i].win,
          gameData[i].totalSteps))
      }
    }

  return (
    <TableContainer component={Paper} sx={{width: '75%',  mx:'12.5%'}}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{fontWeight:'Bold'}}>Game</TableCell>
            <TableCell align="right" sx={{fontWeight:'Bold'}}>Date</TableCell>
            <TableCell align="right" sx={{fontWeight:'Bold'}}>Play As</TableCell>
            <TableCell align="right" sx={{fontWeight:'Bold'}}>Opponent</TableCell>
            <TableCell align="right" sx={{fontWeight:'Bold'}}>Win</TableCell>
            <TableCell align="right" sx={{fontWeight:'Bold'}}>Total Steps</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.gameId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.gameId}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.playAs ? "Spy" : "Agents"}</TableCell>
              <TableCell align="right">{row.opponent}</TableCell>
              <TableCell align="right">{row.win ? "Yes" : "No"}</TableCell>
              <TableCell align="right">{row.totalSteps}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}