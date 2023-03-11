import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(
  type: string,
  totalgames: number,
  winrate: number,
  totalsteps: number
) {
  return {
    type,
    totalgames,
    winrate,
    totalsteps,
    history: [
      {
        playerRank: 1,
        playerName: "Moshe",
        playerWinrate: 6,
        playerTotalgames: 15,
        playerTotalsteps: 321,
      },
      {
        playerRank: 2,
        playerName: "Moshe",
        playerWinrate: 6,
        playerTotalgames: 15,
        playerTotalsteps: 321,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <Typography variant="h6" gutterBottom>
            {row.type}
          </Typography>
        </TableCell>
        <TableCell align="center">{row.totalgames}</TableCell>
        <TableCell align="center">{row.winrate}</TableCell>
        <TableCell align="center">{row.totalsteps}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h6" gutterBottom>
                        Rank
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" gutterBottom>
                        Player Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" gutterBottom>
                        Total Games
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" gutterBottom>
                        Win %
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" gutterBottom>
                        Total Steps
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.rank}>
                      <TableCell align="center">
                        {historyRow.playerRank}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.playerName}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.playerWinrate}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.playerTotalgames}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.playerTotalsteps}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Global", 159, 6.0, 24, 4.0, 3.99),
  createData("Spy", 237, 9.0, 37, 4.3, 4.99),
  createData("Agent", 262, 16.0, 24, 6.0, 3.79),
];
const style = {
  maxWidth: "70rem",
  margin: "auto",
  marginTop: "8rem",
};
export default function LeaderBoard() {
  return (
    <div style={style}>
      <div
        style={{
          textAlign: "center",
          marginTop: "-4rem",
          paddingBottom: "2rem",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Leaderboard
        </Typography>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell></TableCell>

              <TableCell align="center">
                <Typography variant="h6" gutterBottom>
                  Total Games
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" gutterBottom>
                  Win %
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" gutterBottom>
                  Total Steps
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
