import mongoose from "mongoose";

// Replace the uri string with your connection string.
const uri =
"mongodb+srv://ayatech100:CampusPortal2024@cluster0.4pwg69t.mongodb.net/"
const uriLocal = "mongodb://localhost:27017/TinyUrlDB";

const connectDB = async () => {
  await mongoose.connect(uri);
};
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
})

database.once('connected', () => {
  console.log('Database Connected');
})

export default connectDB;