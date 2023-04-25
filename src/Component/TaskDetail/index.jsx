import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Style from './index.module.css'


const style = {
  textalign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const { task, description, status ,id ,handledelete , handleSave} = props.task
  const [open, setOpen] = useState(true);
  const [taskDetails,setTaskdetails] = useState({
    id:id,
    task:task,
    description:description,
    status: status,
  })
  const handleClose = () => setOpen(false);


  const handleStatuschange = (event) => {
    setTaskdetails(prevState => ({
      ...prevState,
      status: event.target.checked,
  }));
  }

  const handleDelete=()=>{
     props.handledelete(taskDetails.id)
   handleClose()
  }

  const handleSaveData=()=>{
    props.handleSave(taskDetails)
   handleClose()
  }

  return (

    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h3" sx={{ textAlign: 'center' }}>
            Task Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='content'>
              <h2>Task Name</h2>
              <p>{taskDetails.task}</p>
              <h2>Task Description</h2>
              <p>{taskDetails.description}</p>
              <FormControlLabel
              label='Change Status'
              control={
                <Checkbox
                checked={taskDetails.status}
                onChange={handleStatuschange}
                />
              }
            />
            <div className='taskTable'>
                <Button variant="contained"  onClick={handleSaveData}  >Save</Button>
                <Button variant="outlined" onClick={handleDelete} >Delete</Button>
            </div>
            </div>
            
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

BasicModal.prototype={
  id : PropTypes.string,
  task: PropTypes.string	,
  description: PropTypes.string	,
  status: PropTypes.bool,
  handledelete: PropTypes.func,
  handleSave: PropTypes.func,
} 