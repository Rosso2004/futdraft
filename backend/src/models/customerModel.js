const db=require('../database/db');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();

class Customer{
    static async getAllCustomer(){
        const [results]=await db.query('SELECT * FROM customer');
        return results;
    }

    static async createCustomer(fiscal_code, lastname,firstname,birthday,email,phone_number,password) {
        const [checkResults] = await db.query('SELECT fiscal_code FROM customer WHERE fiscal_code = ?', [fiscal_code]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il codice fiscale è già presente nel sistema' };
        } else if (checkResults.length === 0){
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('INSERT INTO customer ( fiscal_code, lastname,firstname,birthday,email,phone_number,password) VALUES (?, ?, ?, ?, ?, ?, ? )', [ fiscal_code, lastname,firstname,birthday,email,phone_number,hashedPassword]);
            return { status: 200, message: 'L\'utente ' + lastname + ' ' + firstname + ' è stato agggiunto con successo' };
        }
    }

    static async updateCustomer(fiscal_code, lastname,firstname,birthday,email,phone_number,password) {
        const [checkEmUs] = await db.query('SELECT fiscal_code FROM customer WHERE (email = ? OR lastname = ?) AND fiscal_code != ?', [email, lastname, fiscal_code]);
        if (checkEmUs.length > 0) {
            return { status: 409, message: 'Username o Email già presente nel sistema' };
        } else if (checkEmUs.length === 0) {
            const [checkResults] = await db.query('SELECT fiscal_code, password FROM customer WHERE fiscal_code = ?', [fiscal_code]);
            if (checkResults.length === 0) {
                return {status: 404, error: 'Utente non trovato'};
            } else if (checkResults.length === 1) {
                const dbPassword = checkResults[0].password;
                const isMatch = await bcrypt.compare(password, dbPassword);
                if (isMatch) {
                    await db.query('UPDATE customer SET lastname = ?, firstname = ?, birthday = ?, email = ?,phone_number = ? WHERE fiscal_code = ?', [ lastname, firstname, birthday, email, phone_number, fiscal_code]);
                    return {status: 200, message: 'Utente aggiornato con successo'};
                } else {
                    return {status: 401, message: 'La password per modificare l\'utente non è corretta'};
                }
            }
        }

    }

    static async verifyCustomer(email,password) {
        const [results] = await db.query('SELECT * FROM customer WHERE email = ?', [email]);

        if (results.length === 0) {
            return { status: 404, message: 'Email non valida' };
        }

        const dbPassword = results[0].password;
        const isMatch = await bcrypt.compare(password, dbPassword);

        if (!isMatch) {
            return { status: 401, message: 'Password non valida' };
        }

        return { status: 200, message: 'Utente autenticato con successo'};
    }

    static async changeCustomerPassword(email, old_password, new_password) {
        const [checkResults] = await db.query('SELECT email, password FROM customer WHERE email = ?', [email]);

        if (checkResults.length === 0) {
            return {status: 404, message: 'Utente non trovato'};
        } else if (checkResults.length === 1) {
            const dbPassword = checkResults[0].password;
            const isMatch = await bcrypt.compare(old_password, dbPassword);

            if (isMatch) {
                const hashedPassword = await bcrypt.hash(new_password, 10);
                await db.query('UPDATE customer SET password = ? WHERE email = ?', [hashedPassword, email]);
                return {status: 200, message: 'Password aggiornata con successo'};
            } else {
                return { status: 401, message: 'Password non valida' };
            }
        }
    }

    static async deleteCustomer(fiscal_code) {
        const [checkResults] = await db.query('SELECT fiscal_code FROM customer WHERE fiscal_code = ?', [fiscal_code]);

        if (checkResults.length === 0) {
            return { status: 404, message: 'Utente non trovato' };
        } else if (checkResults.length === 1) {
            await db.query('DELETE FROM customer WHERE fiscal_code = ?', [fiscal_code]);
            return { status: 200, message: 'Utente rimosso con successo' };
        }
    }

    static async getCustomer(fiscal_code){
        const  [checkResults] = await db.query('SELECT start_date,finish_date FROM subscription inner join customer ON subscription.fiscal_code=customer.fiscal_code WHERE fiscal_code = ?', [fiscal_code]);
        console.log(checkResults);
        if (checkResults.length === 0) {
            return { status: 404, message: 'Utente non trovato' };
        } else if (checkResults.length === 1) {

            return { status: 200, message: 'Utente trovato' };
        }

    }
}

module.exports= Customer;