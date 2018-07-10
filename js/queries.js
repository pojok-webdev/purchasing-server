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
        sql+= '(name,vendor_id,category_id,partnumber,unit,discountlevel,price)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.vendor_id+'",';
        sql+= '"'+obj.category_id+'",';
        sql+= '"'+obj.partnumber+'",';
        sql+= '"'+obj.unit+'",';
        sql+= '"1",';
        sql+= '"'+obj.price+'")';
        sql+= 'on duplicate key update ';
        sql+= 'name="'+obj.name+'",';
        sql+= 'vendor_id="'+obj.vendor_id+'",';
        sql+= 'category_id="'+obj.category_id+'",';
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
        sql+= 'vendor_id="'+obj.vendor_id+'",';
        sql+= 'category_id="'+obj.category_id+'",';
        sql+= 'unit="'+obj.unit+'",';
        sql+= 'discountlevel="1",';
        sql+= 'price="'+obj.price+'" ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getProduct = (obj) => {
        sql = 'select id,vendor_id,category_id,name,partnumber,unit,discountlevel,price,lastupdate from products ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getProducts = () => {
        sql = 'select id,vendor_id,category_id,name,partnumber,unit,discountlevel,price,lastupdate from products ';
        return sql;
    },
    saveCategory = (obj) => {
        console.log("OBJ",obj)
        sql = 'insert into categories ';
        sql+= '(name,description)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.description+'")';
        sql+= 'on duplicate key update ';
        sql+= 'name="'+obj.name+'",';
        sql+= 'description="'+obj.description+'" ';
        return sql;
    },
    updateCategory = (obj) => {
        console.log("OBJ",obj)
        sql = 'update categories ';
        sql+= 'set name="'+obj.name+'",';
        sql+= 'description="'+obj.description+'" ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getCategory = (obj) => {
        sql = 'select id,name,description,createuser,createdate from categories ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getCategories = () => {
        sql = 'select id,name,description,createuser,createdate from categories ';
        return sql;
    },
    saveSubmission = obj => {
        sql = 'insert into submissions ';
        sql+= '(submission_date,staff_name,implementation_target,purchase_target,createuser)';
        sql+= 'values ';
        sql+= '("'+obj.submission_date+'","'+obj.staff_name+'","'+obj.implementation_target+'","'+obj.purchase_target+'","'+obj.createuser+'")';
        return sql;
    },
    getSubmissions = () => {
        sql = 'select * from submissions ';
        return sql;
    },
    getSubmissionDetails = (obj) => {
        sql = 'select * from submission_details '
        sql+= 'where submission_id='+obj.submission_id+' '
        return sql
    },
    getSubmissionDetail = (obj) => {
        sql = 'select * from submission_details '
        sql+= 'where id = ' + obj.id
        return sql
    },
    saveSubmissionDetail = obj => {
        sql = 'insert into submission_details '
        sql+= '(submission_id,itemname,brand,partnumber,description,proposed_vendor,amount,proposed_price,proposed_totalprice,information,purchase_reason,placement_location,vendor_comparation,createuser) '
        sql+= 'values '
        sql+= '("'+obj.submission_id+'","'+obj.itemname+'","'+obj.brand+'","'+obj.partnumber+'","'+obj.description+'","'+obj.proposed_vendor+'","'+obj.amount+'","'+obj.proposed_price+'","'+obj.proposed_totalprice+'","'+obj.information+'","'+obj.purchase_reason+'","'+obj.placement_location+'","'+obj.vendor_comparation+'","'+obj.createuser+'") '
        return sql
    }
    updateSubmissionDetail = obj => {
        sql = 'update submission_details '
        sql+= 'set item_name="'+obj.item_name+'",'
        sql+= 'brand="'+obj.brand+'",'
        sql+= 'partnumber="'+obj.partnumber+'",'
        sql+= 'description="'+obj.description+'",'
        sql+= 'proposed_vendor="'+obj.proposed_vendor+'",'
        sql+= 'amount="'+obj.amount+'",'
        sql+= 'proposed_price="'+obj.proposed_price+'",'
        sql+= 'proposed_totalprice="'+obj.proposed_totalprice+'",'
        sql+= 'vendor="'+obj.vendor+'",'
        sql+= 'price="'+obj.price+'",'
        sql+= 'totalprice="'+obj.totalprice+'",'
        sql+= 'information="'+obj.information+'",'
        sql+= 'purchase_reason="'+obj.purchase_reason+'",'
        sql+= 'placement_location="'+obj.placement_location+'",'
        sql+= 'vendor_comparation="'+obj.vendor_comparation+'" '
        return sql
    }
    getUsers = () => {
        sql = 'select * from users '
        return sql
    }
    getUser = (obj) => {
        sql = 'select * from users '
        sql+= 'where id = ' + obj.id + ' '
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
        sql+= 'set username="' + obj.username + '",email="' + obj.email + '",level="' + obj.level + '",active="' + obj.active + '" '
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
    getUsers:getUsers,
    getUser:getUser,
    saveUser:saveUser,
    updateUser:updateUser,
    getUserByEmail:getUserByEmail,
    changePassword:changePassword,
    getSubmissionDetails:getSubmissionDetails,
    getSubmissionDetail:getSubmissionDetail,
    saveSubmissionDetail:saveSubmissionDetail,
    updateSubmissionDetail:updateSubmissionDetail,
    getCategories:getCategories,
    getCategory:getCategory,
    saveCategory:saveCategory,
    updateCategory:updateCategory
}
