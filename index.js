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

app.use(cookieParser()) //处理cookie
app.use(bodyParser.json()); //解析请求头 加载解析json的中间件
app.use(bodyParser.urlencoded({
    extended: false
})); //加载解析urlencoded请求体的中间件
app.use(cookieParser()); //加载解析cookie的中间件
app.use(express.static('dist'));


var routes = require('./routes/index');
routes(app);

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql', 'app', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
});

//检测数据库连接
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



var Servers = sequelize.define("servers", {
    //对应数据库表中的字段
    Server_name: {
        type: Sequelize.STRING
    },
    Host: {
        type: Sequelize.STRING
    },
    Db: {
        type: Sequelize.STRING
    },
    Username: {
        type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
    },
    Port: {
        type: Sequelize.STRING
    },
    Socket: {
        type: Sequelize.STRING
    },
    Wrapper: {
        type: Sequelize.STRING
    },
    Owner: {
        type: Sequelize.STRING
    },
},{
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
})

/*
* 创建
Servers.sync({force: true}).then(function () {
    // 表创建完成
    return Servers.create({
        Server_name: 'nic',
        Host: 'localhost',
        Db: 'db',
        Username: 'username',
        Password: 'password',
        Port: 'port',
        Socket: 'socket',
        Wrapper: 'wrapper',
        Owner: 'owner'
    });
  });
*/
console.log('**********************************');
//查看sequelize中的模型
console.log(sequelize.models);
console.log('**********************************');

//执行查询语句
/*
sequelize.query('SELECT * FROM servers').spread(function (results, metadata) {
    // Raw query - use spread
    console.log(results[0].Server_name);
    console.log(metadata[0]);
});
*/

//
Servers.findAll({}).then((data)=>{
    console.log(data[0].dataValues);
})

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});