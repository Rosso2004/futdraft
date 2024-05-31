import {Box, Button, Modal, Paper} from "@mui/material";
import React from "react";
import {Check, Close, Warning} from "@mui/icons-material";
import {ITeam} from "../../interfaces/ITeam.ts";
import axios from "axios";
import {toast} from "react-toastify";

interface ICmpMyTeamsDelete {
    open: boolean;
    onClose: () => void;
    data: ITeam;
    fetch: () => void;
}

const CmpMyTeamsDelete: React.FC<ICmpMyTeamsDelete> = (props) => {
    const { open, onClose, data, fetch } = props;
    console.log(data)


    const handleDelete = async () => {
        axios
            .delete(import.meta.env.VITE_URL_WEB_API + '/api/team/deleteTeam/' + data.id, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    onClose();
                    toast.warning(response.data.message);
                    fetch();
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

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
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Warning sx={{color:'#fbbf24', fontSize:'75px'}}/>
                    <p style={{textAlign:'center', fontSize:'20px'}}>Sei sicuro di voler rimuovere {data.name}?<br/>L'azione sarà irreversibile!</p>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2}}>
                        <Button variant="contained" startIcon={<Close/>} color='error' onClick={onClose}>
                            Annulla
                        </Button>
                        <Button variant="contained" startIcon={<Check/>} color='success' onClick={() => handleDelete()}>
                            Conferma
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
};

export default CmpMyTeamsDelete;