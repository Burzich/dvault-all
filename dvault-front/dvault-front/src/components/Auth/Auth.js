import React, { useState } from 'react';
import { Box, Grid2, Typography, Select, MenuItem } from '@mui/material';
import LoginForm from './LoginForm';
import TokenForm from './TokenForm';

const Auth = ({ onLogin }) => {
    const [authMethod, setAuthMethod] = useState('token');

    const handleLogin = (data) => {
        onLogin(data);
    };

    const handleChange = (e) => {
        setAuthMethod(e.target.value);
    };

    return (
        <Grid2 container style={{ height: '100vh' }} justifyContent="center" alignItems="center">
            <Grid2 item xs={12} sm={6} md={4} mx={2} my={2}> { }
                <Box sx={{
                    width: 300,
                    mx: 'auto',
                    my: 'auto',
                    textAlign: 'center',
                    bgcolor: '#fff',
                    borderRadius: 2,
                    boxShadow: 2,
                    p: 3
                }}>
                    <Typography variant="body1" align='left' gutterBottom>
                        <strong>Method</strong>
                    </Typography>
                    <Select 
                        value={authMethod} 
                        onChange={handleChange} 
                        fullWidth
                        sx={{
                          textAlign: 'left',
                          }}>
						<MenuItem value="token">Token</MenuItem>
                        <MenuItem value="login">Username</MenuItem>
                    </Select>
                    <Box sx={{
                      my: 2
                    }}>
                        {authMethod === 'login' && <LoginForm onLogin={handleLogin} />}
                        {authMethod === 'token' && <TokenForm onLogin={handleLogin} />}
                    </Box>
                </Box>
            </Grid2>
        </Grid2>
    );
};

export default Auth;
