import { Schema, model, Types } from "mongoose";

const collection = 'users';

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: null },
    google: { type: Boolean, default: false },
    country: { type: String },
    online: { type: Boolean, default: false },
    verified: { type: Boolean, default: true },
    verified_code: { type: String },
    cities: [{ 
        type: Types.ObjectId, 
        ref: 'cities' 
      }],
    activities: { type: Types.ObjectId, ref: 'activities' },
    itineraries: { type: Types.ObjectId, ref: 'itineraries' }
}, {
    timestamps: true
});

const User = model(collection, schema);

export default User;