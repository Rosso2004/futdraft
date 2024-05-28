import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    OutlinedInput,
    Paper,
    TextField, Grid, InputAdornment
} from "@mui/material";
import { inputStyle } from "../../styles/CmpStyle.tsx";
import {EuroSymbol, Tune} from "@mui/icons-material";
import React from "react";

interface CmpSquadBuilderModuleProps {
    module: number[];
    setModule: (module: number[]) => void;
    budget: number;
    setBudget: (budget: number) => void;
}

const CmpSquadBuilderModule: React.FC<CmpSquadBuilderModuleProps> = (props) => {
    const {module, setModule, budget, setBudget} = props;

    const handleChangeModule = (event: SelectChangeEvent<string>) => {
        const value = JSON.parse(event.target.value) as number[];
        setModule(value);
    };

    const handleChangeBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBudget(Number(value));
    };

    const menuItems = [
        { label: '4-3-3', value: [3, 3, 4, 1] },
        { label: '4-4-2', value: [2, 4, 4, 1] },
        { label: '3-5-2', value: [2, 5, 3, 1] },
        { label: '3-4-1-2', value: [2, 1, 4, 3, 1] },
        { label: '4-5-1', value: [1, 5, 4, 1] },
        { label: '4-2-3-1', value: [1, 3, 2, 4] },
    ];

    return (
        <Paper elevation={2}
               sx={{
                   p: 2,
                   display: 'flex',
                   flexDirection: 'column',
                   height: 'auto',
               }}
        >
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={inputStyle} size='small'>
                        <InputLabel>Modulo</InputLabel>
                        <Select
                            value={module.length ? JSON.stringify(module) : ''}
                            onChange={handleChangeModule}
                            input={<OutlinedInput startAdornment={<InputAdornment position="start"><Tune/></InputAdornment>} label="Modulo" />}
                            renderValue={(selected) => {
                                const selectedModule = JSON.parse(selected) as number[];
                                selectedModule.splice(-1)
                                return selectedModule.reverse().join('-');
                            }}
                        >
                            {menuItems.map((item) => (
                                <MenuItem key={item.label} value={JSON.stringify(item.value)}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Budget (0 = nessun budget)"
                        value={budget}
                        onChange={handleChangeBudget}
                        type="number"
                        fullWidth
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
                            min: 0,
                        }}
                        sx={inputStyle}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CmpSquadBuilderModule;
