var config = require("./configs.js"),
    appconfig = config.appserver(),
    server = appconfig.name,
    port = appconfig.port;
getdata = function(method){
    console.log("Method:",method)
    switch(method){
        case 'getvendors' :
            return {
                method:"get",
                name:"getvendors",
                format:"json",
                description:"get list of all vendors from database",
                syntax:"getvendors",
                example:""
            }
        case 'getvendor' : 
            return {
                method:"get",
                name:"getvendor",
                format:"json",
                description:"get certain vendor by id from database",
                syntax:"getvendor/:vendor_id",
                example:""
            }
        case 'savevendor' : 
            return {
                method:"post",
                name:"savevendor",
                format:"json",
                description:"save a vendor into database",
                syntax:'curl -d "name=vendors name&address=vendors address&phone=vendors phone&bankaccount=vendors bank account&createuser=vendors create user" -X POST http://'+server+':'+port+'/savevendor',
                example:""
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
        case 'setvendoractive':
            return {
                method:'get',
                name:'setvendoractive',
                format:'json',
                description:'update status of vendor, 1 or 0',
                syntax:'http://'+server+':'+port+'/setvendoractive/<vendor_id>/<status>',
                example:'curl http://localhost:2000/setvendoractive/1/1'
            }
        case 'getproducts' :
            return {
                method:"get",
                name:"getproducts",
                format:"json",
                description:"get list of all products from database",
                syntax:"getproducts",
                example:""
            }
        case 'getproduct' : 
            return {
                method:"get",
                name:"getproduct",
                format:"json",
                description:"get certain product by id from database",
                syntax:"getproduct/:product_id",
                example:""
            }
        case 'saveproduct' : 
            return {
                method:"post",
                name:"saveproduct",
                format:"json",
                description:"save a product into database",
                syntax:'curl -d "name=product name&vendor_id=id of vendor&category_id=id of category&partnumber=part number&unit=unit&price=price&discountlevel=discountlevel" -X POST http://'+server+':'+port+'/saveproduct',
                example:'curl -d "name=laptop&vendor_id=1&category_id=1&partnumber=112 334 53436&unit=buah&price=4750000&discountlevel=1" -X POST http://'+server+':'+port+'/saveproduct'
            }
        case 'updateproduct' : 
            return {
                method:"post",
                name:"updateproduct",
                format:"json",
                description:"update a product into database",
                syntax:'curl -d "id=product id&name=product name&vendor_id=id of vendor&category_id=id of category&partnumber=product partnumber&unit=product unit&price=product price&discountlevel=product discountlevel" -X POST http://'+server+':'+port+'/updateproduct',
                example:'curl -d "id=1&name=laptop&vendor_id=1&category_id=1&partnumber=112 334 53436&unit=buah&price=4750000&discountlevel=1" -X POST http://'+server+':'+port+'/updateproduct'
            }
        case 'setproductactive':
            return {
                method:'get',
                name:'setproductactive',
                format:'json',
                description:'update status of product, 1 or 0',
                syntax:'http://'+server+':'+port+'/setproductactive/<product_id>/<status>',
                example:'curl http://localhost:2000/setproductactive/1/1'
            }

        case 'getcategories' :
            return {
                method:"get",
                name:"getcategories",
                format:"json",
                description:"get list of all categories from database",
                syntax:"getcategories",
                example:""
            }
        case 'getcategory' : 
            return {
                method:"get",
                name:"getcategory",
                format:"json",
                description:"get certain category by id from database",
                syntax:"getcategory/:category_id",
                example:""
            }
        case 'savecategory' : 
            return {
                method:"post",
                name:"savecategory",
                format:"json",
                description:"save a category into database",
                syntax:'curl -d "name=category name&description=description of category" -X POST http://'+server+':'+port+'/saveproduct',
                example:'curl -d "name=category name&description=description of category" -X POST http://'+server+':'+port+'/saveproduct'
            }
        case 'updatecategory' : 
            return {
                method:"post",
                name:"updatecategory",
                format:"json",
                description:"update a category into database",
                syntax:'curl -d "id=category id&name=category name&description=description of category" -X POST http://'+server+':'+port+'/updateproduct',
                example:'curl -d "id=1&name=laptop&description=category description" -X POST http://'+server+':'+port+'/updateproduct'
            }

        case 'savesubmission':
            return {
                method: "post",
                name:"savesubmission",
                format:"json",
                description:"save a submission (membuat pengajuan pembelian)",
                syntax:'curl -d "staff_name=staff name&submission_date=submission date&implementation_target=implementation target date&purchase_target=purchase target date&createuser=user created" -X POST http://'+server+':'+port+'/savesubmission',
                example:'curl -d "staff_name=puji&submission_date=2018-7-2&implementation_target=2018-7-30&purchase_target=2018-7-25&createuser=pujiw" -X POST http://'+server+':'+port+'/savesubmission'
            }
        case 'getsubmissions':
            return {
                method:'get',
                name:'getsubmissions',
                format:'json',
                description:'show all saved submissions (pengajuan pembelian)',
                syntax:'',
                example:""
            }
        case 'saveuser':
            return {
                method:'post',
                name:'saveuser',
                format:'json',
                description:'save a user',
                syntax:'curl -d "username=username&password=user password&email=user email&level=user level&createuser=user who create this user" -X POST http://localhost:2018/saveuser',
                example:'curl -d "username=agus&password=agus&email=agus@padi.net.id&level=1&createuser=puji" -X POST http://localhost:2018/saveuser'
            }
        case 'updateuser':
            return {
                method:'post',
                name:'updateuser',
                format:'json',
                description:'update a user, fetch the user first before update to get current users datas',
                syntax:'curl -d "id=userid&username=username&password=user password&email=user email&level=user level&active=user status&createuser=user who create this user" -X POST http://localhost:2018/updateuser',
                example:'curl -d "id=1&username=agus&password=agus&email=agus@padi.net.id&level=1&active=1&createuser=puji" -X POST http://localhost:2018/updateuser'
            }
        case 'changepassword':
            return {
                method:'post',
                name:'changepassword',
                format:'json',
                description:'change user s password',
                syntax:'',
                example:""
            }
        case 'login':
            return {
                method:'post',
                name:'login',
                format:'json / boolean',
                description:'login, return false if password/email incorrect, otherwise return user object',
                syntax:'',
                example:""
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