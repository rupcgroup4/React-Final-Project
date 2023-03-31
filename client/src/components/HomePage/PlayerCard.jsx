import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import spyImg from '../../img/Spy.png';
import agentsImg from '../../img/Agents.png';

const PlayerCard = ({ title }) => {
  return (
    <Box>
      <Card sx={{ maxWidth: 345, minWidth: 200 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={title === 'Spy' ? spyImg : agentsImg}
          title={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            textAlign={'center'}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlayerCard;
