import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            onLogin({ token: 'dummy-token', user: 'admin' });
        } else {
            setError('Invalid login or password');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
            />
            <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{ my: 1 }}
            >
                Sign in
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </form>
    );
};

export default LoginForm;
