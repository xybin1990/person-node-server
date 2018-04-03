const mongoose = require("mongoose");

const db = mongoose.createConnection("mongodb://47.75.47.239:27017/test");

db.once("open",(callback)=>{
    console.log("数据库test连接成功...");
})

module.exports = db;