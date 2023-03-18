import React, { useState } from "react";
import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow }  from "@mui/material";

function createData(
  rank,
  playerName,
  totalGames,
  winRate,
  totalSteps,
) {
  return { rank, playerName, totalGames, winRate, totalSteps };
}
export default function TableComponent(props) {

  let rows = []
  if (props.leaderBoard) { 
    for (let i = 0; i < props.leaderBoard.length; i++) {
      rows.push(createData(
        props.leaderBoard[i].Rank,
        props.leaderBoard[i].PlayerName,
        props.leaderBoard[i].TotalGames,
        props.leaderBoard[i].WinRate,
        props.leaderBoard[i].TotalSteps))
      
    }
    console.log(rows);
  }


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "60%", overflow: "hidden", margin: "auto" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>
              Rank
            </TableCell>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>
              Player Name
            </TableCell>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>
              Total Games
            </TableCell>
            <TableCell align='center' sx={{ fontWeight: 'Bold' }}>
              Win %
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
            >
              <TableCell align='center'>
                {row.rank}
              </TableCell>
              <TableCell align='center'>
                {row.playerName}
              </TableCell>
              <TableCell align='center'>
                {row.totalGames}
              </TableCell>
              <TableCell align='center'>
                {row.winRate}
              </TableCell>
              <TableCell align='center'>
                {row.totalSteps}
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
