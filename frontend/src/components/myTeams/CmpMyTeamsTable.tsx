import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Typography, TableSortLabel, TablePagination, TextField, Grid, Fab, Button, InputAdornment} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {inputStyle} from "../../styles/CmpStyle.tsx";
import {ITeam} from "../../interfaces/ITeam.ts";
import {IPlayer} from "../../interfaces/IPlayer.ts";
import {Add, Delete, EuroSymbol} from "@mui/icons-material";
import {IRole} from "../../interfaces/IRole.ts";
import CmpSquadBuilderModal from "../squadBuilder/form/CmpSquadBuilderModal.tsx";
import {toast} from "react-toastify";
import CmpMyTeamsDelete from "./CmpMyTeamsDelete.tsx";

interface HeadCell {
    id: keyof ITeam;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'name', label: 'Nome Team' },
    { id: 'price', label: 'Prezzo' },
];

interface IToSubmit {
    team: (IPlayer | null)[][];
    price: number;
}

function Row(props: { row: ITeam; index: number; fetchPlayers: () => void }) {
    const { row, index, fetchPlayers } = props;
    const [open, setOpen] = React.useState(false);
    const [modalState, setModalState] = useState({ open: false, role: { id: 0, name: '' }, position: { row: 0, col: 0 } });
    const [modalDeleteState, setModalDeleteState] = useState({ open: false});
    const [budget, setBudget] = useState({
        value: 0,
        sales: 0,
        error: {
            value: ''
        }
    });
    // const [budgetError, setBudgetError] = useState<string>('');
    // const [salesMoney, setSalesMoney] = useState<number>(0);

    const module = useMemo(() => {
        return row.team.map((io) => io.length);
    }, [row.team]);

    const [teamData, setTeamData] = useState<IToSubmit>({
        team: row.team,
        price: row.price
    });
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        const hasChanges = JSON.stringify(teamData.team) !== JSON.stringify(row.team);
        setIsModified(hasChanges);
    }, [teamData, row.team]);

    const handleChangeBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBudget((prevData) => ({
            ...prevData,
            value: Number(value)
        }))
    };

    const handleBlurBudget = () => {
        if (budget.value < budget.sales) {
            setBudget((prevData) => ({
                ...prevData,
                error: {
                    value: `Il valore inserito non è corretto. Deve essere maggiore di ${budget.sales.toLocaleString('it-IT')}`
                }
            }))
        } else {
            setBudget((prevData) => ({
                ...prevData,
                error: {
                    value: ''
                }
            }))
        }
    };

    const handleRemovePlayer = (rowIndex: number, colIndex: number) => {
        const playerPrice = teamData.team[rowIndex][colIndex]?.price ?? 0;
        const newPrice = teamData.price - playerPrice;
        const newTeam = teamData.team.map((teamRow, i) =>
            teamRow.map((player, j) => (i === rowIndex && j === colIndex ? null : player))
        );

        setTeamData({
            team: newTeam,
            price: newPrice,
        });

        const hasChanges = JSON.stringify(newTeam) !== JSON.stringify(row.team);
        setIsModified(hasChanges);
        setBudget((prevData) => ({
            ...prevData,
            value: budget.value+playerPrice,
            sales: budget.sales+playerPrice
        }))
    };

    const handlePlayerSelect = (player: IPlayer) => {
        const newPrice = teamData.price + player.price
        if (budget.value-player.price < 0) {
            return toast.error("Devi aggiungere un extra al budget non hai abbastanza soldi disponibili!")
        } else {
            setTeamData(prevState => {
                const newTeam = prevState.team.map(row => [...row]);
                newTeam[modalState.position.row][modalState.position.col] = player;
                return { ...prevState, price: newPrice, team: newTeam };
            });
            setBudget((prevData) => ({
                ...prevData,
                value: budget.value-player.price,
                sales: budget.sales-player.price
            }))
        }
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

    const handleOpen = (role: IRole, rowIndex: number, colIndex: number) => {
        setModalState({ open: true, role, position: { row: rowIndex, col: colIndex } });
    };

    const handleClose = () => setModalState({ open: false, role: { id: 0, name: '' }, position: { row: 0, col: 0 } });
    const handleDeleteClose = () => setModalDeleteState({ open: false});

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
            team: JSON.stringify(teamData.team),
            price: teamData.price
        }

        await axios
            .put(import.meta.env.VITE_URL_WEB_API + '/api/team/updateTeam/' + row.id, toSubmit, { withCredentials: true })
            .then((response)=>{
                if (response.status === 200) {
                    toast.success(response.data.message);
                    fetchPlayers();
                }
            })
            .catch((error) => {
                console.log(error)
            });
    };

    return (
        <React.Fragment>
            <TableRow
                sx={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#fbfbfb',
                    '& > *': {
                        borderBottom: open ? 'none' : undefined,
                    },
                }}
            >
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>€ {row.price.toLocaleString('it-IT')}</TableCell>
                <TableCell align='right'>
                    <IconButton
                        sx={{color:'#DD0000'}}
                        size="small"
                        onClick={() => setModalDeleteState({ open: true})}
                    >
                        <Delete/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={8} sx={{backgroundColor: index % 2 === 0 ? '#ffffff' : '#fbfbfb', py: 0, borderBottom: !open ? 'none' : undefined, }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }} component='form' onSubmit={handleSubmit}>
                            <Grid container spacing={2} mb={4}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Team
                                    </Typography>
                                </Grid>
                                {isModified && (
                                    <Grid item xs={6} display='flex' justifyContent='flex-end'>
                                        <TextField
                                            label="Budget"
                                            value={budget.value}
                                            onChange={handleChangeBudget}
                                            onBlur={handleBlurBudget}
                                            error={!!budget.error.value}
                                            helperText={budget.error.value}
                                            type="number"
                                            margin="none"
                                            size='small'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EuroSymbol />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            inputProps={{
                                                min: budget.sales,
                                            }}
                                            sx={inputStyle}
                                        />
                                    </Grid>
                                )}
                            </Grid>
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
                            {isModified && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box display="flex" justifyContent="flex-end" alignItems='flex-end' mt={1}>
                                            <Box display="flex" alignItems="flex-end" flexDirection='column' mt={1}>
                                                <Typography variant="h6" component="h6" sx={{mr: 4, fontSize: 18}}>
                                                    Nuovo prezzo: € {teamData.price.toLocaleString('it-IT')}
                                                </Typography>
                                                {(teamData.price+budget.value-row.price > 0) && (
                                                    <Typography variant="h6" component="h6" sx={{mr: 4, fontSize: 18}}>
                                                        Aggiunti al Budget: € {(teamData.price+budget.value-row.price).toLocaleString('it-IT')}
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Button type='submit'>Salva</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <CmpSquadBuilderModal
                open={modalState.open}
                onClose={handleClose}
                role={modalState.role}
                onPlayerSelect={handlePlayerSelect}
                selectedPlayers={teamData.team}
            />

            <CmpMyTeamsDelete
                open={modalDeleteState.open}
                onClose={handleDeleteClose}
                data={row}
                fetch={fetchPlayers}
            />
        </React.Fragment>
    );
}

interface ApiResponse {
    id: number;
    name: string;
    team: string;
    price: number;
}

const CmpMyTeamsTable = () => {
    const [teams, setTeams] = React.useState<ITeam[]>([]);
    const [filteredTeams, setFilteredTeams] = React.useState<ITeam[]>([]);
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ITeam>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filters, setFilters] = React.useState<{ [key in keyof ITeam]?: string }>({});

    const fetchPlayers = () => {
        axios.get<ApiResponse[]>(import.meta.env.VITE_URL_WEB_API + '/api/team/getTeam', {withCredentials: true})
            .then(response => {
                const parsedTeams = response.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    team: JSON.parse(item.team) as IPlayer[][],
                    price: item.price
                }));
                setTeams(parsedTeams);
                setFilteredTeams(parsedTeams);
            })
            .catch(error => {
                console.error('Errore nel recupero dei dati:', error);
            });
    }

    useEffect(() => {
        fetchPlayers();
    }, []);

    const handleRequestSort = (property: keyof ITeam) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, property: keyof ITeam) => {
        const {value} = event.target;
        const newFilters = {...filters, [property]: value.toLowerCase()};
        setFilters(newFilters);

        const filtered = teams.filter(team => {
            return Object.keys(newFilters).every((key) => {
                const prop = key as keyof ITeam;
                const filterValue = newFilters[prop];
                if (filterValue) {
                    return team[prop]!.toString().toLowerCase().includes(filterValue);
                }
                return true;
            });
        });
        setFilteredTeams(filtered);
    };

    const sortedTeams = [...filteredTeams].sort((a, b) => {
        if (a == null || b == null) {
            return 0;
        }
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue == null || bValue == null) {
            return 0;
        }
        if (aValue < bValue) {
            return order === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const paginatedTeams = sortedTeams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead sx={{backgroundColor: '#f0f0f0'}}>
                    <TableRow>
                        <TableCell/>
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                sortDirection={orderBy === headCell.id ? order : false}
                                sx={{fontWeight: 'bold', color: 'black', fontSize: '16px'}}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => handleRequestSort(headCell.id)}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                                <TextField
                                    size="small"
                                    margin="none"
                                    variant="standard"
                                    required
                                    fullWidth
                                    placeholder={`Filtra per ${headCell.label}`}
                                    onChange={(e) => {
                                        handleFilterChange(e, headCell.id)
                                    }}
                                    autoFocus
                                    sx={{
                                        ...inputStyle,
                                        '& input': {
                                            fontSize: '0.8rem',
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            fontSize: '0.8rem',
                                        }
                                    }}
                                />
                            </TableCell>
                        ))}
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedTeams.map((player, index) => (
                        <Row key={player.id} row={player} index={index} fetchPlayers={fetchPlayers}/>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredTeams.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Righe per pagina"
                labelDisplayedRows={({from, to, count}) => `${from}-${to} di ${count}`}
            />
        </TableContainer>
    );
}

export default CmpMyTeamsTable;