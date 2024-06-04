// import UserModel from "..Models/LinkModel.js";
import UserModel from '../Models/UserModel.js';
const UsersController = {
  getList: async (req, res) => {
    try {
      const user = await UserModel.find();//ללא סינון
    //   const tasks = await TaskModel.find({ isComplete: true });//סינון 1
    //   const tasks = await TaskModel.where('isComplete', false);//סינון 2
      res.json(user);//?
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

//   getById: async (req, res) => {
//     try {
//         await UserModel.find({_id:req.params.id})
//       const user = await UserModel.findById(req.params.id);//שליפה לפי מזהה
//       res.json(user);
//     } catch (e) {
//       res.status(400).json({ message: e.message });
//     }
//   },

  add: async (req, res) => {
    try {
      const  user  = new UserModel(req.body);
      const newUser = await user.save();//הוספת חדש
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedTask = await UserModel.findByIdAndUpdate(id, req.body, {new:true});//עדכון לפי מזהה
      res.json(updatedTask);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await UserModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default UsersController;
