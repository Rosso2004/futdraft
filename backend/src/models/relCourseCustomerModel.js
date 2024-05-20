const db=require('../database/db');
const bcrypt = require("bcrypt");

class RelCourseCustomer {
    static async bookCourse(fiscal_code, id_course) {

        const [existingBooking] = await db.query('SELECT * FROM rel_course_customer WHERE fiscal_code = ? AND id_course = ?', [fiscal_code, id_course]);
        if (existingBooking.length > 0) {
            return {status: 400, message: 'L\'utente è già prenotato per questo corso'};
        }

        const [canBooking] = await db.query('SELECT day,time FROM course WHERE id=?', [id_course]);
        const [courseBook] = await db.query('SELECT day,time FROM rel_course_customer inner join course ON rel_course_customer.id_course=course.id WHERE fiscal_code = ?', [fiscal_code]);

        if(courseBook.length > 0){
            if(canBooking[0].day.getTime() ===courseBook[0].day.getTime()){
                if(canBooking[0].time===courseBook[0].time){
                    return{status: 409, message:'scemo di merda ti sei gia prenotato a un altro corso che e in parallelo'}
                }
            }
        }






        const [results] = await db.query('INSERT INTO rel_course_customer (fiscal_code, id_course) VALUES (?, ?)', [fiscal_code, id_course]);
        return {status: 200, message: 'Prenotazione avvenuta con successo'};
    }

}
module.exports= RelCourseCustomer;
