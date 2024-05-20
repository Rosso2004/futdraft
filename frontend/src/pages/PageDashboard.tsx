import { Paper } from "@mui/material";

const PageDashboard = () => {

    return (
        <Paper elevation={2}
               sx={{
                   p: 2,
                   display: 'flex',
                   flexDirection: 'column',
                   height: 'auto',
               }}
        >
            DASHBOARD<br/>
            Work in progress...
        </Paper>
    );
};

export default PageDashboard;