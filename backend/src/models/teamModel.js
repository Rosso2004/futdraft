const db=require('../database/db');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();

class Team{
    static async getTeam(user) {
        const [checkResults] = await db.query('SELECT * FROM teams WHERE user = ?', [user]);
        console.log(checkResults)
        return checkResults;
    }

    static async createTeam(user,name,team) {
        const [checkResults] = await db.query('SELECT name FROM teams WHERE name = ?', [name]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Un team con lo stesso nome è già presente nel sistema' };
        } else if (checkResults.length === 0){
            await db.query('INSERT INTO teams (name,user,team) VALUES (?, ?, ?)', [name,user,team]);
            return { status: 200, message: 'Il team ' + name + ' è stato salvato con successo' };
        }
    }
}

module.exports= Team;