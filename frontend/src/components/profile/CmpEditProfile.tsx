import {
    Avatar, Button,
    FormControl, FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {IUser} from "../../interfaces/IUser.ts";
import {Email, Lock, TextFields, Visibility, VisibilityOff} from "@mui/icons-material";
import {inputStyle} from "../../styles/CmpStyle.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

interface ICmpEditProfile {
    data: IUser
}

interface IUpdateData {
    id: number | null,
    lastname: string,
    firstname: string,
    email: string;
    password: string;
    error: {
        email: string;
        password: string;
    }
}

const CmpEditProfile: React.FC<ICmpEditProfile> = (props) => {
    const {data} = props;
    const [updateData, setUpdateData] = useState<IUpdateData>({
        id: null,
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        error: {
            email: '',
            password: '',
        }
    });
    const [showPassword, setShowPassword] =useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        setUpdateData((prevData) => ({
            ...prevData,
            id: data.id,
            lastname: data.lastname,
            firstname: data.firstname,
            email: data.email
        }))
    }, [data.email, data.firstname, data.id, data.lastname]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const toSubmit = {
            lastname: updateData.lastname,
            firstname: updateData.firstname,
            email: updateData.email,
            password: updateData.password
        }
        await axios
            .put(import.meta.env.VITE_URL_WEB_API + '/api/user/updateUser/'+updateData.id, toSubmit, { withCredentials: true })
            .then((response)=>{
                toast.success(response.data.message)
                if (response.status === 200) {
                    setUpdateData((prevData) => ({
                        ...prevData,
                        password: '',
                        error: {
                            email: '',
                            password: '',
                        }
                    }))
                }
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    setUpdateData((prevData) => ({
                        ...prevData,
                        error: {
                            email: error.response.data,
                            password: ''
                        }
                    }));
                    console.log(error)
                } else if (error.response.status === 401) {
                    setUpdateData((prevData) => ({
                        ...prevData,
                        error: {
                            email: '',
                            password: error.response.data
                        }
                    }));
                }
                console.log(error)
            });
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'center'}}>
                <Avatar sx={{ width: 250, height: 250, margin: 'auto' }}>
                    {updateData.firstname[0]}
                </Avatar>
            </Grid>

            <Grid item xs={12} sm={8} component='form' onSubmit={handleSubmit}>
                <TextField
                    size="small"
                    margin="dense"
                    required
                    fullWidth
                    label="Cognome"
                    value={updateData.lastname}
                    onChange={(e) => {
                        setUpdateData((prevData) => ({
                            ...prevData,
                            lastname: e.target.value
                        }))
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TextFields />
                            </InputAdornment>
                        ),
                    }}
                    autoFocus
                    sx={inputStyle}
                />
                <TextField
                    size="small"
                    margin="dense"
                    required
                    fullWidth
                    label="Nome"
                    value={updateData.firstname}
                    onChange={(e) => {
                        setUpdateData((prevData) => ({
                            ...prevData,
                            firstname: e.target.value
                        }))
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TextFields />
                            </InputAdornment>
                        ),
                    }}
                    autoFocus
                    sx={inputStyle}
                />
                <TextField
                    size="small"
                    margin="dense"
                    required
                    fullWidth
                    label="Email"
                    error={!!updateData.error.email}
                    helperText={updateData.error.email}
                    value={updateData.email}
                    onChange={(e) => {
                        setUpdateData((prevData) => ({
                            ...prevData,
                            email: e.target.value
                        }))
                    }}
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
                <FormControl sx={inputStyle} variant="outlined" margin="dense" required fullWidth size="small" error={!!updateData.error.password}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        startAdornment={
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"

                        value={updateData.password}
                        onChange={(e) => {
                            setUpdateData((prevData) => ({
                                ...prevData,
                                password: e.target.value
                            }))
                        }}
                    />
                    <FormHelperText>{updateData.error.password}</FormHelperText>
                </FormControl>
                <Button type="submit" fullWidth variant="contained" sx={{
                    mt: 3,
                    mb: 2,
                    background: '#b60000ED',
                    color: 'white',
                    '&:hover': {
                        background: '#b60000',
                    },
                }}>Salva</Button>
            </Grid>
        </Grid>
    );
};

export default CmpEditProfile;