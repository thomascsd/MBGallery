/**
 * Created by thomas on 2014/1/20.
 */
"use strict";
var path = require('path');
var cons = require('consolidate');
var express = require('express');
var routes = require('./routes/');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var log = require('morgan');
var app = express();

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.use(log('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));

//Route
var apiRouter = express.Router();
apiRouter.get('/photos/:folderID', routes.photo.getPhotos);
apiRouter.post('/photos', routes.photo.upload);
app.use('/api', apiRouter);

//Default Route
app.route('/')
.get(routes.home.index);

app.listen(app.get('port'));