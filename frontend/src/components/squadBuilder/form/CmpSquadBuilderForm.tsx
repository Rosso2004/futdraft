import {Box, Button, Fab, Grid, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {Add, Delete, People, Save} from '@mui/icons-material';
import React, {useEffect, useState} from "react";
import CmpSquadBuilderModal from "./CmpSquadBuilderModal.tsx";
import { IRole } from "../../../interfaces/IRole.ts";
import { IPlayer } from "../../../interfaces/IPlayer.ts";
import {inputStyle} from "../../../styles/CmpStyle.tsx";
import axios from "axios";
import {toast} from "react-toastify";

interface ICmpSquadBuilderModuleProps {
    module: number[];
    budget: number;
}

interface IToSubmit {
    name: string;
    team: (IPlayer | null)[][];
    price: number;
    error: {
        name: string;
    }
}

const CmpSquadBuilderForm: React.FC<ICmpSquadBuilderModuleProps> = (props) => {
    const { module, budget } = props;
    const [modalState, setModalState] = useState({ open: false, role: { id: 0, name: '' }, position: { row: 0, col: 0 } });
    const [teamData, setTeamData] = useState<IToSubmit>({
        name: '',
        team: module.map(row => Array(row).fill(null)),
        price: 0,
        error: {
            name: ''
        }
    });

    useEffect(() => {
        setTeamData((prevData) => ({
            ...prevData,
            team: module.map(row => Array(row).fill(null)),
        }));
    }, [module]);

    const handleOpen = (role: IRole, rowIndex: number, colIndex: number) => {
        setModalState({ open: true, role, position: { row: rowIndex, col: colIndex } });
    };

    const handleClose = () => setModalState({ open: false, role: { id: 0, name: '' }, position: { row: 0, col: 0 } });

    const handlePlayerSelect = (player: IPlayer) => {
        const newPrice = teamData.price + player.price
        setTeamData(prevState => {
            const newTeam = prevState.team.map(row => [...row]);
            newTeam[modalState.position.row][modalState.position.col] = player;
            return { ...prevState, price: newPrice, team: newTeam };
        });
    };

    const handleFabClick = (rowIndex: number, colIndex: number) => {
        const roles5 = [{ id: 4, name: 'Attaccante' }, { id: 3, name: 'Centrocampista' }, { id: 3, name: 'Centrocampista' }, { id: 2, name: 'Difensore' }, { id: 1, name: 'Portiere' }];
        const roles4 = [{ id: 4, name: 'Attaccante' }, { id: 3, name: 'Centrocampista' }, { id: 2, name: 'Difensore' }, { id: 1, name: 'Portiere' }];
        let role = { id: 0, name: '' };

        if (module.length === 5) {
            role = roles5[rowIndex];
        } else if (module.length === 4) {
            role = roles4[rowIndex];
        }

        handleOpen(role, rowIndex, colIndex);
    };

    const handleRemovePlayer = (rowIndex: number, colIndex: number) => {
        const playerPrice = teamData.team[rowIndex][colIndex]?.price ?? 0;
        const newPrice = teamData.price - playerPrice;
        setTeamData(prevState => {
            const newTeam = [...prevState.team];
            newTeam[rowIndex][colIndex] = null;
            return { ...prevState, price: newPrice, team: newTeam };
        });
    };

    const handleSubmit = async() => {
        for (const row of teamData.team) {
            for (const player of row) {
                if (player === null) {
                    toast.error('Assicurati che siano stati inseriti dei giocatori in tutte le posizioni');
                    return;
                }
            }
        }

        const toSubmit = {
            name: teamData.name,
            team: JSON.stringify(teamData.team),
            price: teamData.price
        }

        await axios
            .post(import.meta.env.VITE_URL_WEB_API + '/api/team/createTeam', toSubmit, { withCredentials: true })
            .then((response)=>{
                if (response.status === 200) {
                    toast.success(response.data.message);
                    setTeamData({
                        name: '',
                        team: module.map(row => Array(row).fill(null)),
                        price: 0,
                        error: {
                            name: ''
                        }
                    })
                }
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    setTeamData((prevData) => ({
                        ...prevData,
                        error: {
                            name: error.response.data,
                        }
                    }));
                }
            });
    };

    return (
        <Paper elevation={2}
               component='form'
               sx={{
                   p: 2,
                   display: 'flex',
                   flexDirection: 'column',
                   height: 'auto',
               }}
               onSubmit={handleSubmit}
        >
            <Grid container spacing={10} justifyContent="center" sx={{mb: 5}}>
                {module.map((item, rowIndex) => (
                    <Grid
                        container
                        item
                        xs={12}
                        justifyContent="center"
                        key={rowIndex}
                    >
                        {Array.from({ length: item }).map((_, colIndex) => (
                            <Grid item key={colIndex} xs={12 / item} sx={{ display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                                {teamData.team[rowIndex] && teamData.team[rowIndex][colIndex] ? (
                                    <Paper elevation={1} sx={{display:'flex', flexDirection:'column' }}>
                                        <img
                                            src={teamData.team[rowIndex][colIndex]?.photo_url || undefined}
                                            style={{ width: '150px', height: 'auto' }}
                                        />
                                        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', justifyItems:'center', px: 1}}>
                                            {`${teamData.team[rowIndex][colIndex]?.firstname} ${teamData.team[rowIndex][colIndex]?.lastname}`}
                                            <IconButton onClick={() => handleRemovePlayer(rowIndex, colIndex)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Paper>
                                ) : (
                                    <Fab onClick={() => handleFabClick(rowIndex, colIndex)}>
                                        <Add />
                                    </Fab>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="none"
                        required
                        fullWidth
                        size='small'
                        label="Nome Team"
                        value={teamData.name}
                        error={!!teamData.error.name}
                        helperText={teamData.error.name}
                        onChange={(e) => setTeamData(prevState => ({ ...prevState, name: e.target.value }))}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <People />
                                </InputAdornment>
                            ),
                        }}
                        autoFocus
                        sx={inputStyle}
                    />

                    <Box display="flex" justifyContent="space-between" alignItems='center' mt={1}>
                        <Typography variant="h6" component="h6" sx={(teamData.price > budget && budget !== 0) ? {color: '#BB0000', fontWeight: 'bold'} : {color: '#008800', fontWeight: 'bold'}}>
                            € {teamData.price.toLocaleString('it-IT')}
                        </Typography>
                        <Button
                            type='submit'
                            color='info'
                            variant='contained'
                            startIcon={<Save/>}
                        >
                            Salva
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <CmpSquadBuilderModal
                open={modalState.open}
                onClose={handleClose}
                role={modalState.role}
                onPlayerSelect={handlePlayerSelect}
                selectedPlayers={teamData.team}
            />
        </Paper>
    );
};

export default CmpSquadBuilderForm;
