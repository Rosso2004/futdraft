import {
    Avatar, Button,
    FormControl,
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
    }, [data.email, data.firstname, data.lastname]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'center'}}>
                <Avatar sx={{ width: 250, height: 250, margin: 'auto' }}>
                    {updateData.firstname[0]}
                </Avatar>
                {updateData.id}
            </Grid>

            <Grid item xs={12} sm={8}>
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
                <FormControl sx={inputStyle} variant="outlined" margin="dense" required fullWidth size="small">
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