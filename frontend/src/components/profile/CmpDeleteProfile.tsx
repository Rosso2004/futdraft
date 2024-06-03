import {Box, Button, Modal, Paper} from "@mui/material";
import React from "react";
import {Check, Close, Warning} from "@mui/icons-material";
import axios from "axios";
import {toast} from "react-toastify";
import {IUser} from "../../interfaces/IUser.ts";
import {useNavigate} from "react-router-dom";
import {useGlobalState} from "../../global/GlobalStateContext.tsx";

interface ICmpDeleteProfile {
    open: boolean;
    onClose: () => void;
    data: IUser;
}

const CmpDeleteProfile: React.FC<ICmpDeleteProfile> = (props) => {
    const { open, onClose, data } = props;
    const navigate = useNavigate();
    const { setIsVerified } = useGlobalState();

    const handleDelete = async () => {
        axios
            .delete(import.meta.env.VITE_URL_WEB_API + '/api/user/deleteUser/' + data.id, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    toast.success(response.data.message);
                    onClose();
                    navigate('/')
                    setIsVerified(false)
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
                       width: 650,
                       p: 1,
                   }}
            >
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Warning sx={{color:'#fbbf24', fontSize:'75px'}}/>
                    <p style={{textAlign:'center', fontSize:'20px'}}>Tutte le informazioni e i team salvati sul tuo account andranno persi.<br/>Sei sicuro di voler rimuovere il tuo utente?</p>
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

export default CmpDeleteProfile;