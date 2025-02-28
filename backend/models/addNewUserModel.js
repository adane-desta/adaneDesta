
import db from '../config/db.js'

const AddNewUsers = {
    insertNewFarmer: async (newFarmerData) => {
        const connection = await db.getConnection();
        await connection.beginTransaction();
        try {
            const [result] = await connection.query(
                `INSERT INTO FARMERS (name, email, password, phone, address) VALUES (? ,? , ? , ? , ?)` ,
                [newFarmerData.firstName + " " + newFarmerData.lastName, newFarmerData.email, newFarmerData.password, newFarmerData.phone, newFarmerData.location]
            );
            await connection.commit();
            return result.insertId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }    
    },

    insertNewDoctor: async (newDoctorData) => {

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            const [result] = await connection.query(
               
                `INSERT INTO VETERINARIANS (name, email, password, phone, specialty, organization) VALUES (? , ? , ? , ? ,?, ?)`,
                [newDoctorData.firstName + " " + newDoctorData.lastName, newDoctorData.email, newDoctorData.password, newDoctorData.phone, newDoctorData.speciality, newDoctorData.organization]
            );

            await connection.commit();
             return result.insertId;

        }catch (error){ 
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
    }
 }
} 
export default AddNewUsers;



