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

var totalCount = 0;
var todayCount = 0;
//网站访问统计statistics
app.post("/stat",function(req,res){
	todayCount++;
	res.json({
		totalCount: totalCount + todayCount,
		todayCount: todayCount
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});


