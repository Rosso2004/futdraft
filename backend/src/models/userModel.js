const db=require('../database/db');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();

class User{
    static async createUser(lastname,firstname,email,password) {
        const [checkResults] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Questa mail è già presente nel sistema' };
        } else if (checkResults.length === 0){
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('INSERT INTO users ( lastname,firstname,email,password) VALUES (?, ?, ?, ?)', [ lastname,firstname,email,hashedPassword]);
            return { status: 200, message: 'L\'utente ' + lastname + ' ' + firstname + ' è stato creato con successo' };
        }
    }

    static async updateUser(id, lastname, firstname, email, password) {
        const [checkEmUs] = await db.query('SELECT id FROM users WHERE (email = ?) AND id != ?', [email, id]);
        if (checkEmUs.length > 0) {
            return { status: 409, message: 'Email già presente nel sistema' };
        } else if (checkEmUs.length === 0) {
            const [checkResults] = await db.query('SELECT id, password FROM users WHERE id = ?', [id]);
            if (checkResults.length === 0) {
                return {status: 404, error: 'Utente non trovato'};
            } else if (checkResults.length === 1) {
                const dbPassword = checkResults[0].password;
                const isMatch = await bcrypt.compare(password, dbPassword);
                if (isMatch) {
                    await db.query('UPDATE users SET lastname = ?, firstname = ?, email = ? WHERE id = ?', [lastname, firstname, email, id]);
                    const [newUpd] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

                    return {status: 200, message: 'Utente aggiornato con successo', data: {id: newUpd[0].id, lastname: newUpd[0].lastname, firstname: newUpd[0].firstname, email: newUpd[0].email}};
                } else {
                    return {status: 401, message: 'La password per modificare l\'utente non è corretta'};
                }
            }
        }
    }

    static async verifyUser(email,password) {
        const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) {
            return { status: 404, message: 'Email non valida' };
        }

        const dbPassword = results[0].password;
        const isMatch = await bcrypt.compare(password, dbPassword);

        if (!isMatch) {
            return { status: 401, message: 'Password non valida' };
        }

        console.log(results)
        return { status: 200, message: 'Utente autenticato con successo', data: {id: results[0].id, lastname: results[0].lastname, firstname: results[0].firstname, email: results[0].email}};
    }

    static async changeUserPassword(email, old_password, new_password) {
        const [checkResults] = await db.query('SELECT email, password FROM users WHERE email = ?', [email]);

        if (checkResults.length === 0) {
            return {status: 404, message: 'Utente non trovato'};
        } else if (checkResults.length === 1) {
            const dbPassword = checkResults[0].password;
            const isMatch = await bcrypt.compare(old_password, dbPassword);

            if (isMatch) {
                const hashedPassword = await bcrypt.hash(new_password, 10);
                await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
                return {status: 200, message: 'Password aggiornata con successo'};
            } else {
                return { status: 401, message: 'Password non valida' };
            }
        }
    }

    static async deleteUser(id) {
        const [checkResults] = await db.query('SELECT id FROM users WHERE id = ?', [id]);

        if (checkResults.length === 0) {
            return { status: 404, message: 'Utente non trovato' };
        } else if (checkResults.length === 1) {
            await db.query('DELETE FROM customer WHERE id = ?', [id]);
            return { status: 200, message: 'Utente rimosso con successo' };
        }
    }
}

module.exports= User;