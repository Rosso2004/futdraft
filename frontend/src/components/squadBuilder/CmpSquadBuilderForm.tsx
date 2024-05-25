import { Grid, InputAdornment, Paper, TextField } from "@mui/material";
import { Email } from "@mui/icons-material";
import { inputStyle } from "../../styles/CmpStyle.tsx";

interface CmpSquadBuilderModuleProps {
    module: number[];
}

const CmpSquadBuilderForm: React.FC<CmpSquadBuilderModuleProps> = (props) => {
    const { module } = props;
    console.log(module);
    return (
        <Paper elevation={2}
               sx={{
                   p: 2,
                   display: 'flex',
                   flexDirection: 'column',
                   height: 'auto',
               }}
        >
            <Grid container spacing={14} justifyContent="center">
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        margin="none"
                        size='small'
                        required
                        value={'s'}
                        label="Email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                        autoFocus
                        sx={inputStyle}
                    />
                </Grid>
                {module.map((item, rowIndex) => (
                    <Grid
                        container
                        item
                        xs={12}
                        justifyContent="center"
                        key={rowIndex}
                    >
                        {Array.from({ length: item }).map((_, colIndex) => (
                            <Grid item key={colIndex} xs={12/item} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <TextField
                                    margin="none"
                                    size='small'
                                    required
                                    value={12/item}
                                    label="Email"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }}
                                    autoFocus
                                    sx={inputStyle}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default CmpSquadBuilderForm;
