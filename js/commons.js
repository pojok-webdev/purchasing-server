var crypto = require('crypto'),
    query = require('./../js/queries.js'),
    con = require('./../js/connections.js') ;
randomString = length => {
    var result = '',
        chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
createuser = (username,password,email)=>{
    var obj = {
        username : username,
        password: '',
        salt:'',
        email:email
    }
    createHash(randomString(32),result=>{
        obj.salt = result
    })
    createHash(password+obj.salt,result=>{
        obj.password = result
    })
    return obj
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
saveUser = (username,password,email)=>{
    obj = createuser(username,password,email)    
    con.getdata(query.saveUser(obj),result=>{
        return result
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
            }else{
                console.log('Password tidak cocok')
            }
            return result
        })
    })
}
module.exports = {
    randomString : randomString,
    createHash:createHash,
    createuser:createuser,
    saveUser:saveUser,
    changePassword:changePassword,
    login:login
}