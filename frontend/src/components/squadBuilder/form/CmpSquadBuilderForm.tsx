import {Box, Button, Fab, Grid, IconButton, Paper} from "@mui/material";
import {Add, Delete} from '@mui/icons-material';
import React, {useEffect, useState} from "react";
import CmpSquadBuilderModal from "./CmpSquadBuilderModal.tsx";
import { IRole } from "../../../interfaces/IRole.ts";
import { IPlayer } from "../../../interfaces/IPlayer.ts";

interface CmpSquadBuilderModuleProps {
    module: number[];
}

const CmpSquadBuilderForm: React.FC<CmpSquadBuilderModuleProps> = (props) => {
    const { module } = props;
    const [modalState, setModalState] = useState({ open: false, role: { id: 0, name: '' }, position: { row: 0, col: 0 } });
    const [selectedPlayers, setSelectedPlayers] = useState<(IPlayer | null)[][]>(module.map(row => Array(row).fill(null)));

    useEffect(() => {
        setSelectedPlayers(module.map(row => Array(row).fill(null)));
    }, [module]);

    const handleOpen = (role: IRole, rowIndex: number, colIndex: number) => {
        setModalState({ open: true, role, position: { row: rowIndex, col: colIndex } });
    };

    const handleClose = () => setModalState({ open: false, role: { id: 0, name: '' }, position: { row: 0, col: 0 } });

    const handlePlayerSelect = (player: IPlayer) => {
        setSelectedPlayers(prevState => {
            const newState = prevState.map(row => [...row]);
            newState[modalState.position.row][modalState.position.col] = player;
            return newState;
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
        setSelectedPlayers(prevState => {
            const newState = [...prevState];
            newState[rowIndex][colIndex] = null;
            return newState;
        });
    };

    return (
        <Paper elevation={2}
               sx={{
                   p: 2,
                   display: 'flex',
                   flexDirection: 'column',
                   height: 'auto',
               }}
        >
            <Grid container spacing={10} justifyContent="center">
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
                                {selectedPlayers[rowIndex] && selectedPlayers[rowIndex][colIndex] ? (
                                    <Paper elevation={1} sx={{display:'flex', flexDirection:'column' }}>
                                        <img
                                            src={selectedPlayers[rowIndex][colIndex]?.photo_url || undefined}
                                            style={{ width: '150px', height: 'auto' }}
                                        />
                                        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', justifyItems:'center', px: 1}}>
                                            {`${selectedPlayers[rowIndex][colIndex]?.firstname} ${selectedPlayers[rowIndex][colIndex]?.lastname}`}
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
            <Button sx={{my: 5}} onClick={() => console.log((selectedPlayers))}>Salva</Button>

            <CmpSquadBuilderModal
                open={modalState.open}
                onClose={handleClose}
                role={modalState.role}
                onPlayerSelect={handlePlayerSelect}
                selectedPlayers={selectedPlayers}
            />
        </Paper>
    );
};

export default CmpSquadBuilderForm;