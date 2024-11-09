import { type GameMap } from "./gameMap";

export type Game = {
    homeTeam: string;
    awayTeam: string;
    maps: GameMap[];
    game: string;
    showTeamLogos: boolean;
    scoreNeededToWin: number;
    homeTeamScore: number;
    awayTeamScore: number;
};
