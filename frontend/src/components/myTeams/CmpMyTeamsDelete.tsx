import {Modal, Paper} from "@mui/material";
import React from "react";

interface ICmpMyTeamsDelete {
    open: boolean;
    onClose: () => void;
}

const CmpMyTeamsDelete: React.FC<ICmpMyTeamsDelete> = (props) => {
    const { open, onClose } = props;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Paper elevation={3}
                   sx={{
                       position: 'absolute',
                       top: '50%',
                       left: '50%',
                       transform: 'translate(-50%, -50%)',
                       width: 450,
                       p: 1,
                   }}
            >
            <p style={{textAlign:'center'}}>Sei sicuro di voler rimuovere questo team?<br/>L'azione sarà irreversibile!</p>
            </Paper>
        </Modal>
    );
};

export default CmpMyTeamsDelete;