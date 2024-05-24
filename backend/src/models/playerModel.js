const db=require('../database/db');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();

class Player{
    static async getAllPlayer() {
        const [results] = await db.query('SELECT ' +
            'players.id,' +
            'players.lastname,' +
            'players.firstname,' +
            'players.age,' +
            'players.height,' +
            'players.weight,' +
            'roles.id AS rId,' +
            'roles.name AS rName,' +
            'players.price,' +
            'players.photo_url,' +
            'players.average_clean_sheet,' +
            'players.average_save,' +
            'players.average_goals_conceded,' +
            'players.average_contrasts_won,' +
            'players.average_advances,' +
            'players.avarage_yellow_season,' +
            'players.average_passing_accuracy,' +
            'players.average_balls_recovered,' +
            'players.average_assist,' +
            'players.career_goal,' +
            'players.average_goal,' +
            'players.average_dribbling,' +
            'players.average_shots_on_goal ' +
            'FROM players INNER JOIN roles ON players.role=roles.id');
        return results.map((row) => ({
            id: row.id,
            lastname: row.lastname,
            firstname: row.firstname,
            age: row.age,
            height: row.height,
            weight: row.weight,
            role: {
                id: row.rId,
                name: row.rName
            },
            price: row.price,
            photo_url: row.photo_url,
            average_clean_sheet: row.average_clean_sheet,
            average_save: row.average_save,
            average_goals_conceded: row.average_goals_conceded,
            average_contrasts_won: row.average_contrasts_won,
            average_advances: row.average_advances,
            avarage_yellow_season: row.avarage_yellow_season,
            average_passing_accuracy: row.average_passing_accuracy,
            average_balls_recovered: row.average_balls_recovered,
            average_assist: row.average_assist,
            career_goal: row.career_goal,
            average_goal: row.average_goal,
            average_dribbling: row.average_dribbling,
            average_shots_on_goal: row.average_shots_on_goal,
        }));
    }
}

module.exports= Player;