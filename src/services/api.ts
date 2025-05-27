import { GameData, RevealData } from '../types/game';

const API_BASE_URL = 'http://localhost:5000/api';

export const gameService = {
  async getNewGame(blurLevel: number = 1): Promise<GameData> {
    try {
      console.log('Fazendo requisição para:', `${API_BASE_URL}/game?blur_level=${blurLevel}`);
      const response = await fetch(`${API_BASE_URL}/game?blur_level=${blurLevel}`);
      console.log('Status da resposta:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData.error || 'Erro ao buscar novo jogo');
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      return data;
    } catch (error) {
      console.error('Erro detalhado na API:', error);
      throw error;
    }
  },

  async revealMovie(movieId: number): Promise<RevealData> {
    try {
      console.log('Fazendo requisição para:', `${API_BASE_URL}/reveal/${movieId}`);
      const response = await fetch(`${API_BASE_URL}/reveal/${movieId}`);
      console.log('Status da resposta:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData.error || 'Erro ao revelar filme');
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      return data;
    } catch (error) {
      console.error('Erro detalhado na API:', error);
      throw error;
    }
  },

  async updateBlur(movieId: number, blurLevel: number): Promise<{ image: string }> {
    try {
      console.log('Fazendo requisição para:', `${API_BASE_URL}/update_blur/${movieId}?blur_level=${blurLevel}`);
      const response = await fetch(`${API_BASE_URL}/update_blur/${movieId}?blur_level=${blurLevel}`);
      console.log('Status da resposta:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData.error || 'Erro ao atualizar blur');
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      return data;
    } catch (error) {
      console.error('Erro detalhado na API:', error);
      throw error;
    }
  }
}; 