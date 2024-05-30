const db=require('../database/db');
const dotenv = require("dotenv");

dotenv.config();

class Team{
    static async getTeam(user) {
        const [checkResults] = await db.query('SELECT id, name, team, price FROM teams WHERE user = ?', [user]);
        return checkResults;
    }

    static async createTeam(user,name,team,price) {
        const [checkResults] = await db.query('SELECT name FROM teams WHERE name = ?', [name]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Un team con lo stesso nome è già presente nel sistema' };
        } else if (checkResults.length === 0){
            await db.query('INSERT INTO teams (name,user,team,price) VALUES (?, ?, ?, ?)', [name,user,team,price]);
            return { status: 200, message: 'Il team ' + name + ' è stato salvato con successo' };
        }
    }

    static async updateTeam(id,team,price) {
        const [res] = await db.query('SELECT name FROM teams WHERE id = ?', [id]);
        await db.query('UPDATE teams SET team = ?, price = ? WHERE id = ?', [team, price, id]);
        return { status: 200, message: 'Il team ' + res[0].name + ' è stato aggiornato con successo' };
    }

    static async deleteTeam(id) {
        const [res] = await db.query('SELECT name FROM teams WHERE id = ?', [id]);
        await db.query('DELETE FROM teams WHERE id = ?', [id]);
        return { status: 200, message: 'Il team ' + res[0].name + ' è stato rimosso con successo' };
    }
}

module.exports= Team;