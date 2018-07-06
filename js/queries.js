var saveVendor = (obj) => {
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
    },
    updateVendor = (obj) => {
        sql = 'update vendors ';
        sql+= 'set name="'+obj.name+'",';
        sql+= 'address="'+obj.address+'",';
        sql+= 'phone="'+obj.phone+'",';
        sql+= 'bankaccount="'+obj.bankaccount+'",';
        sql+= 'createuser="'+obj.createuser+'"';
        sql+= 'where id ="'+obj.id+'" '
        return sql;
    },
    getVendor = (obj) => {
        sql = 'select id,name,address,phone,bankaccount from vendors ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    }
    getVendors = () => {
        sql = 'select id,name,address,phone,bankaccount from vendors ';
        return sql;
    },
    saveProduct = (obj) => {
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
    updateProduct = (obj) => {
        console.log("OBJ",obj)
        sql = 'update products ';
        sql+= 'set name="'+obj.name+'",';
        sql+= 'partnumber="'+obj.partnumber+'",';
        sql+= 'unit="'+obj.unit+'",';
        sql+= 'discountlevel="1",';
        sql+= 'price="'+obj.price+'" ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getProduct = (obj)=>{
        sql = 'select id,name,partnumber,unit,discountlevel,price,lastupdate from products ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getProducts = () => {
        sql = 'select id,name,partnumber,unit,discountlevel,price,lastupdate from products ';
        return sql;
    },
    saveSubmission = obj => {
        sql = 'insert into submissions ';
        sql+= '(submission_date,staff_name,implementation_target,purchase_target,createuser)';
        sql+= 'values ';
        sql+= '("'+obj.submission_date+'","'+obj.staff_name+'","'+obj.implementation_target+'","'+obj.purchase_target+'","'+obj.createuser+'")';
        return sql;
    },
    getSubmissions = ()=>{
        sql = 'select * from submissions ';
        return sql;
    },
    saveSubmissionDetail = obj => {
        sql = 'insert into submission_details '
        sql+= '(submission_id,itemname,brand,partnumber,description,proposed_vendor,amount,proposed_price,proposed_totalprice,information,purchase_reason,placement_location,vendor_comparation,createuser) '
        sql+= 'values '
        sql+= '("'+obj.submission_id+'","'+obj.itemname+'","'+obj.brand+'","'+obj.partnumber+'","'+obj.description+'","'+obj.proposed_vendor+'","'+obj.amount+'","'+obj.proposed_price+'","'+obj.proposed_totalprice+'","'+obj.information+'","'+obj.purchase_reason+'","'+obj.placement_location+'","'+obj.vendor_comparation+'","'+obj.createuser+'") '
        return sql
    }
    saveUser = obj => {
        sql = 'insert into users '
        sql+= '(username,email,salt,password,level,createuser) '
        sql+= 'values '
        sql+= '("'+obj.username+'","'+obj.email+'","'+obj.salt+'","'+obj.password+'","'+obj.level+'","'+obj.createuser+'")'
        return sql;
    }
    updateUser = obj => {
        sql = 'update users '
        sql+= 'set username="' + obj.username + '",email="' + obj.email + '",level="' + obj.level + '" '
        sql+= 'where id=' + obj.id
        return sql
    }
    getUserByEmail = email => {
        sql = 'select * from users '
        sql+= 'where email="'+email+'"'
        return sql
    }
    changePassword = (email,password) => {
        sql = 'update users set password="'+password+'" '
        sql+= 'where email="'+email+'"'
        return sql
    }
module.exports = {
    saveVendor: saveVendor,
    getVendor: getVendor,
    getVendors:getVendors,
    saveProduct:saveProduct,
    getProduct:getProduct,
    getProducts:getProducts,
    updateProduct:updateProduct,
    updateVendor:updateVendor,
    saveSubmission:saveSubmission,
    getSubmissions:getSubmissions,
    saveUser:saveUser,
    updateUser:updateUser,
    getUserByEmail:getUserByEmail,
    changePassword:changePassword,
    saveSubmissionDetail:saveSubmissionDetail
}
