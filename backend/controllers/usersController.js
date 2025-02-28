
import UserModel from "../models/userModel.js";

const UsersController = {
    getUsers: async (req , res) => {
        
        try{
            
            const {userType} = req.params;
            const users = await UserModel.getUsers(userType);

            res.status(200).json(users);
        }catch(error){
            res.status(500).json({error: error.message});
        }
        
    },
    deleteUser: async (req , res ) => {
      try {

        const {userType} = req.query;
        const {user_id} = req.params;
        
        await  UserModel.deleteUser(user_id , userType);
        
        res.status(200).json();

      }catch (error){
        res.status(500).json({error: error.message});
      }
    }
}
export default UsersController;
