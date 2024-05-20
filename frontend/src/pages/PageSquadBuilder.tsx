import {Paper, TextField} from "@mui/material";

const PageSquadBuilder = () => {

    return (
        <Paper elevation={2}
               sx={{
                   p: 2,
                   display: 'flex',
                   flexDirection: 'column',
                   height: 'auto',
               }}
        >
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Paper>
    );
};

export default PageSquadBuilder;