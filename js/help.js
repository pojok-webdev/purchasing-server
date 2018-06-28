var config = require("./configs.js"),
    appconfig = config.appserver(),
    server = appconfig.name,
    port = appconfig.port;
getdata = function(method){
    switch(method){
        case 'getvendors' :
            return {
                method:"get",
                name:"getvendors",
                format:"json",
                description:"get list of all vendors from database",
                syntax:"getvendors"
            }
        case 'getvendor' : 
            return {
                method:"get",
                name:"getvendor",
                format:"json",
                description:"get certain vendor by id from database",
                syntax:"getvendor/:vendor_id"
            }
        case 'savevendor' : 
            return {
                method:"post",
                name:"savevendor",
                format:"json",
                description:"save a vendor into database",
                syntax:'curl -d "name=vendors name&address=vendors address&phone=vendors phone&bankaccount=vendors bank account&createuser=vendors create user" -X POST http://'+server+':'+port+'/savevendor'
            }
        case 'updatevendor' : 
            return {
                method:"post",
                name:"updatevendor",
                format:"json",
                description:"update a vendor into database",
                syntax:'curl -d "id=vendors id&name=vendors name&address=vendors address&phone=vendors phone&bankaccount=vendors bank account&createuser=vendors createuser" -X POST http://'+server+':'+port+'/updatevendor',
                example:'curl -d "id=1&name=ABC, PT&address=jl mayjen sungkono 83&phone=031 88776655&bankaccount=001234455667&createuser=puji" -X POST http://'+server+':'+port+'/updatevendor'
            }
        case 'getproducts' :
            return {
                method:"get",
                name:"getproducts",
                format:"json",
                description:"get list of all products from database",
                syntax:"getproducts"
            }
        case 'getproduct' : 
            return {
                method:"get",
                name:"getproduct",
                format:"json",
                description:"get certain product by id from database",
                syntax:"getproduct/:product_id"
            }
        case 'saveproduct' : 
            return {
                method:"post",
                name:"saveproduct",
                format:"json",
                description:"save a product into database",
                syntax:'curl -d "name=laptop&partnumber=112 334 53436&unit=buah&price=4750000&discountlevel=1" -X POST http://'+server+':'+port+'/saveproduct',
                example:'curl -d "name=laptop&partnumber=112 334 53436&unit=buah&price=4750000&discountlevel=1" -X POST http://'+server+':'+port+'/saveproduct'
            }
        case 'updateproduct' : 
            return {
                method:"post",
                name:"updateproduct",
                format:"json",
                description:"update a product into database",
                syntax:'curl -d "id=product id&name=product name&partnumber=product partnumber&unit=product unit&price=product price&discountlevel=product discountlevel" -X POST http://'+server+':'+port+'/updateproduct',
                example:'curl -d "id=1&name=laptop&partnumber=112 334 53436&unit=buah&price=4750000&discountlevel=1" -X POST http://'+server+':'+port+'/updateproduct'
            }
        default:
            return {
                method:"",
                name:"",
                format:"",
                description:"",
                syntax:"",
                example:""            
            }
        }
}
module.exports = {
    getdata:getdata
}