import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, OutlinedInput, Paper } from "@mui/material";
import { inputStyle } from "../../styles/CmpStyle.tsx";

interface CmpSquadBuilderModuleProps {
    module: number[];
    setModule: (module: number[]) => void;
}

const CmpSquadBuilderModule: React.FC<CmpSquadBuilderModuleProps> = (props) => {
    const {module, setModule} = props;

    const handleChange = (event: SelectChangeEvent<string>) => {
        const value = JSON.parse(event.target.value) as number[];
        setModule(value);
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
            <FormControl fullWidth sx={inputStyle}>
                <InputLabel>Modulo</InputLabel>
                <Select
                    value={module.length ? JSON.stringify(module) : ''}
                    onChange={handleChange}
                    input={<OutlinedInput label="Modulo" />}
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
        </Paper>
    );
};

export default CmpSquadBuilderModule;
