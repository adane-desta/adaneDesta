import db from '../config/db.js';

const LoginModel = {
    authenticateUser: async (email, password, userType) => {

        console.log(userType);
        
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            const [user] = await connection.query(
                `SELECT * FROM ${userType} WHERE email = ? AND password = ?;`,
                [email, password]
            );

            await connection.commit();
            return user.length > 0 ? user[0] : null;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

export default LoginModel;
