import * as React from "react";
import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow }  from "@mui/material";


interface Column {
  id: "rank" | "playerName" | "totalGames" | "winRate" | "totalSteps";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: "rank",
    label: "Rank",
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "playerName",
    label: "Player Name",
    align: "center",
  },
  {
    id: "totalGames",
    label: "Total Games",

    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "winRate",
    label: "Win %",
    align: "center",
    format: (value: number) => value.toLocaleString("en-US")  + "%",
  },
  {
    id: "totalSteps",
    label: "Total Steps",
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  rank: number;
  playerName: string;
  totalGames: number;
  winRate: number;
  density: number;
}

function createData(
  rank: number,
  playerName: string,
  totalGames: number,
  winRate: number,
  totalSteps: number
): Data {
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
  }


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "60%", overflow: "hidden", margin: "auto" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                    
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
