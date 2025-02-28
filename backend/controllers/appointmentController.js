
import AppointmentModel from '../models/appointmentModel.js';

const AppointmentController = {

    setAppointment: async (req , res) =>{

        try {
            const {apptData} = req.body;
            const appointment = await AppointmentModel.setAppointment(apptData);
            res.status(200).json(appointment);
        }catch (error){
            res.status(500).json({ error: error.message });
        }
    },

    getAppointment : async (req , res) =>{

        const appointments = await AppointmentModel.getAppointment();
        res.status(200).json(appointments);
    },

    deleteAppointment: async (req, res) => {
        try {
            const { id } = req.params; 
            await AppointmentModel.deleteAppointment(id);
            res.status(204).json(); 
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

}

export default AppointmentController;
