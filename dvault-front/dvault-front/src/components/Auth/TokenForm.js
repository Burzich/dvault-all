import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { apiVerifyToken } from '../../services/api';

const TokenForm = ({ onLogin }) => {
    const [token, setToken] = useState('');
    const [error, setError] = useState(null);
    const [showToken, setShowToken] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (apiVerifyToken(token)) {
            onLogin({ token: token, user: 'tokenUser' });
        } else {
            setError('Invalid token');
        }
    };

    const handleClickShowToken = () => {
        setShowToken((prev) => !prev);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Token"
                type={showToken ? 'text' : 'password'}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowToken} edge="end">
                                {showToken ? <VisibilityOff /> : <Visibility />}
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

export default TokenForm;
