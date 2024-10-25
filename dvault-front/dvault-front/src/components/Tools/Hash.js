// HashPage.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Divider, Grid2, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { hashText, hashTextLocal } from '../../services/api'; // Импортируем функцию для хеширования

const Hash = () => {
    const [inputText, setInputText] = useState('');
    const [algorithm, setAlgorithm] = useState('sha2-256'); // По умолчанию алгоритм sha2-256
    const [outputFormat, setOutputFormat] = useState('hex'); // По умолчанию формат вывода hex
    const [hashOutput, setHashOutput] = useState('');
    const [error, setError] = useState(''); // Состояние для хранения ошибок
    const [isCopied, setIsCopied] = useState(false); // Для отображения статуса копирования

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleAlgorithmChange = (e) => {
        setAlgorithm(e.target.value);
    };

    const handleOutputFormatChange = (e) => {
        setOutputFormat(e.target.value);
    };

    const handleHashing = async () => {
        try {
            //const hash = await hashText(algorithm, outputFormat, inputText);
            const hash = await hashTextLocal(algorithm, outputFormat, inputText);
            setHashOutput(hash); // Устанавливаем полученный хеш
            setError(''); // Очищаем ошибку, если запрос успешен
            setIsCopied(false); // Сбрасываем статус копирования
        } catch (err) {
            setError('Error generating hash.'); // Устанавливаем сообщение об ошибке
        }
    };

    const handleDone = () => {
        setHashOutput('');
        setInputText('');
        setError(''); // Сбрасываем ошибку
    };

    const handleCopyHash = () => {
        navigator.clipboard.writeText(hashOutput)
            .then(() => {
                setIsCopied(true);
            })
            .catch(() => {
                setIsCopied(false);
            });
    };

    return (
        <Box sx={{ padding: '20px', pl: '70px'  }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Hash
            </Typography>
            <Divider sx={{ marginBottom: '20px' }} />

            <TextField
                label="Input Text"
                variant="outlined"
                fullWidth
                value={inputText}
                onChange={handleInputChange}
                sx={{ marginBottom: '20px' }}
            />

            <Grid2 container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid2 item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Algorithm</InputLabel>
                        <Select value={algorithm} onChange={handleAlgorithmChange}>
                            <MenuItem value="sha2-256">SHA-256</MenuItem>
                            <MenuItem value="sha2-512">SHA-512</MenuItem>
                            <MenuItem value="md5">MD5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Output Format</InputLabel>
                        <Select value={outputFormat} onChange={handleOutputFormatChange}>
                            <MenuItem value="hex">Hex</MenuItem>
                            <MenuItem value="base64">Base64</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
            </Grid2>

            <Button
                variant="contained"
                color="primary"
                onClick={handleHashing}
                sx={{ marginBottom: '20px' }}
            >
                Generate Hash
            </Button>

            {error && (
                <Typography variant="body1" color="error" sx={{ marginTop: '10px' }}>
                    {error}
                </Typography>
            )}

            {hashOutput && (
                <Box sx={{ marginTop: '20px', position: 'relative' }}>
                    <Typography variant="h6">Generated hash:</Typography>

                    <Box
                        sx={{
                            backgroundColor: '#f0f0f0',
                            padding: '10px',
                            borderRadius: '5px',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-all',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                flex: 1,
                                marginRight: '10px',
                            }}
                        >
                            {hashOutput}
                        </Typography>

                        <IconButton
                            onClick={handleCopyHash}
                            sx={{
                                color: isCopied ? 'green' : 'inherit',
                                padding: '5px',
                                '&:hover': {
                                    color: 'blue',
                                },
                            }}
                        >
                            <ContentCopyIcon />
                        </IconButton>
                    </Box>

                    {isCopied && (
                        <Typography
                            variant="body2"
                            sx={{ marginTop: '10px', color: 'green' }}
                        >
                            Hash copied to clipboard!
                        </Typography>
                    )}

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleDone}
                        sx={{ marginTop: '10px' }}
                    >
                        Done
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Hash;
