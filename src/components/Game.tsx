import React, { useState, useEffect } from 'react';
import { GameData, MovieOption } from '../types/game';
import { gameService } from '../services/api';
import { 
  Container, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  Box
} from '@mui/material';

export const Game: React.FC = () => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [blurLevel, setBlurLevel] = useState(1);
  const [currentMovieId, setCurrentMovieId] = useState<number | null>(null);

  const startNewGame = async () => {
    try {
      setLoading(true);
      setError(null);
      setSelectedOption(null);
      setRevealed(false);
      setFeedback(null);
      setAttempts(0);
      setBlurLevel(1); // Começa com o máximo de blur
      const data = await gameService.getNewGame(1);
      setGameData(data);
      setCurrentMovieId(data.correct_id); // Guarda o ID do filme atual
    } catch (err) {
      setError('Erro ao carregar o jogo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = async (optionId: number) => {
    if (!gameData || !currentMovieId) return;
    
    setSelectedOption(optionId);
    
    if (optionId === gameData.correct_id) {
      try {
        const revealData = await gameService.revealMovie(optionId);
        setGameData(prev => prev ? { ...prev, image: revealData.image } : null);
        setRevealed(true);
        setFeedback({ 
          message: `Parabéns! Você acertou em ${attempts + 1} tentativa${attempts > 0 ? 's' : ''}!`, 
          type: 'success' 
        });
      } catch (err) {
        setError('Erro ao revelar a imagem. Tente novamente.');
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts < 3) {
        // Aumenta o nível de blur (1 -> 2 -> 3 -> 4)
        const newBlurLevel = newAttempts + 1;
        setBlurLevel(newBlurLevel);
        setFeedback({ 
          message: `Ops! Tente novamente. A imagem ficará mais nítida...`, 
          type: 'error' 
        });
        // Atualiza apenas o blur da imagem atual
        try {
          const revealData = await gameService.updateBlur(currentMovieId, newBlurLevel);
          setGameData(prev => prev ? { ...prev, image: revealData.image } : null);
          setSelectedOption(null); // Permite tentar novamente
        } catch (err) {
          setError('Erro ao atualizar a imagem. Tente novamente.');
        }
      } else {
        try {
          const revealData = await gameService.revealMovie(gameData.correct_id);
          setGameData(prev => prev ? { ...prev, image: revealData.image } : null);
          setRevealed(true);
          setFeedback({ 
            message: `Que pena! A resposta correta era: ${gameData.options.find(opt => opt.id === gameData.correct_id)?.title}`, 
            type: 'error' 
          });
        } catch (err) {
          setError('Erro ao revelar a imagem. Tente novamente.');
        }
      }
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          onClick={startNewGame}
          sx={{ mt: 2 }}
        >
          Tentar Novamente
        </Button>
      </Container>
    );
  }

  if (!gameData) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          image={`data:image/png;base64,${gameData.image}`}
          alt="Poster do filme"
          sx={{ 
            height: 500,
            objectFit: 'contain',
            backgroundColor: 'black'
          }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Qual é este filme?
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Tentativas restantes: {3 - attempts}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Nível de blur: {blurLevel}/4 (1 = mais borrado, 4 = mais nítido)
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {gameData.options.map((option) => (
              <Button
                key={option.id}
                fullWidth
                variant="contained"
                onClick={() => handleOptionClick(option.id)}
                disabled={revealed}
                color={
                  selectedOption === option.id
                    ? option.id === gameData.correct_id
                      ? 'success'
                      : 'error'
                    : 'primary'
                }
              >
                {option.title}
              </Button>
            ))}
          </Box>
          {revealed && (
            <Button
              variant="contained"
              onClick={startNewGame}
              sx={{ mt: 2 }}
            >
              Próximo Filme
            </Button>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={feedback !== null}
        autoHideDuration={3000}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setFeedback(null)} 
          severity={feedback?.type} 
          sx={{ width: '100%' }}
        >
          {feedback?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}; 