import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function UsersTotalGameStats({ wins, totalGames }) {
  const per = ((wins / totalGames) * 100).toFixed(2);
  return (
    <TableContainer sx={{ width: '44%', mx: '28%', mb: '5px' }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Games Played: {totalGames}</TableCell>
            <TableCell>
              <FontAwesomeIcon icon={faTrophy} color='yellow' />
              Games Won: {wins}
            </TableCell>
            <TableCell>Win% : {per}%</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
