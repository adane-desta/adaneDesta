

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5700;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    credentials: true,
}));

app.options('*', cors());

app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
