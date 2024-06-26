import {Grid} from "@mui/material";
import  CmpSquadBuilderModule from "../components/squadBuilder/CmpSquadBuilderModule.tsx";
import CmpSquadBuilderForm from "../components/squadBuilder/form/CmpSquadBuilderForm.tsx";
import {useState} from "react";

const PageSquadBuilder = () => {
    const [selectedModule, setSelectedModule] = useState<number[]>([]);
    const [budget, setBudget] = useState<number>(0);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <CmpSquadBuilderModule module={selectedModule} setModule={setSelectedModule} budget={budget} setBudget={setBudget} />
            </Grid>
            {(selectedModule.length !== 0) && (
                <Grid item xs={12} md={12}>
                    <CmpSquadBuilderForm module={selectedModule} budget={budget}/>
                </Grid>
            )}
        </Grid>
    );
};

export default PageSquadBuilder;