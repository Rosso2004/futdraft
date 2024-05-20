import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton, Button, Link,
} from "@mui/material";
import {Lock, Email, Visibility, VisibilityOff, TextFields} from "@mui/icons-material";
import {inputStyle} from "../styles/CmpStyle.tsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

interface ILoginData {
    lastname: string,
    firstname: string,
    email: string;
    password: string;
    error: {
        email: string;
    }
}

const PageLogin = () => {
    const navigate = useNavigate();

    const [loginData, setSignInData] = useState<ILoginData>({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        error: {
            email: '',
        }
    });
    const [showPassword, setShowPassword] =useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const toSubmit = {
            lastname: loginData.lastname,
            firstname: loginData.firstname,
            email: loginData.email,
            password: loginData.password
        }

        await axios
            .post(import.meta.env.VITE_URL_WEB_API + '/api/user/createUser', toSubmit)
            .then((response)=>{
                if (response.status === 200) {
                    toast.success(response.data.message);
                    navigate('/')
                }
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    setSignInData((prevData) => ({
                        ...prevData,
                        error: {
                            email: error.response.data,
                        }
                    }));
                }
            });
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h3" sx={{
                    color: '#bb0000',
                    fontWeight: 700,
                    textAlign: 'center',
                }}>Registrazione</Typography>

                <Box component="form" noValidate sx={{ mt: 1 }} display="flex" flexDirection="column" alignItems="center" onSubmit={handleSubmit}>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        label="Cognome"
                        value={loginData.lastname}
                        onChange={(e) => {
                            setSignInData((prevData) => ({
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
                        margin="dense"
                        required
                        fullWidth
                        label="Nome"
                        value={loginData.firstname}
                        onChange={(e) => {
                            setSignInData((prevData) => ({
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
                        margin="dense"
                        required
                        fullWidth
                        label="Email"
                        error={!!loginData.error.email}
                        helperText={loginData.error.email}
                        value={loginData.email}
                        onChange={(e) => {
                            setSignInData((prevData) => ({
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
                    <FormControl sx={inputStyle} variant="outlined" margin="dense" required fullWidth>
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
                                setSignInData((prevData) => ({
                                    ...prevData,
                                    password: e.target.value
                                }))
                            }}
                        />
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" sx={{
                        mt: 3,
                        mb: 2,
                        background: '#b60000ED',
                        color: 'white',
                        '&:hover': {
                            background: '#b60000',
                        },
                    }}>Registrati</Button>
                    <Typography>Sei già registrato? <Link sx={{cursor: 'pointer'}} onClick={() => navigate('/')}>Accedi</Link></Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default PageLogin;