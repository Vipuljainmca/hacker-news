import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserData, login } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box
} from '@mui/material';
import Navbar from './Navbar';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        setError('');
        try {
            const result = await dispatch(fetchUserData(username));
            console.log(result);
            
            if (result.error) {
                setError("User Does not exist");
            } else {
                dispatch(login({ username })); 
                navigate('/');
            }
        } catch (err) {
            console.log(err || 'Login failed. Please try again.');
        }
    };


    return (
        <>
            <Navbar />
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh'
                }}
            >
                <Paper elevation={3}>
                    <Box sx={{ padding: 3 }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Login
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                        {error && (
                            <Typography color="error" variant="body2" align="center">
                                {error}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default Login;   