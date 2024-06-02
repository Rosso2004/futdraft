import {
    Modal,
    Paper,
    Typography,
    FormControl,
    Button,
    Autocomplete, TextField, InputAdornment, Switch,
    FormGroup, FormControlLabel
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
    const [checkedStatistics, setCheckedStatistics] = React.useState<boolean>(false);

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
            setCheckedStatistics(false);
        }
    }, [open, role.id, selectedPlayers]);

    const handlePlayerChange = (_event: React.SyntheticEvent<Element, Event>, newValue: IPlayer | null) => {
        setSelectedPlayer(newValue);
    };

    const handlePlayerSelect = () => {
        if (selectedPlayer) {
            onPlayerSelect(selectedPlayer);
            onClose();
            setCheckedStatistics(false);
            setSelectedPlayer(null);
        }
    };

    const getVisibleFields = (players: IPlayer[]): (keyof IPlayer)[] => {
        const numericFields: (keyof IPlayer)[] = [
            'average_clean_sheet',
            'average_save',
            'average_goals_conceded',
            'average_contrasts_won',
            'average_advances',
            'avarage_yellow_season',
            'average_passing_accuracy',
            'average_balls_recovered',
            'average_assist',
            'average_goal',
            'average_dribbling',
            'average_shots_on_goal'
        ];

        return numericFields.filter(field => players.some(player => player[field] !== null));
    };

    const fieldProperties: { [key in keyof IPlayer]?: { label: string, adornment: React.ReactNode } } = {
        average_clean_sheet: { label: 'Clean Sheets', adornment: <PersonAdd /> },
        average_save: { label: 'Saves', adornment: <PersonAdd /> },
        average_goals_conceded: { label: 'Goals Conceded', adornment: <PersonAdd /> },
        average_contrasts_won: { label: 'Contrasts Won', adornment: <PersonAdd /> },
        average_advances: { label: 'Advances', adornment: <PersonAdd /> },
        avarage_yellow_season: { label: 'Yellow Cards', adornment: <PersonAdd /> },
        average_passing_accuracy: { label: 'Passing Accuracy', adornment: <PersonAdd /> },
        average_balls_recovered: { label: 'Balls Recovered', adornment: <PersonAdd /> },
        average_assist: { label: 'Assists', adornment: <PersonAdd /> },
        average_goal: { label: 'Average Goals', adornment: <PersonAdd /> },
        average_dribbling: { label: 'Dribbling', adornment: <PersonAdd /> },
        average_shots_on_goal: { label: 'Shots on Goal', adornment: <PersonAdd /> },
    };

    const visibleFields = getVisibleFields(players);

    const maxValues: { [key in keyof IPlayer]?: number } = {
        average_clean_sheet: 1,
        average_save: 7,
        average_goals_conceded: 5,
        average_contrasts_won: 5,
        average_advances: 4,
        avarage_yellow_season: 1,
        average_passing_accuracy: 1,
        average_balls_recovered: 10,
        average_assist: 2,
        average_goal: 2,
        average_dribbling: 4,
        average_shots_on_goal: 5,
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

                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checkedStatistics}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCheckedStatistics(event.target.checked)}
                            />
                        }
                        label="Filtra per statistiche" />
                </FormGroup>
                {checkedStatistics && (
                    <>
                        {visibleFields.map((field, index) => (
                            <TextField
                                key={index}
                                label={fieldProperties[field]?.label}
                                type="number"
                                fullWidth
                                margin="none"
                                size='small'
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: { min: 0, max: 100 },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {fieldProperties[field]?.adornment}
                                        </InputAdornment>
                                    )
                                }}
                                sx={inputStyle}
                            />
                        ))}
                    </>
                )}
                <Typography id="modal-description">
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
