import { GameData, RevealData } from '../types/game';

const API_BASE_URL = 'http://localhost:5000';

export const gameService = {
  async getNewGame(blurLevel: number = 1): Promise<GameData> {
    const response = await fetch(`${API_BASE_URL}/game?blur_level=${blurLevel}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar novo jogo');
    }
    return response.json();
  },

  async revealMovie(movieId: number): Promise<RevealData> {
    const response = await fetch(`${API_BASE_URL}/reveal/${movieId}`);
    if (!response.ok) {
      throw new Error('Erro ao revelar filme');
    }
    return response.json();
  },

  async updateBlur(movieId: number, blurLevel: number): Promise<RevealData> {
    const response = await fetch(`${API_BASE_URL}/update_blur/${movieId}?blur_level=${blurLevel}`);
    if (!response.ok) {
      throw new Error('Erro ao atualizar blur');
    }
    return response.json();
  }
}; 