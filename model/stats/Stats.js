const mongoose = require("mongoose");
const db = require("../db");

const statsSchema = new mongoose.Schema({
    totalCount: {type: Number},
    todayCount: {type: Number}
})

statsSchema.statics.find = function(conditions,callback){
    //查询
    this.model("Stats").find(conditions,callback);
}
statsSchema.statics.update = function(conditions,update,options,callback){
    //更新
    this.model("Stats").update(conditions,update,options,callback);
}

const statsModel = db.model('Stats',statsSchema)

module.exports = statsModel;