var saveVendor = (obj)=>{
        sql = 'insert into vendors ';
        sql+= '(name,address,phone,bankaccount,createuser)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.address+'",';
        sql+= '"'+obj.phone+'",';
        sql+= '"'+obj.bankaccount+'",';
        sql+= '"'+obj.createuser+'"';
        sql+= ')';
        sql+= 'on duplicate key update ';
        sql+= 'name="'+obj.name+'",';
        sql+= 'address="'+obj.address+'",'
        sql+= 'phone="'+obj.phone+'",';
        sql+= 'bankaccount="'+obj.bankaccount+'", '
        sql+= 'createuser="'+obj.createuser+'" '
        return sql;
    }
    getVendor = (obj)=>{
        sql = 'select name,address,phone,bankaccount from vendors ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    }
    getVendors = ()=>{
        sql = 'select name,address,phone,bankaccount from vendors ';
        return sql;
    },
    saveProduct = (obj)=>{
        console.log("OBJ",obj)
        sql = 'insert into products ';
        sql+= '(name,partnumber,unit,discountlevel,price)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.partnumber+'",';
        sql+= '"'+obj.unit+'",';
        sql+= '"1",';
        sql+= '"'+obj.price+'")';
        sql+= 'on duplicate key update ';
        sql+= 'name="'+obj.name+'",';
        sql+= 'partnumber="'+obj.partnumber+'",'
        sql+= 'unit="'+obj.unit+'",';
        sql+= 'discountlevel="1", '
        sql+= 'price="'+obj.price+'"';
        return sql;
    },
    getProduct = (obj)=>{
        sql = 'select name,partnumber,unit,discountlevel,price,lastupdate from products ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getProducts = ()=>{
        sql = 'select name,partnumber,unit,discountlevel,price,lastupdate from products ';
        return sql;
    },

module.exports = {
    saveVendor: saveVendor,
    getVendor: getVendor,
    getVendors:getVendors,
    saveProduct:saveProduct,
    getProduct:getProduct,
    getProducts:getProducts
}
