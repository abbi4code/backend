import mongoose, {Schema} from 'mongoose';
//Pagination is like splitting a big list into smaller parts, making it easier to navigate
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoschema = new mongoose.Schema({
    videofile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    views:{
        type: Number,
        default: 0
    },
    ispublished:{
        type: Boolean,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }



},{timestamps: true})

//there are a number of middlewares you can use

videoschema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoschema)