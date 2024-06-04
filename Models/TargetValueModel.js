// import mongoose from "mongoose";
// const { Schema } = mongoose;
// const TargetSchema = mongoose.Schema({
    
//             name: "",
//             value: ""
        
// });

// export default mongoose.model("target", TargetSchema);
import mongoose from 'mongoose';

const { Schema } = mongoose;

const targetValueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,  // ודא שהסוג חוקי (לדוגמה: String)
        required: true
    },
    // הוסף שדות נוספים בהתאם לצורך
});

const TargetValue = mongoose.model('TargetValue', targetValueSchema);
export default TargetValue;