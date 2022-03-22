import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
export const ReservationSchema = new Schema({
    eventId: { type: String, required: true, ref: 'towerEvent' },
    accountId: { type: ObjectId, required: true, ref: 'Profile' },









},
    { timestamps: true, toJSON: { virtuals: true } }
)
ReservationSchema.virtual('account', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})
ReservationSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'towerEvent'
})