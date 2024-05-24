import {IRole} from "./IRole.ts";

export interface IPlayer {
    id: number;
    lastname: string;
    firstname: string;
    age: number;
    height: number;
    weight: number;
    role: IRole;
    price: number;
    photo_url: string | null;
    average_clean_sheet: number | null;
    average_save: number | null;
    average_goals_conceded: number | null;
    average_contrasts_won: number | null;
    average_advances: number | null;
    avarage_yellow_season: number | null;
    average_passing_accuracy: number | null;
    average_balls_recovered: number | null;
    average_assist: number | null;
    career_goal: number | null;
    average_goal: number | null;
    average_dribbling: number | null;
    average_shots_on_goal: number | null;
}