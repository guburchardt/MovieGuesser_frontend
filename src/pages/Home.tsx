import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Game } from '../components/Game';

export const Home: React.FC = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          MovieGuesser
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Tente adivinhar o filme pelo poster borrado!
        </Typography>
        <Game />
      </Box>
    </Container>
  );
}; 