/**
 * Created by Thomas on 2014/1/29.
 * 瀏覽及上傳照片至Google drive
 */

var config = require('../config.json');
var GoogleTokenProvider = require("refresh-token").GoogleTokenProvider;
var async = require('async');
var request = require('request');
var accessToken;
var endPoint = 'https://www.googleapis.com/drive/v2';
var folderID = '';

var getToken = function (callback) {
    var tokenProvider = new GoogleTokenProvider({
        'refresh_token': config.GoogleRefreshToken,
        'client_id': config.GoogleClientID,
        'client_secret': config.GoogleClientSecret
    });
    tokenProvider.getToken(callback);
};


module.exports = {
    getPhotos: function (req, res) {
        folderID = req.params.folderID;

        async.waterfall([
            //-----------------------------
            // Obtain a new access token
            //-----------------------------
            getToken,

            //--------------------------------------------
            // Retrieve the children in a specified folder
            //
            // ref: https://developers.google.com/drive/v2/reference/files/children/list
            //-------------------------------------------
            function (token, callback) {
                accessToken = token;
                request.get({
                    'url': endPoint + '/files/' + folderID + '/children',
                    'qs': {
                        'access_token': token
                    }
                }, callback);
            },

            //----------------------------
            // Parse the response
            //----------------------------
            function (response, body, callback) {
                var list = JSON.parse(body);
                if (list.error) {
                    return callback(list.error);
                }
                callback(null, list.items);
            },

            //-------------------------------------------
            // Get the file information of the children.
            //
            // ref: https://developers.google.com/drive/v2/reference/files/get
            //-------------------------------------------
            function (children, callback) {
                async.map(children, function (child, cback) {
                    request.get({
                        'url': endPoint + '/files/' + child.id,
                        'qs': {
                            'access_token': accessToken
                        }
                    }, function (err, response, body) {
                        body = JSON.parse(body);
                        cback(null, {
                            'title': body.title,
                            'md5Checksum': body.md5Checksum
                        });
                    }
                }, callback);
            }
        ], function (err, results) {
            if (!err) {
                //console.log(results);
                res.json(results);
            }
        });

    },
    upload: function (req, res) {
        var folderID = req.body.folderID;
        var data;

        async.waterfall([
            //取得Token
            getToken,
            //上傳檔案
            function (token, callback) {

            }
        ]);

    }
};