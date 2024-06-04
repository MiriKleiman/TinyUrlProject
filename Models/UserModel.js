import mongoose from "mongoose";

const Userchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "new user"
    },
      email: String,
      password: String,

      links: [{type:mongoose.Schema.Types.ObjectId, ref: 'Links'}]
    // isComplete: Boolean,
    // title: String
});


export default mongoose.model("Users", Userchema);
