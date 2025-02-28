

import AddNewUsers from '../models/addNewUserModel.js';

const AddNewUser =  {
    insertNewFarmer: async (req , res) => {
        try {
            const { newFarmerData } = req.body;
            const newFarmer = await AddNewUsers.insertNewFarmer(newFarmerData);
            res.status(201).json({newFarmer });
        } catch (error) {
            res.status(500).json({ error: error.message });
        } 
    },

    insertNewDoctor: async (req , res) =>{
        try{
            const {newDoctorData} = req.body;
            const newDoctor = await AddNewUsers.insertNewDoctor(newDoctorData);
            res.status(201).json({newDoctor});
        }catch (error){
            res.status(500).json({error: error.message});
        }
    }
}
export default AddNewUser;


