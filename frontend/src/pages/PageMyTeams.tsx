import { Paper } from "@mui/material";
import CmpMyTeamsTable from "../components/myTeams/CmpMyTeamsTable.tsx";

const PageSearch = () => {

    return (
        <Paper elevation={2}
               sx={{
                   p: 2,
                   display: 'flex',
                   flexDirection: 'column',
                   height: 'auto',
               }}
        >
            <CmpMyTeamsTable/>
        </Paper>
    );
};

export default PageSearch;