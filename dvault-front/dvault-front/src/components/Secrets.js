import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, TextField, List, ListItem, Button, Grid2 } from '@mui/material';
import Secret from './Items/Secret';
import { fetchSecrets, createSecret } from '../services/api'; // Импортируем API функции

const Secrets = () => {
    // Состояние для секретов и поиска
    const [secrets, setSecrets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // Получение секретов через API при загрузке компонента
    useEffect(() => {
        const loadSecrets = async () => {
            setLoading(true);
            try {
                const secretsFromApi = await fetchSecrets();
                setSecrets(secretsFromApi);
            } catch (error) {
                console.error('Ошибка загрузки секретов:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSecrets();
    }, []);

    // Обработчик изменения поискового запроса
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Обработчик создания нового секрета
    const handleCreateSecret = async () => {
        const newSecret = {
            title: `Secret ${secrets.length + 1}`,
            description: 'New secret description'
        };

        try {
            await createSecret(newSecret);
            setSecrets([...secrets, newSecret]); // Обновляем локальный список секретов
        } catch (error) {
            console.error('Ошибка при создании нового секрета:', error);
        }
    };

    // Фильтрация секретов по поисковому запросу
    const filteredSecrets = searchTerm
        ? secrets.filter(secret =>
            secret.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : secrets;

    return (
        <Box sx={{ padding: '20px', pl: '70px' }}>
            {/* Заголовок */}
            <Typography variant="h4" component="h1" gutterBottom>
                Secrets
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Grid2 для размещения кнопки и поиска в одной строке */}
            <Grid2 container spacing={2} sx={{ mb: 2 }}>
                {/* Поле для поиска по названию */}
                <Grid2 item xs={12} md={10}>
                    <TextField
                        label="Search Secrets"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Grid2>

                {/* Кнопка создания нового секрета */}
                <Grid2 item xs={12} md={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateSecret}
                        fullWidth
                        sx={{ height: '100%' }}
                    >
                        Create New Secret
                    </Button>
                </Grid2>
            </Grid2>

            {/* Основной контент - список секретов */}
            <Grid2 item xs={12} md={6} sx={{ width: '100%' }}>
                <Box sx={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                    <Typography variant="h6" component="h2" sx={{ pb: '10px' }}>
                        Secrets List
                    </Typography>
                    <List>
                        {loading ? (
                            <Typography variant="body2">Loading...</Typography>
                        ) : (
                            filteredSecrets.length > 0 ? (
                                filteredSecrets.map((secret, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            borderTop: index !== 0 ? '1px solid #ccc' : 'none',
                                        }}
                                    >
                                        <Secret
                                            title={secret.title}
                                            description={secret.description}
                                            onView={() => alert(`Viewing ${secret.title}`)}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body2">No secrets found.</Typography>
                            )
                        )}
                    </List>
                </Box>
            </Grid2>
        </Box>
    );
};

export default Secrets;
