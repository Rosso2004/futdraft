import {IPlayer} from "./IPlayer.ts";

export interface ITeam {
    id: number;
    name: string;
    team: (IPlayer | null)[][];
    price: number;
}