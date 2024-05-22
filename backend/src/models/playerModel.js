const db=require('../database/db');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();

class Player{
    static async getAllPlayer() {
        const [results] = await db.query('SELECT * FROM players');
        return results;
    }
}

module.exports= Player;