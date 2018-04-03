const express = require('express');
const app = express();
// const log4js = require('log4js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const path = require('path')

/*
log4js.configure({
	appenders: {
		console: {
			type: 'console'
		},
		file: {
			type: 'file',
			filename: 'cheese.log'
		}
	},
	categories: {
		cheese: {
			appenders: ['file'],
			level: 'info'
		},
		default: {
			appenders: ['console'],
			level: 'info'
		}
	}
});

var logger = log4js.getLogger('cheese');
*/

app.use(cookieParser())  //处理cookie
app.use(bodyParser.json());  //解析请求头 加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false }));  //加载解析urlencoded请求体的中间件
app.use(cookieParser());  //加载解析cookie的中间件
app.use(express.static('dist'));


var routes = require('./routes/index');
routes(app);


var server = app.listen(3001, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});


