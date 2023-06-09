import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleSignIn from '../components/Google-SignIn/GoogleSignIn';
import {
  Container,
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import usePlayersStore from '../store/playerStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { player1Login } = usePlayersStore();
  const [alert, setAlert] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    const res = await axios
      .post(`${API_URL}/players`, {
        email,
        password,
      })
      .catch((e) => {
        createAlert(e.response.data);
      });

    const user = res.data;
    player1Login(user);
    navigate('/');
  };

  const createAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert();
    }, 1500);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Box m={'auto'}>
            <GoogleSignIn position={1} />
          </Box>
          {alert && (
            <Box mt={3}>
              <Alert severity='error'>{alert}</Alert>
            </Box>
          )}

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item>
              <Link
                to='/signup'
                variant='body2'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
