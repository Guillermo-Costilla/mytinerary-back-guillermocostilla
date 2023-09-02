import { Schema, model, Types} from 'mongoose';

let collection = 'activities';

let schema = new Schema({
    activity1: {
        name1: {type: String, required: true},
        photo1: {type: String, required: true}
    },
    activity2: {
        name2: {type: String, required: true},
        photo2: {type: String, required: true}
    },
    activity3: {
        name3: {type: String, required: true},
        photo3: {type: String, required: true}
    },
    itineraries: [{type: Types.ObjectId, ref: 'itineraries'}],
    cities: [{type: Types.ObjectId, ref: 'cities'}]
},
{
    timestamps: true,
});

const Activity = model(collection, schema);

export default Activity;

