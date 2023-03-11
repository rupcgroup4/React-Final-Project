import React from "react";
import { Box, Modal, Typography,IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function GameOverModalComponent(props) {
  //MODAL


  

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
  };

  // const [openModal, setOpenModal] = useState(false);
  // const handleOpenModal = () => setOpenModal(true);
  // const handleCloseModal = () => setOpenModal(false);

  
  // useEffect(() => {
  //   if (props.gameStatus && props.gameStatus.openModal)
  //     handleOpenModal();
      
  // }, [props.gameStatus]);
  


  return (
    <div>
      <Modal
        open={props.open===true}
        onClose={props.onClose}
        
        keepMounted
        // open={openModal}
        // onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
         
        <Box sx={ModalStyle}>

        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
          <Typography id="keep-mounted-modal-title" variant="h6" style={{fontWeight: 'bold'}}>
            Game Over - Spy {props.gameStatus? props.gameStatus.status: ""}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2}}>
            {props.gameStatus? props.gameStatus.text: ""}
          </Typography>
        </Box>
  
      </Modal>
            
    </div>
  );
}
