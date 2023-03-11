import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const PlayerCard = ({ title }) => {
  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={`/${title}.png`} title={title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlayerCard;
