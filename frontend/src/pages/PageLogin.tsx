import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton, Button, FormHelperText
} from "@mui/material";
import { Person, Visibility, VisibilityOff} from "@mui/icons-material";
import {inputStyle} from "../styles/CmpStyle.tsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useGlobalState} from "../global/GlobalStateContext.tsx";

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
            .post(import.meta.env.VITE_URL_WEB_API + '/api/customer/verifyCustomer', toSubmit, { withCredentials: true })
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
                }}>Futdraft</Typography>

                <Box component="form" noValidate sx={{ mt: 1 }} display="flex" flexDirection="column" alignItems="center" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
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
                                    <Person />
                                </InputAdornment>
                            ),
                        }}
                        autoFocus
                        sx={inputStyle}
                    />
                    <FormControl sx={inputStyle} variant="outlined" margin="normal" required fullWidth error={!!loginData.error.password}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
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
                        background: '#b60000ED',
                        color: 'white',
                        '&:hover': {
                            background: '#b60000',
                        },
                    }}>Log In</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default PageLogin;