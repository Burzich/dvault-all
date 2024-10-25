import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, IconButton, Backdrop, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard';
import Secrets from './components/Secrets';
import Hash from './components/Tools/Hash';
import { initializeVault, FIRST_INIT } from './services/api'

function App() {
  	const [isAuthenticated, setIsAuthenticated] = useState(false);
  	const [userData, setUserData] = useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  	const handleLogin = (data) => {
    	setUserData(data);
    	setIsAuthenticated(true);
  	};

	const handleLogout = () => {
		setUserData(null);
		setIsAuthenticated(false); // Сбрасываем состояние при выходе
	};

	const toggleDrawer = (open) => {
		setIsDrawerOpen(open);
	};

	useEffect(() => {
		initializeVault();
		if (FIRST_INIT) {
			setIsAuthenticated(true)
		}
	}, [])

  	return (
    	<Router>
      		<div className="App">
			  	{isAuthenticated && (
          			<>
					  	<IconButton
						  	edge="end"
						  	color="#1C1C1C"
						  	onClick={() => toggleDrawer(true)}
						  	sx={{
								position: 'fixed',
								left: '10px',
								top: '10px',
								bgcolor: '#fff',
								'&:hover': {
									color: 'black'
								},
								padding: '12px',
								borderRadius: '50%',
								width: '50px',
								height: '50px',
							}}
					  	>
						  	<MenuIcon />
					  	</IconButton>

					  	<Drawer
						  	anchor="left"
						  	open={isDrawerOpen}
						  	onClose={() => toggleDrawer(false)}
					  	>
						  	<Box
							  	sx={{ width: 250, bgcolor: '#1C1C1C', color: 'white', height: '100%' }}
							  	role="presentation"
							  	onClick={() => toggleDrawer(false)} // Скрываем меню при клике
							  	onKeyDown={() => toggleDrawer(false)}
						  	>
								<IconButton
									button 
                        		    onClick={() => toggleDrawer(false)}
                        		    sx={{
                        		        position: 'absolute',
                            			top: '5px', // Отступ от верха окна
                            			left: '195px', // Расположить справа от меню
                            			bgcolor: '#1C1C1C',
                            			color: 'white',
                            			'&:hover': { 
											bgcolor: 'grey.800', 
											cursor: 'pointer' },
                                        '&:active': { bgcolor: 'grey.700' },
                            			padding: '12px',
                            			borderRadius: '5%'
                        			}}
                        		>
                        		    <ChevronLeftIcon />
                        		</IconButton>

							  	<List
									sx={{
										display: 'flex',
										flexDirection: 'column',
										gap: '1px', // Устанавливаем промежуток между кнопками
										paddingTop: 5, // Отступ сверху
									}}
								>
									<ListItem 
                                        sx={{
        									margin: '0 auto',
											mb: '1px',
        									width: '90%',
											borderBottom: '1px solid #ccc'
                                        }}
                                    >
                                        <ListItemText/>
                                    </ListItem>

								  	<ListItem 
                                        button 
                                        component={Link} 
                                        to="/dashboard"
                                        sx={{
                                            '&:hover': { bgcolor: 'grey.800' },  // Серый фон при наведении
                                            '&:active': { bgcolor: 'grey.700' },  // Серый фон при нажатии
                                            color: 'white',  // Белый текст
											borderRadius: '10px',  // Закругленные углы
        									margin: '0 auto',
        									width: '90%',
											textAlign: 'left',
											height: '40px'
                                        }}
                                    >
                                        <ListItemText primary="Dashboard" />
                                    </ListItem>

                                    <ListItem 
                                        button 
                                        component={Link} 
                                        to="/secrets"
                                        sx={{
                                            '&:hover': { bgcolor: 'grey.800' },  // Серый фон при наведении
                                            '&:active': { bgcolor: 'grey.700' },  // Серый фон при нажатии
                                            color: 'white',  // Белый текст
											borderRadius: '10px',  // Закругленные углы
        									margin: '0 auto',
        									width: '90%',
											textAlign: 'left',
											height: '40px'
                                        }}
                                    >
                                        <ListItemText primary="Secrets" />
                                    </ListItem>

									<ListItem 
                                        button 
                                        component={Link} 
                                        to="/hash"
                                        sx={{
                                            '&:hover': { bgcolor: 'grey.800' },  // Серый фон при наведении
                                            '&:active': { bgcolor: 'grey.700' },  // Серый фон при нажатии
                                            color: 'white',  // Белый текст
											borderRadius: '10px',  // Закругленные углы
        									margin: '0 auto',
        									width: '90%',
											textAlign: 'left',
											height: '40px'
                                        }}
                                    >
                                        <ListItemText primary="Hash" />
                                    </ListItem>

									<ListItem 
                                        sx={{
        									margin: '0 auto',
											mb: '1px',
        									width: '90%',
											borderBottom: '1px solid #ccc'
                                        }}
                                    >
                                        <ListItemText/>
                                    </ListItem>
                                    
                                    {/* Кнопка выхода */}
                                    <ListItem 
                                        button 
                                        onClick={handleLogout}
                                        sx={{
                                            '&:hover': { bgcolor: 'grey.800' },  // Серый фон при наведении
                                            '&:active': { bgcolor: 'grey.700' },  // Серый фон при нажатии
                                            color: 'white',  // Белый текст
											borderRadius: '10px',  // Закругленные углы
											margin: '0 auto',
        									width: '90%',
											textAlign: 'left',
											height: '40px'
                                        }}
                                    >
                                        <ListItemText primary="Sign out" />
                                    </ListItem>
							  	</List>
						  	</Box>
					  	</Drawer>

					  	{/* Затемнение фона при открытом меню */}
					  	<Backdrop open={isDrawerOpen} onClick={() => toggleDrawer(false)} sx={{ zIndex: 1 }} />
				  	</>
        		)}

        		<Routes>
        	  		<Route
        	    		path="/login"
        	    		element={!isAuthenticated ? <Auth onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        	  		/>

        	  		<Route
        	    		path="/"
        	    		element={isAuthenticated ? (
							<Navigate to="/dashboard" />
        	    		) : (
        	    	  		<Navigate to="/login" />
        	    		)}
        	  		/>

					<Route
        	    		path="/dashboard"
        	    		element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        	  		/>

					<Route
        	    		path="/secrets"
        	    		element={isAuthenticated ? <Secrets /> : <Navigate to="/login" />}
        	  		/>

					<Route
        	    		path="/hash"
        	    		element={isAuthenticated ? <Hash /> : <Navigate to="/login" />}
        	  		/>
        		</Routes>

        		<Box
        	  		component="footer"
        	  		sx={{
        	    		py: 2,
        	    		px: 2,
        	    		mt: 'auto',
        	    		bgcolor: '#fff',
        	    		textAlign: 'center',
        	    		width: '100%',
        	    		position: 'fixed',
        	    		bottom: 0,
						borderTop: '1px solid #ccc'
        	  		}}
        		>
        	  		<Typography 
						variant="body2">
        	    		© 2024 Debichыы
        	  		</Typography>
        		</Box>
      		</div>
    	</Router>
  );
}

export default App;
