import { Paper, useMediaQuery } from "@mui/material";
import CmpEditProfile from "../components/profile/CmpEditProfile.tsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser.ts";
import {useTheme} from "@mui/material/styles";

const PageProfile = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [userData, setUserData] = useState<IUser>({
        id: 0,
        lastname: '',
        firstname: '',
        email: ''
    });

    const fetchUser = () => {
        axios.get(import.meta.env.VITE_URL_WEB_API + '/api/user/getUser', { withCredentials: true })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                toast.error(error.response.message);
            });
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            {!isMobile && (
                <Paper elevation={2}
                       sx={{
                           p: 5,
                           display: 'flex',
                           flexDirection: 'column',
                           height: 'auto',
                       }}
                >
                    <CmpEditProfile data={userData} />
                </Paper>
            )}
            {isMobile && <CmpEditProfile data={userData} />}
        </>
    );
};

export default PageProfile;
