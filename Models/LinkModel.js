
// import mongoose from "mongoose";
// // import ClickModel from "./ClickModel";
// import ClickSchema from "./ClickModel.js"
// import TargetValue from "./TargetValue.js";
// const LinkSchema = mongoose.Schema({
//     originUrl: {
//         type: String,
//         default: ''
//     }  
//     ,clicks: [{
//         type: Schema.Types.ObjectId,
//         ref: 'ClickModel'
//     }],

//     targetParamName: {
//         type: String,
//         default: ''
//     },
//     // targetValues:[TargetValue]
//     targetValues: [{
//         type: Schema.Types.ObjectId,
//         ref: 'TargetValue'
//     }],
 
// });

// export default mongoose.model("links", LinkSchema);

import mongoose from "mongoose";
import ClickSchema from "./ClickModel.js";
import TargetValueSchema from "./TargetValueModel.js";

const { Schema } = mongoose;

const LinkSchema = new Schema({
    originUrl: {
        type: String,
        default: ''
    },
    shortUrl: {
        type: String,
        default: ''
    },
    clicks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClickModel'
    }],
    // clicks: [ClickSchema], // שימוש במערך של ObjectId
    targetParamName: {
        type: String,
        default: ''
    },
    // targetValues: [TargetValueSchema]

    targetValues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TargetValue'
    }],
});

export default mongoose.model("links", LinkSchema);