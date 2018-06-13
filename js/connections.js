mysql = require("promise-mysql"),
config = require("./configs.js");
getdata = function(sql,callback){
    mysqlconfig = config.mysql();
    con = mysql.createConnection({
        host:mysqlconfig.host,
        database:mysqlconfig.database,
        user:mysqlconfig.user,
        password:mysqlconfig.password
    })
    .then(function(cn){
        var result = cn.query(sql);
        cn.end();
        return result;
    })
    .then(function(rows){
        callback(rows);
    })
    .error(function(err){
        console.log('Connection error',err);
    })
};
module.exports = {
    getdata: getdata
};