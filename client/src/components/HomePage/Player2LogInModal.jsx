import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import usePlayersStore from '../../store/playerStore';
import GoogleSignIn from '../Google-SignIn/GoogleSignIn';
import { API_URL } from '../../utils/constants';

const Player2LogInModal = ({ open, setOpen }) => {
  const [first, setFirst] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { player2Login } = usePlayersStore();

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const login = async (e) => {
    e.preventDefault();

    const res = await axios
      .post(`${API_URL}/players`, {
        email,
        password,
      })
      .catch((e) => {
        alert(e.response.data);
      });

    const user = res.data;
    player2Login(user);
    handleClose();
  };

  useEffect(() => {
    if (!open && !first) {
      navigate('/gameboard');
    } else {
      setFirst(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  console.log(open);
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Player 2 - Guest. Do you want to login?</DialogTitle>
        <DialogContent>
          <Box component={'form'} onSubmit={login}>
            <TextField
              autoFocus
              margin='dense'
              id='email'
              label='Email Address'
              type='email'
              fullWidth
              variant='standard'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              autoFocus
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              variant='standard'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Box>
              <GoogleSignIn position={2} handleClose={handleClose} />
            </Box>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type='submit'>Login</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Player2LogInModal;
