/**
 * Created by thomas on 2014/1/29.
 * 相簿Album Model
 */
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: String,
    password: String,
    creteDate: {type: Date, default: Date.now},
    count: Number,
    fileName: String
});

exports.Album = mongoose.model('Album', schema);