import { Schema, model, Types } from "mongoose";

let collection = 'itineraries';

let schema = new Schema(
  {
    user: {
      name: { type: String, required: true },
      photo: { type: String, required: true },
    },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    likes: { type: Number, required: true },
    hashtags: [{ type: String, required: true }],
    comments: [{ type: String, required: true }],
    activities: {type: Types.ObjectId, ref: 'activities'}
  },
  {
    timestamps: true,
  }
);

const Itinerary = model(collection, schema);

export default Itinerary;
