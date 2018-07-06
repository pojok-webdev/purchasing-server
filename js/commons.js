var crypto = require('crypto'),
    query = require('./../js/queries.js'),
    con = require('./../js/connections.js') ;
randomString = length => {
    var result = '',
        chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
createUser = (obj,callback)=>{
    var _obj = {
        username : obj.username,
        password: '',
        salt:'',
        email:obj.email,
        level:obj.level,
        createuser:obj.createuser
    }
    createHash(randomString(32),result=>{
        console.log("_obj 1",_obj)
        _obj.salt = result
        createHash(obj.password+result,passwordresult=>{
            _obj.password = passwordresult
            console.log("_obj 2",_obj)
            callback(_obj)
        })
    })
}
createHash = (tohash,callback) => {
    hash = crypto.createHash('sha256')
    hash.on('readable',()=>{
        data = hash.read()
        if(data){
            callback(data.toString('hex'))
        }
    })
    hash.write(tohash)
    hash.end()
}
saveUser = (user)=>{
    createUser(user,obj=>{
        con.getdata(query.saveUser(obj),result=>{
            return result
        })    
    })
}
getUserByEmail = (email,callback) => {
    con.getdata(query.getUserByEmail(email),result=>{
        callback(result[0])
    })
}
changePassword = (email,password) => {
    var _obj
    getUserByEmail(email,obj=>{
        console.log("Result",obj)
        _obj = obj
        createHash(password+obj.salt,result=>{
            _obj.password = result
            con.getdata(query.changePassword(email,_obj.password),res=>{
                return _obj
            })
        })
    });
}
login = (email,password) => {
    getUserByEmail(email,obj=>{
        createHash(password+obj.salt,result=>{
            if(result===obj.password){
                console.log('Password cocok')
                return obj
            }else{
                console.log('Password tidak cocok')
                return false
            }
        })
    })
}
module.exports = {
    randomString : randomString,
    createHash:createHash,
    createUser:createUser,
    saveUser:saveUser,
    changePassword:changePassword,
    login:login
}