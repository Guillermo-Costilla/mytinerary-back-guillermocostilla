import { Schema, model, Types} from 'mongoose';

let collection = 'activities';

let schema = new Schema({
    activity: {
        name: {type: String, required: true},
        photo: {type: String, required: true}
    },
    activity2: {
        name: {type: String, required: true},
        photo: {type: String, required: true}
    },
    activity3: {
        name: {type: String, required: true},
        photo: {type: String, required: true}
    },
},
{
    timestamps: true,
});

const Activity = model(collection, schema);

export default Activity;

