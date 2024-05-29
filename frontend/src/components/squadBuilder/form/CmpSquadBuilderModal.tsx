import {
    Modal,
    Paper,
    Typography,
    FormControl,
    Button,
    Autocomplete, TextField, InputAdornment
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IPlayer } from "../../../interfaces/IPlayer.ts";
import { IRole } from "../../../interfaces/IRole.ts";
import {inputStyle} from "../../../styles/CmpStyle.tsx";
import {PersonAdd} from "@mui/icons-material";

interface ICmpSquadBuilderModal {
    open: boolean;
    onClose: () => void;
    role: IRole;
    onPlayerSelect: (player: IPlayer) => void;
    selectedPlayers: (IPlayer | null)[][];
}

const CmpSquadBuilderModal: React.FC<ICmpSquadBuilderModal> = (props) => {
    const { open, onClose, role, onPlayerSelect, selectedPlayers } = props;
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

    useEffect(() => {
        if (open) {
            axios.get<IPlayer[]>(import.meta.env.VITE_URL_WEB_API + '/api/player/getAllPlayer', { withCredentials: true })
                .then(response => {
                    const filteredPlayers = response.data.filter(player => player.role.id === role.id);
                    setPlayers(filteredPlayers);
                    setPlayers(filteredPlayers.filter(player => {
                        return !selectedPlayers.flat().some(selectedPlayer => selectedPlayer?.id === player.id);
                    }));
                })
                .catch(error => {
                    console.error('Errore nel recupero dei dati:', error);
                });
        }
    }, [open, role.id, selectedPlayers]);

    const handlePlayerChange = (_event: React.SyntheticEvent<Element, Event>, newValue: IPlayer | null) => {
        setSelectedPlayer(newValue);
    };

    const handlePlayerSelect = () => {
        if (selectedPlayer) {
            onPlayerSelect(selectedPlayer);
            onClose();
            setSelectedPlayer(null);
        }
    };

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
                       p: 2,
                   }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    Seleziona {role.name}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    Numero di giocatori disponibili: {players.length}
                </Typography>
                <FormControl fullWidth sx={{ ...inputStyle, mt: 2 }}>
                    <Autocomplete
                        options={players}
                        size='small'
                        getOptionLabel={(player) => `${player.lastname} ${player.firstname} - € ${player.price.toLocaleString('it-IT')}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Giocatore"
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonAdd />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        value={selectedPlayer}
                        onChange={handlePlayerChange}

                        isOptionEqualToValue={(option, value) => option.id === value.id}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePlayerSelect}
                    sx={{ mt: 2 }}
                >
                    Seleziona
                </Button>
            </Paper>
        </Modal>
    );
};

export default CmpSquadBuilderModal;
