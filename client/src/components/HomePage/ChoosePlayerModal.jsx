import { forwardRef, useContext } from 'react';
import PlayerCard from './PlayerCard';
import { PlayersContext } from '../../context/PlayersContextProvider';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Slide,
} from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ChoosePlayerModal = ({ open, setOpen, setIsPlayer2LoginModal }) => {
  const { players, updatePlayers } = useContext(PlayersContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const choosePlayer = (playerType) => {
    handleClose();
    const newPlayers = structuredClone(players);
    newPlayers.player1.role = playerType;
    updatePlayers(newPlayers);
    setIsPlayer2LoginModal(true);
  };

  return (
    <div>
      <Button
        variant='outlined'
        size='large'
        fullWidth={true}
        endIcon={<SendIcon />}
        onClick={handleClickOpen}
      >
        <Typography variant='h6'>Play</Typography>
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mx={2}
        >
          <Typography variant='h5'>Choose side in the battle</Typography>
          <Button onClick={handleClose}>
            <CloseIcon fontSize='large' />
          </Button>
        </Box>

        <DialogContent>
          <Box display={'flex'}>
            <Box
              onClick={() => choosePlayer('spy')}
              sx={{ cursor: 'pointer' }}
              m={2}
            >
              <PlayerCard title={'Spy'} />
            </Box>
            <Box
              onClick={() => choosePlayer('agent')}
              sx={{ cursor: 'pointer' }}
              m={2}
            >
              <PlayerCard title={'Agents'} />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChoosePlayerModal;
