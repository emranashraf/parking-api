const   mongoose = require('mongoose'),
Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name            : { type: String, required: true, trim: true },
    description     : { type: String, required: true, trim: true },
    youtubeVideoUrl : { type: String, required: true, trim: true },
    tags            : { type: String, required: true, time: true }
});

module.exports = mongoose.model('Item', ItemSchema, 'items');