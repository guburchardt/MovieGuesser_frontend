export interface MovieOption {
  id: number;
  title: string;
}

export interface GameData {
  correct_id: number;
  image: string;
  options: MovieOption[];
}

export interface RevealData {
  image: string;
  title: string;
} 