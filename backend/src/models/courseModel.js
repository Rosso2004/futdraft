const db = require('../database/db');

class Course {
    static async getAllCourse() {
        const [results] = await db.query('SELECT * FROM course');
        return results;
    }

}
module.exports = Course;