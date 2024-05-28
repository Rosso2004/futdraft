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
import {Typography, TableSortLabel, TablePagination, TextField, Grid} from "@mui/material";
import { useEffect } from "react";
import {inputStyle} from "../../styles/CmpStyle.tsx";
import CmpProgress from "../progress/CmpProgress.tsx";
import {ITeam} from "../../interfaces/ITeam.ts";
import {IPlayer} from "../../interfaces/IPlayer.ts";

interface HeadCell {
    id: keyof ITeam;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'name', label: 'Nome Team' },
    { id: 'price', label: 'Prezzo' },
];

function Row(props: { row: ITeam; index: number }) {
    const { row, index } = props;
    const [open, setOpen] = React.useState(false);
    console.log(row)
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
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>€ {row.price.toLocaleString('it-IT')}</TableCell>
            </TableRow>
            {/*<TableRow>*/}
            {/*    <TableCell colSpan={8} sx={{backgroundColor: index % 2 === 0 ? '#ffffff' : '#fbfbfb', py: 0, borderBottom: !open ? 'none' : undefined, }}>*/}
            {/*        <Collapse in={open} timeout="auto" unmountOnExit>*/}
            {/*            <Box sx={{ margin: 1 }}>*/}
            {/*                <Typography variant="h6" gutterBottom component="div">*/}
            {/*                    Dettagli*/}
            {/*                </Typography>*/}

            {/*                <Grid container columnSpacing={2}>*/}
            {/*                    {row.photo_url && (*/}
            {/*                        <Grid item xs={3}>*/}
            {/*                            <Paper elevation={2}>*/}
            {/*                                <img style={{ width: '100%', height: 'auto' }} src={row.photo_url} alt={row.lastname + ' ' + row.firstname}></img>*/}
            {/*                            </Paper>*/}
            {/*                        </Grid>*/}
            {/*                    )}*/}
            {/*                    <Grid item xs={row.photo_url ? 9 : 12}>*/}
            {/*                        <Grid container rowSpacing={2} columnSpacing={2}>*/}
            {/*                            {row.average_clean_sheet && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Cleansheet:*/}
            {/*                                    <CmpProgress value={row.average_clean_sheet} maxValue={1}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_save && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Parate:*/}
            {/*                                    <CmpProgress value={row.average_save} maxValue={7}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_goals_conceded && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Goal Subiti:*/}
            {/*                                    <CmpProgress value={row.average_goals_conceded} maxValue={5}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_contrasts_won && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Contrasti Vinti:*/}
            {/*                                    <CmpProgress value={row.average_contrasts_won} maxValue={5}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_advances && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Anticipi:*/}
            {/*                                    <CmpProgress value={row.average_advances} maxValue={4}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.avarage_yellow_season && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Gialli Stagionali:*/}
            {/*                                    <CmpProgress value={row.avarage_yellow_season} maxValue={1}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_passing_accuracy && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Precisione Passaggi:*/}
            {/*                                    <CmpProgress value={row.average_passing_accuracy} maxValue={1}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_balls_recovered && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Palle Recuperate:*/}
            {/*                                    <CmpProgress value={row.average_balls_recovered} maxValue={10}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_assist && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Assist:*/}
            {/*                                    <CmpProgress value={row.average_assist} maxValue={2}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_goal && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Goal:*/}
            {/*                                    <CmpProgress value={row.average_goal} maxValue={2}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_dribbling && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Dribbling:*/}
            {/*                                    <CmpProgress value={row.average_dribbling} maxValue={4}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                            {row.average_shots_on_goal && (*/}
            {/*                                <Grid item xs={row.photo_url ? 6 : 4}>*/}
            {/*                                    Media Tiri in Porta:*/}
            {/*                                    <CmpProgress value={row.average_shots_on_goal} maxValue={5}/>*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}

            {/*                            {row.career_goal && (*/}
            {/*                                <Grid item xs={12}>*/}
            {/*                                    Goal durante la carriera: {row.career_goal}*/}
            {/*                                </Grid>*/}
            {/*                            )}*/}
            {/*                        </Grid>*/}
            {/*                    </Grid>*/}
            {/*                </Grid>*/}
            {/*            </Box>*/}
            {/*        </Collapse>*/}
            {/*    </TableCell>*/}
            {/*</TableRow>*/}
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedTeams.map((player, index) => (
                        <Row key={player.id} row={player} index={index}/>
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