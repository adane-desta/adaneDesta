

import express from 'express';
import NewsEventsController from '../controllers/newsEventsController.js'; 
import AddNewUser from '../controllers/addNewUser.js';
import UserQuestion from '../controllers/userQuestion.js';
import LoginController from '../controllers/loginController.js'
import AppointmentController from '../controllers/appointmentController.js';
import UsersController from '../controllers/usersController.js';
import ChatController from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/news-events', NewsEventsController.insertNewsEvent);
router.post('/resources', NewsEventsController.insertResources);
router.get('/news-events', NewsEventsController.getNewsEvents);
router.get('/resources', NewsEventsController.getResources);
router.delete('/news-events/:id', NewsEventsController.deleteNewsEvent);
router.delete('/resources/:id', NewsEventsController.deleteResources);
router.post('/new-farmer', AddNewUser.insertNewFarmer);
router.post('/new-doctor' , AddNewUser.insertNewDoctor);
router.post('/userQuestion' , UserQuestion.acceptUserQuestion);
router.get('/getUserQuestion', UserQuestion.getUserQuestion);
router.get('/login', LoginController.login);
router.post('/appointments', AppointmentController.setAppointment);
router.get('/getAppointment', AppointmentController.getAppointment);
router.delete('/delete_appointment/:id', AppointmentController.deleteAppointment);
router.get('/users/:userType', UsersController.getUsers);
router.delete('/deleteUser/:user_id' , UsersController.deleteUser);
router.delete('/deleteUserQuestion/:question_id', UserQuestion.deleteUserQuestion);
router.post('/chatbot', ChatController.chatWithAI);


export default router;
