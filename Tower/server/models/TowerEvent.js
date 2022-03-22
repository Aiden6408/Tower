import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
export const towerEventSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        creatorId: { type: ObjectId, required: true, ref: 'Profile' },
        coverImg: { type: String, required: true },
        location: { type: String, reqiured: true },
        capacity: { type: Number, },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, required: true, default: false, },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },

    },

    { timestamps: true, toJSON: { virtuals: true } }
)

towerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})
