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
                syntax:'curl -d "name=vendors name&address=vendors address&phone=vendors phone&bankaccount=vendors bank account&createuser=vendors create user" -X POST http://localhost:2018/savevendor'
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
                syntax:'curl -d "name=laptop&partnumber=112 334 53436&unit=buah&price=4750000&discountlevel=1" -X POST http://<%= data.server %>:<%= data.port %>/saveproduct',
                example:'curl -d "name=laptop&partnumber=112 334 53436&unit=buah&price=4750000&discountlevel=1" -X POST http://<%= data.server %>:<%= data.port %>/saveproduct'
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