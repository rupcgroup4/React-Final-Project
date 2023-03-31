import { forwardRef } from 'react';
import PlayerCard from './PlayerCard';
import FlightIcon from '@mui/icons-material/Flight';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Slide,
} from '@mui/material';
import usePlayersStore from '../../store/playerStore';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const playerTypes = ['spy', 'agents'];

const ChoosePlayerModal = ({ open, setOpen, setIsPlayer2LoginModal }) => {
  const { updatePlayersRole } = usePlayersStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const choosePlayer = (index) => {
    handleClose();
    updatePlayersRole(playerTypes[index], playerTypes[index === 0 ? 1 : 0]);
    setIsPlayer2LoginModal(true);
  };

  return (
    <div>
      <Button
        variant='contained'
        size='large'
        fullWidth={true}
        endIcon={<FlightIcon />}
        onClick={handleClickOpen}
        style={{ height: '4rem' }}
      >
        <Typography variant='h6'>Play Game</Typography>
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
              onClick={() => choosePlayer(0)}
              sx={{ cursor: 'pointer' }}
              m={2}
            >
              <PlayerCard title={'Spy'} />
            </Box>
            <Box
              onClick={() => choosePlayer(1)}
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
