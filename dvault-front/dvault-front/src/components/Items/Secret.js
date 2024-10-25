import React from 'react';
import { ListItem, ListItemText, Button, Box } from '@mui/material';

const Secret = ({ title, description, onView }) => {
    return (
        <ListItem
            secondaryAction={
                <Box>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={onView}
                        sx={{ marginLeft: 'auto' }} // Для автоматического выравнивания справа
                    >
                        View
                    </Button>
                </Box>
            }
        >
            <ListItemText 
                primary={title} 
                secondary={description} 
            />
        </ListItem>
    );
};

export default Secret;