/**
 * Created by thomas on 2014/1/20.
 */
"use strict";
var path = require('path');
var cons = require('consolidate');
var express = require('express');
var routes = require('./routes/');

var app = express();

app.configure(function () {
    app.engine('html', cons.handlebars);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'bower_components')));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.home.index);

app.get('/api/photos/:folderID', routes.photo.getPhotos);
app.post('/api/photos', routes.photo.upload);

app.listen(app.get('port'));