const mongoose = require('mongoose');

var build = new mongoose.Schema({
   buildingIndex : Number,
   position      : [Number],
   rotation      : Number
});

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    buildings: {
        required: true,
        type: [build]
    }
})

module.exports = mongoose.model('Data', dataSchema)