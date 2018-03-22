const express = require('express');
const app = express();
const log4js = require('log4js');

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


app.use(express.static('dist'));

//日志系统如果放在静态文件之前可以监听到静态文件的请求
//如果放在静态文件之后，则不会对静态文件的请求打上日志系统
app.use(log4js.connectLogger(logger, { level: 'info' }));



//API接口返回后台数据
app.post('/test', function (req, res) {
	console.log(req);
	res.json({test:"test"});
});


var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});


