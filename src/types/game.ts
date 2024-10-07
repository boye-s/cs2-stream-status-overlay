import { type GameMap } from './gameMap';

export type Game = {
	rounds: number;
	homeTeam: string;
	awayTeam: string;
	maps: GameMap[];
	game: string;
}