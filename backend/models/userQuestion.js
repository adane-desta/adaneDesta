


import db from '../config/db.js'

const UserQuestionModel = {

    acceptUserQuestion: async (questionData) =>{
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try{
            const [result] = await connection.query(
            `INSERT INTO userquestions(name , emailorphone , question_text , address)
             values(?, ?, ?, ?)`,
             [questionData.name, questionData.emailorphone , questionData.question , questionData.address ]
            )

            await connection.commit();
            return result;

        }catch(error){
          
            await connection.rollback();
            throw error;
        } finally{

            connection.release();
        }


    }, 
    getUserQuestion: async () => {
        
      const connection = await db.getConnection();
      await connection.beginTransaction();

      try{

        const [userQuestionData] = await connection.query(
            `SELECT question_id, name , emailorphone , question_text ,  address FROM userquestions`);
             
            return userQuestionData;

      }catch (error){

       await connection.rollback();
       throw error;

      } finally {
        connection.release();
    }

            },

    deleteUserQuestion: async (question_id) => {

      const connection = await db.getConnection();
      await connection.beginTransaction();

      try{ 
        
            await connection.query(`delete from userquestions where question_id = ?`, [question_id]);
            await connection.commit();
        
         }catch (error){

          await connection.rollback();
         throw error;

        } finally {
          connection.release();
      }

    }
            
    

}



export default UserQuestionModel;