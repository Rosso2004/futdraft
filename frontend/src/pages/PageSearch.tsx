import { Paper } from "@mui/material";
import CmpSearchTable from "../components/search/CmpSearchTable.tsx";

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
            <CmpSearchTable/>
        </Paper>
    );
};

export default PageSearch;