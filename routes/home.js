/**
 * Created by User on 2014/3/31.
 * 預設的Route
 */

var Album = require('../models/Album');

exports.index = function (req, res) {
    Album.find({}, function (err, albums) {
        if (err) {
            res.send(err);
        }

        res.render('index', {
            title: '我的回憶',
            albums: albums
        });
    });

};
