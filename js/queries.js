var saveVendor = (obj)=>{
        sql = 'insert into vendors ';
        sql+= '(name,address,phone,bankaccount)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.address+'",';
        sql+= '"'+obj.phone+'",';
        sql+= '"'+obj.bankaccount+'"';
        sql+= ')';
        sql+= 'on duplicate key update ';
        sql+= 'name="'+obj.name+'",';
        sql+= 'address="'+obj.address+'",'
        sql+= 'phone="'+obj.phone+'",';
        sql+= 'bankaccount="'+obj.bankaccount+'" '
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
        sql = 'insert into products ';
        sql+= '(name,partnumber,unit,discountlevel,price,lastupdate)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.partnumber+'",';
        sql+= '"'+obj.unit+'",';
        sql+= '"'+obj.discountlevel+'",';
        sql+= '"'+obj.price+'",';
        sql+= '"'+obj.lastupdate+'")';
        sql+= 'on duplicate key update ';
        sql+= 'name="'+obj.name+'",';
        sql+= 'address="'+obj.partnumber+'",'
        sql+= 'phone="'+obj.unit+'",';
        sql+= 'bankaccount="'+obj.discountlevel+'", '
        sql+= 'phone="'+obj.price+'",';
        sql+= 'bankaccount="'+obj.lastupdate+'" '
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
