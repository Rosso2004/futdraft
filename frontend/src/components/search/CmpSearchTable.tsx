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
import { IPlayer } from '../../interfaces/IPlayer';
import {Typography, TableSortLabel, TablePagination, TextField} from "@mui/material";
import { useEffect } from "react";
import {inputStyle} from "../../styles/CmpStyle.tsx";

interface HeadCell {
    id: keyof IPlayer;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'lastname', label: 'Cognome' },
    { id: 'firstname', label: 'Nome' },
    { id: 'age', label: 'Età' },
    { id: 'height', label: 'Altezza' },
    { id: 'weight', label: 'Peso' },
    { id: 'role', label: 'Ruolo' },
    { id: 'price', label: 'Prezzo' },
];

function Row(props: { row: IPlayer; index: number }) {
    const { row, index } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#fbfbfb', // Cambio del colore di sfondo per righe alternative
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
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.firstname}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.height}</TableCell>
                <TableCell>{row.weight}</TableCell>
                <TableCell>{row.role.name}</TableCell>
                <TableCell>{row.price}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8} sx={{backgroundColor: index % 2 === 0 ? '#ffffff' : '#fbfbfb' }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Dettagli
                            </Typography>
                            {/* Aggiungi qui ulteriori dettagli dell'utente */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CmpSearchTable() {
    const [players, setPlayers] = React.useState<IPlayer[]>([]);
    const [filteredPlayers, setFilteredPlayers] = React.useState<IPlayer[]>([]);
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IPlayer>('lastname');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        axios.get<IPlayer[]>(import.meta.env.VITE_URL_WEB_API + '/api/player/getAllPlayer', { withCredentials: true })
            .then(response => {
                setPlayers(response.data);
                setFilteredPlayers(response.data); // Inizializza i dati filtrati con i dati completi
            })
            .catch(error => {
                console.error('Errore nel recupero dei dati:', error);
            });
    }, []);
    console.log(players)

    const handleRequestSort = (property: keyof IPlayer) => {
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

    const handleFilterChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, property: keyof IPlayer) => {
        const { value } = event.target;
        const filtered = players.filter(player =>
            player && player[property] && player[property]!.toString().toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPlayers(filtered);
    };

    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
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

    const paginatedPlayers = sortedPlayers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                        <TableCell />
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                sortDirection={orderBy === headCell.id ? order : false}
                                sx={{ fontWeight: 'bold', color: 'black', fontSize: '16px' }}
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
                                    onChange={(e) => handleFilterChange(e, headCell.id)}
                                    autoFocus
                                    sx={{
                                        ...inputStyle,
                                        '& input': {
                                            fontSize: '0.8rem',
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            fontSize: '0.8rem',
                                        },
                                    }}
                                />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedPlayers.map((player, index) => (
                        <Row key={player.id} row={player} index={index} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredPlayers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Righe per pagina"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} di ${count}`}
            />
        </TableContainer>
    );
}