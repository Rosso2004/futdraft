import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton, Button, FormHelperText, Link, Paper
} from "@mui/material";
import {Lock, Email, Visibility, VisibilityOff} from "@mui/icons-material";
import {inputStyle} from "../styles/CmpStyle.tsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useGlobalState} from "../global/GlobalStateContext.tsx";
import * as React from "react";

interface ILoginData {
    email: string;
    password: string;
    error: {
        email: string;
        password: string;
    }
}

const PageLogin = () => {
    const navigate = useNavigate();
    const { setIsVerified } = useGlobalState();

    const [loginData, setLoginData] = useState<ILoginData>({
        email: '',
        password: '',
        error: {
            email: '',
            password: '',
        }
    });
    const [showPassword, setShowPassword] =useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const toSubmit = {
            email: loginData.email,
            password: loginData.password
        }
        await axios
            .post(import.meta.env.VITE_URL_WEB_API + '/api/user/verifyUser', toSubmit, { withCredentials: true })
            .then((response)=>{
                if (response.status === 200) {
                    setIsVerified(true)
                    navigate('/search')
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setLoginData((prevData) => ({
                        ...prevData,
                        error: {
                            email: error.response.data,
                            password: ''
                        }
                    }));
                    console.log(error)
                } else if (error.response.status === 401) {
                    setLoginData((prevData) => ({
                        ...prevData,
                        error: {
                            email: '',
                            password: error.response.data
                        }
                    }));
                }
            });
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={2} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                py: 2,
                px: 4
            }}>
                <Typography component="h1" variant="h3" sx={{
                    color: '#bb0000',
                    fontWeight: 700,
                    fontSize: '2rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection:'column'
                }}>
                    <img src='https://imgur.com/Q0leBft.png' width='200px' alt='Logo'/>
                </Typography>


                <Box component="form" noValidate sx={{mt: 1}} display="flex" flexDirection="column" alignItems="center" onSubmit={handleSubmit}>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        label="Email"
                        error={!!loginData.error.email}
                        helperText={loginData.error.email}
                        value={loginData.email}
                        onChange={(e) => {
                            setLoginData((prevData) => ({
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
                    <FormControl sx={inputStyle} variant="outlined" margin="dense" required fullWidth error={!!loginData.error.password}>
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

                            value={loginData.password}
                            onChange={(e) => {
                                setLoginData((prevData) => ({
                                    ...prevData,
                                    password: e.target.value
                                }))
                            }}
                        />
                        <FormHelperText>{loginData.error.password}</FormHelperText>
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" sx={{
                        mt: 3,
                        mb: 2,
                        background: '#e1ff57ED',
                        color: 'black',
                        fontWeight: 700,
                        '&:hover': {
                            background: '#e1ff57',
                        },
                    }}>Accedi</Button>
                    <Typography>Non sei registrato? <Link sx={{cursor: 'pointer'}} onClick={() => navigate('/signin')}>Registrati</Link></Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default PageLogin;