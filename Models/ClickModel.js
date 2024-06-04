import mongoose from "mongoose";
const ClickSchema = new mongoose.Schema({
    insertedAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    ipAddress: {
      type: String,
      required: true
    },
    targetParamValue: {
      type: String,
      default: ""
    }
});
export default mongoose.model("click", ClickSchema);
