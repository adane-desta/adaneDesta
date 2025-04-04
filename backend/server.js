

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';
import db from '../config/db.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5700;

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    credentials: true,
}));

app.options('*', cors());

app.use(bodyParser.json());
app.use('/api', router);

app.get('/render' , async (req , res) => {

    const connection = await db.getConnection();
      await connection.beginTransaction();

      try{

        const [userQuestionData] = await connection.query(
            `SELECT question_id, name , emailorphone , question_text ,  address FROM userquestions`);
            res.status(200).json({ data: userQuestionData });
           
      }catch (error){

       await connection.rollback();
       throw error;

      } finally {
        connection.release();
    }


})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
