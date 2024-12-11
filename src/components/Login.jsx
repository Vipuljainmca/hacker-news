import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    Tabs,
    Tab
} from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../constants/firebase'; // Ensure you initialize Firebase in this file
import Navbar from './Navbar';
import { setUser } from '../redux/slices/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [tab, setTab] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleLogin = async () => {
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
            const token = await userCredential.user.getIdToken();
            dispatch(setUser({
                name: userCredential.user.displayName || '',
                email: userCredential.user.email,
                token,
            }));
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignup = async () => {
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const token = await userCredential.user.getIdToken();
            dispatch(setUser({
                name: form.name,
                email: userCredential.user.email,
                token,
            }));
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            dispatch(setUser({
                name: result.user.displayName,
                email: result.user.email,
                token,
            }));
            navigate('/');
        } catch (err) {
            setError(err.message);
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
                    minHeight: '80vh',
                }}
            >
                <Paper elevation={3}>
                    <Box sx={{ padding: 3 }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            {tab === 0 ? 'Login' : 'Sign Up'}
                        </Typography>
                        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
                            <Tab label="Login" />
                            <Tab label="Sign Up" />
                        </Tabs>

                        {tab === 1 && (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Name"
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                            />
                        )}

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                        />

                        {error && (
                            <Typography color="error" variant="body2" align="center">
                                {error}
                            </Typography>
                        )}

                        {tab === 0 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleLogin}
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSignup}
                                sx={{ mt: 2 }}
                            >
                                Sign Up
                            </Button>
                        )}

                        <Typography align="center" sx={{ mt: 2 }}>
                            or
                        </Typography>

                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleGoogleLogin}
                            sx={{ mt: 2 }}
                        >
                            Continue with Google
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default Login;
