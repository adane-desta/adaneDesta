
import db from '../config/db.js';

const UserModel = {
    
    getUsers: async (userType) => {

         const connection = await db.getConnection();
         await connection.beginTransaction();

         try{

            if(userType === 'all'){

               const [users] = await db.query(
                  `SELECT name , email , phone , type , farmer_id as "id" FROM FARMERS
                   UNION 
                   SELECT name , email , phone , type , vet_id as "id" FROM VETERINARIANS`
               );

               await connection.commit();
               return users;

            }
            if(userType === 'FARMERS'){

            const [users] = await connection.query(
               `SELECT name , email , phone , type , farmer_id as "id" FROM  FARMERS`
            );
            
            await connection.commit();
            return users;
            
            }else if(userType === 'VETERINARIANS'){

               const [users] = await connection.query(
                  
                  `SELECT name , email , phone , type , vet_id as "id" FROM VETERINARIANS

               `);

               await connection.commit();
               return users;
            }

         }catch(error) {
            await connection.rollback();
            throw error;
         } finally {

         connection.release();
         }
    } , 

    deleteUser: async (user_id , userType) => {

      const connection = await db.getConnection();
      await connection.beginTransaction();

      try{ 
         if(userType === 'FARMERS'){
            await connection.query(`delete from FARMERS where farmer_id = ?`, [user_id]);
            await connection.commit();
         }else{
            await connection.query(`delete from VETERINARIANS where vet_id = ? `, [user_id]);
            await connection.commit();
         }
          

      }catch (error){
         await connection.rollback();
         throw error;
      } finally {
         connection.release();
      }
       
      

    }
}

export default UserModel;


