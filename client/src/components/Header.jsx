import React from 'react';
import { Typography } from '@mui/material';

const Header = ({ header }) => {
  return (
    <Typography
      variant='h2'
      textAlign={'center'}
      style={{
        fontFamily: '"Caveat", "cursive"',
      }}
    >
      {header}
    </Typography>
  );
};

export default Header;
