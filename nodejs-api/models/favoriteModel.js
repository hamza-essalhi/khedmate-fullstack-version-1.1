import mongoose from "mongoose";
const { Schema } = mongoose;

const FavoriteJobSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
})

export default mongoose.model('FavoriteJob', FavoriteJobSchema)