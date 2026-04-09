export type GameMap = {
    index: number;
    name: string;
    homeScore: number;
    awayScore: number;
    pickedBy: string;
    decider?: boolean;
    upNext: boolean;
    notNeeded: boolean;
};
