import {
    Modal,
    Paper,
    Typography,
    FormControl,
    Button,
    Autocomplete, TextField, InputAdornment, Switch,
    FormGroup, FormControlLabel, Grid
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
    const [filteredPlayers, setFilteredPlayers] = useState<IPlayer[]>([]);
    const [filterValues, setFilterValues] = useState<{ [key in keyof IPlayer]?: number }>({
        average_clean_sheet: 0,
        average_save: 0,
        average_goals_conceded: 0,
        average_contrasts_won: 0,
        average_advances: 0,
        average_passing_accuracy: 0,
        average_balls_recovered: 0,
        average_assist: 0,
        average_goal: 0,
        average_dribbling: 0,
        average_shots_on_goal: 0,
    });

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

    useEffect(() => {
        const maxValues: { [key in keyof IPlayer]?: number } = {
            average_clean_sheet: 1,
            average_save: 7,
            average_goals_conceded: 5,
            average_contrasts_won: 5,
            average_advances: 4,
            average_passing_accuracy: 1,
            average_balls_recovered: 10,
            average_assist: 2,
            average_goal: 2,
            average_dribbling: 4,
            average_shots_on_goal: 5,
        };

        if (checkedStatistics) {
            setFilteredPlayers(
                players.filter(player => {
                    return Object.entries(filterValues).every(([key, value]) => {
                        const field = key as keyof IPlayer;
                        const max = maxValues[field] ?? 1;
                        const playerValue = typeof player[field] === 'number' ? (player[field] as number) / max * 100 : 0;
                        return playerValue >= value!;
                    });
                })
            );
        } else {
            setFilteredPlayers(players);
        }
    }, [players, filterValues, checkedStatistics]);

    const handleFilterChange = (field: keyof IPlayer) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setFilterValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePlayerChange = (_event: React.SyntheticEvent<Element, Event>, newValue: IPlayer | null) => {
        setSelectedPlayer(newValue);
    };

    const handleBlur = (field: keyof IPlayer) => () => {
        setFilterValues(prev => {
            const value = prev[field] ?? 0;
            if (value < 0 || value > 100) {
                return {
                    ...prev,
                    [field]: value < 0 ? 0 : 100
                };
            }
            return prev;
        });
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
        average_clean_sheet: { label: 'Media Cleansheet ≥', adornment: <PersonAdd /> },
        average_save: { label: 'Media Parate ≥', adornment: <PersonAdd /> },
        average_goals_conceded: { label: 'Media Goal Subiti ≥', adornment: <PersonAdd /> },
        average_contrasts_won: { label: 'Media Contrasti Vinti ≥', adornment: <PersonAdd /> },
        average_advances: { label: 'Media Anticipi ≥', adornment: <PersonAdd /> },
        average_passing_accuracy: { label: 'Media Precisione Passaggi ≥', adornment: <PersonAdd /> },
        average_balls_recovered: { label: 'Media Palle Recuperate ≥', adornment: <PersonAdd /> },
        average_assist: { label: 'Media Assist ≥', adornment: <PersonAdd /> },
        average_goal: { label: 'Media Goal ≥', adornment: <PersonAdd /> },
        average_dribbling: { label: 'Media Dribbling ≥', adornment: <PersonAdd /> },
        average_shots_on_goal: { label: 'Media Tiri in Porta ≥', adornment: <PersonAdd /> },
    };

    const visibleFields = getVisibleFields(players);


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
                       width: 550,
                       p: 2,
                   }}
            >
                <Typography sx={{fontWeight:'bold'}} variant="h6" component="h2" mb={1}>
                    Seleziona {role.name}
                </Typography>

                <Grid container spacing={2} alignItems="center" mb={checkedStatistics ? 1 : 0}>
                    <Grid item xs={6}>
                        Filtra per statistiche
                    </Grid>
                    <Grid item xs={6}>
                        <Switch
                            checked={checkedStatistics}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCheckedStatistics(event.target.checked)}
                        />
                    </Grid>
                </Grid>
                {checkedStatistics && (
                    <Grid container spacing={2} mb={checkedStatistics ? 2 : 0}>
                        {visibleFields.map((field, index) => (
                            <Grid item xs={6}>
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
                                    onChange={handleFilterChange(field)}
                                    value={filterValues[field] ?? ''}
                                    onBlur={handleBlur(field)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                <Typography>
                    Numero di giocatori disponibili: {filteredPlayers.length}
                </Typography>
                <FormControl fullWidth sx={{ ...inputStyle, mt: 1 }}>
                    <Autocomplete
                        options={filteredPlayers}
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
