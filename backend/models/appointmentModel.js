import db from '../config/db.js';

const AppointmentModel = {

    setAppointment: async (apptData) => {

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            const [appointment] = await connection.query(
                `INSERT INTO appointments (farmer_id, vet_id, date, reason)
                 VALUES (?, ?, ?, ?)`,
                [
                    parseInt(apptData.farmer_id),
                    parseInt(apptData.vet_id), 
                    `date: ${apptData.apptDate} time: ${apptData.apptTime}`, 
                    apptData.apptReason
                ]
            );

            await connection.commit();
            return appointment;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }

    }, 

    getAppointment: async () => {

        const [appointments] = await db.query(

            `select appointment_id , name , email , phone, date , reason from 
             appointments as appt , farmers as far
             where appt.farmer_id = far.farmer_id;`
         );

            return appointments;

    },

    deleteAppointment: async (id) => {
        const connection = await db.getConnection();
        await connection.beginTransaction();
    
        try {
            await connection.query(`delete from appointments where appointment_id = ?`, [id]);
            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
    
}

export default AppointmentModel;

