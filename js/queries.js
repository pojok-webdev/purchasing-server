var saveVendor = obj => {
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
    updateVendor = obj => {
        sql = 'update vendors ';
        sql+= 'set name="'+obj.name+'",';
        sql+= 'address="'+obj.address+'",';
        sql+= 'phone="'+obj.phone+'",';
        sql+= 'bankaccount="'+obj.bankaccount+'",';
        sql+= 'createuser="'+obj.createuser+'"';
        sql+= 'where id ="'+obj.id+'" '
        return sql;
    },
    getVendor = obj => {
        sql = 'select id,name,address,phone,bankaccount from vendors ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getVendors = () => {
        sql = 'select id,name,address,phone,bankaccount from vendors ';
        sql+= 'where status="1" '
        return sql;
    },
    getVendorpage = obj => {
        sql = 'select id,name,address,phone,bankaccount from vendors ';
        sql+= 'where status="1" '
        sql+= 'limit '+obj.page+','+obj.pageSize+' '
        return sql;
    },
    getVendorCount = () => {
        sql = 'select count(id)cnt from vendors ';
        sql+= 'where status="1" '
        return sql;
    }
    setVendorActive = obj => {
        sql = "update vendors set status='"+obj.status+"' "
        sql+= "where id="+obj.id+ " "
        return sql
    },
    searchVendor = obj => {
        sql = 'select id,name,address,phone,bankaccount from vendors '
        sql+= 'where status="1" '
        sql+= 'and ('
        sql+= 'name like "%'+obj.searchData+'%" ' 
        sql+= 'or address like "%'+obj.searchData+'%" '
        sql+= 'or phone like "%'+obj.searchData+'%" '
        sql+= 'or bankaccount like "%'+obj.searchData+'%" '
        sql+= ') '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        console.log('SQL',sql)
        return sql
    },
    searchVendorCount = obj => {
        sql = 'select count(id) cnt from vendors '
        sql+= 'where status="1" '
        sql+= 'and ('
        sql+= 'or like "%'+obj.searchData+'%" ' 
        sql+= 'or address like "%'+obj.searchData+'%" '
        sql+= 'or phone like "%'+obj.searchData+'%" '
        sql+= 'or bankaccount like "%'+obj.searchData+'%" '
        sql+= ') '
        console.log('SQL',sql)
        return sql
    }
    saveProduct = obj => {
        console.log("OBJ",obj)
        sql = 'insert into products ';
        sql+= '(name,vendor_id,category_id,partnumber,unit,discountlevel,createuser,price)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.vendor_id+'",';
        sql+= '"'+obj.category_id+'",';
        sql+= '"'+obj.partnumber+'",';
        sql+= '"'+obj.unit+'",';
        sql+= '"'+obj.discountlevel+'",';
        sql+= '"'+obj.createuser+'",';
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
    updateProduct = obj => {
        console.log("OBJ",obj)
        sql = 'update products ';
        sql+= 'set name="'+obj.name+'",';
        sql+= 'partnumber="'+obj.partnumber+'",';
        sql+= 'vendor_id="'+obj.vendor_id+'",';
        sql+= 'category_id="'+obj.category_id+'",';
        sql+= 'unit="'+obj.unit+'",';
        sql+= 'discountlevel="'+obj.discountlevel+'",';
        sql+= 'price="'+obj.price+'" ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getProduct = obj => {
        sql = 'select a.id,a.vendor_id,a.category_id,a.name,b.name vendor_name,c.name category_name,a.partnumber,a.unit,a.discountlevel,a.price,a.lastupdate from products a ';
        sql+= 'left outer join vendors b on b.id=a.vendor_id '
        sql+= 'left outer join categories c on c.id=a.category_id '
        sql+= 'where a.id="'+obj.id+'"';
        return sql;
    },
    getProducts = () => {
        sql = 'select a.id,a.vendor_id,a.category_id,b.name vendor_name,c.name category_name,a.name,a.partnumber,a.unit,a.discountlevel,a.price,a.lastupdate from products a ';
        sql+= 'left outer join vendors b on b.id=a.vendor_id '
        sql+= 'left outer join categories c on c.id=a.category_id '
        sql+= 'where a.status="1" '
        return sql;
    },
    getProductpage = obj => {
        sql = 'select a.id,a.vendor_id,a.category_id,a.name,b.name vendor_name,c.name category_name,a.partnumber,a.unit,a.discountlevel,a.price,a.lastupdate from products a ';
        sql+= 'left outer join vendors b on b.id=a.vendor_id '
        sql+= 'left outer join categories c on c.id=a.category_id '
        sql+= 'where a.status="1" '
        sql+= 'limit '+obj.page+','+obj.pageSize
        return sql;
    },
    getProductCount = obj => {
        sql = 'select count(id)cnt from products a ';
        sql+= 'where a.status="1" '
        return sql;
    },
    setProductActive = obj => {
        sql = "update products set status='"+obj.status+"' "
        sql+= "where id="+obj.id+ " "
        return sql
    },
    searchProduct = obj => {
        console.log("OBJ",obj)
        sql = 'select a.id,a.name,b.name vendor_name,c.name category_name,a.partnumber,a.unit,a.discountlevel,a.price,a.lastupdate from products a '
        sql+= 'left outer join vendors b on b.id=a.vendor_id '
        sql+= 'left outer join categories c on c.id=a.category_id '
        sql+= 'where  '
        sql+= ' ('
        sql+= 'a.name like "%'+obj.searchData+'%" ' 
        sql+= 'or a.partnumber like "%'+obj.searchData+'%" '
        sql+= 'or a.unit like "%'+obj.searchData+'%" '
        sql+= 'or b.name like "%'+obj.searchData+'%" '
        sql+= 'or c.name like "%'+obj.searchData+'%" '
        sql+= ') '
        sql+= 'and a.status="1" '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        console.log('SQL',sql)
        return sql
    },
    searchProductCount = obj => {
        sql = 'select count(a.id)cnt from products a '
        sql+= 'left outer join vendors b on b.id=a.vendor_id '
        sql+= 'left outer join categories c on c.id=a.category_id '
        sql+= 'where  '
        sql+= ' ('
        sql+= 'a.name like "%'+obj.searchData+'%" ' 
        sql+= 'or a.partnumber like "%'+obj.searchData+'%" '
        sql+= 'or a.unit like "%'+obj.searchData+'%" '
        sql+= 'or b.name like "%'+obj.searchData+'%" '
        sql+= 'or c.name like "%'+obj.searchData+'%" '
        sql+= ') '
        sql+= 'and a.status="1" '
        console.log('SQL',sql)
        return sql
    },
    saveCategory = obj => {
        console.log("OBJ",obj)
        sql = 'insert into categories ';
        sql+= '(name,description,createuser)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.description+'",';
        sql+= '"'+obj.createuser+'")';
        sql+= 'on duplicate key update ';
        sql+= 'name="'+obj.name+'",';
        sql+= 'description="'+obj.description+'",';
        sql+= 'createuser="'+obj.createuser+'" ';
        return sql;
    },
    updateCategory = obj => {
        console.log("OBJ",obj)
        sql = 'update categories ';
        sql+= 'set name="'+obj.name+'",';
        sql+= 'description="'+obj.description+'" ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getCategory = obj => {
        sql = 'select id,name,description,status,createuser,createdate from categories ';
        sql+= 'where id="'+obj.id+'" ';
        sql+= 'and status="1" '
        return sql;
    },
    getCategories = () => {
        sql = 'select id,name,description,status,createuser,createdate from categories ';
        sql+= 'where status="1" '
        return sql;
    },
    getCategorypage = obj => {
        sql = 'select id,name,description,status,createuser,createdate from categories ';
        sql+= 'where status="1" '
        sql+= 'limit '+obj.page+','+obj.pageSize
        return sql;
    },
    getCategoryCount = () => {
        sql = 'select count(id) cnt from categories ';
        sql+= 'where status="1" '
        return sql;
    },
    searchCategory = obj => {
        sql = 'select id,name,description,status,createuser,createdate from categories '
        sql+= 'where '
        sql+= 'status="1" '
        sql+= 'and '
        sql+= 'name like "%'+obj.searchData+'%" '
        console.log("Search Query",sql)
        return sql
    },
    searchCategoryCount = obj => {
        sql = 'select count(id) cnt from categories '
        sql+= 'where '
        sql+= 'status="1" '
        sql+= 'and '
        sql+= 'name like "%'+obj.searchData+'%" '
        console.log("Count Query",sql)
        return sql
    },
    setCategoryActive = obj => {
        sql = 'update categories '
        sql+= 'set status="'+obj.status+'" '
        sql+= 'where id='+obj.id+' '
        console.log('Query',sql)
        return sql
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
    getSubmissionpage = obj => {
        sql = 'select '
        sql+= 'submission_date,staff_name,implementation_target,purchase_target,createuser '
        sql+= 'from submissions '
        sql+= 'where status="1" '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        return sql
    },
    getSubmissioncount = obj => {
        sql = 'select count(id) cnt from submissions '
        return sql
    },
    searchSubmission = obj => {
        sql = 'select '
        sql+= 'a.submission_date,a.staff_name,a.implementation_target,a.purchase_target,a.createuser, '
        sql+= 'b.placement_location,b.vendor_comparation '
        sql+= 'from submissions a '
        sql+= 'left outer join submission_details b on b.submission_id=a.id '
        sql+= 'where '
        sql+= 'a.status="1" '
        sql+= 'and ('
        sql+= 'a.staff_name like "%'+obj.searchData+'%" '
        sql+= 'or b.itemname like "%'+obj.searchData+'%" '
        sql+= 'or b.brand like "%'+obj.searchData+'%" '
        sql+= 'or b.description like "%'+obj.searchData+'%" '
        sql+= 'or b.partnumber like "%'+obj.searchData+'%" '
        sql+= 'or b.proposed_vendor like "%'+obj.searchData+'%" '
        sql+= 'or b.vendor like "%'+obj.searchData+'%" '
        sql+= 'or b.information like "%'+obj.searchData+'%" '
        sql+= 'or b.placement_location like "%'+obj.searchData+'%" '
        sql+= 'or b.vendor_comparation like "%'+obj.searchData+'%" '
        sql+= ')'
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        console.log('SQL',sql)
        return sql
    },
    searchSubmissioncount = obj => {
        sql = 'select count(a.id) cnt '
        sql+= 'from submissions a '
        sql+= 'left outer join submission_details b on b.submission_id=a.id '
        sql+= 'where a.status="1" '
        sql+= 'and ('
        sql+= 'a.staff_name like "%'+obj.searchData+'%" '
        sql+= 'or b.itemname like "%'+obj.searchData+'%" '
        sql+= 'or b.brand like "%'+obj.searchData+'%" '
        sql+= 'or b.description like "%'+obj.searchData+'%" '
        sql+= 'or b.partnumber like "%'+obj.searchData+'%" '
        sql+= 'or b.proposed_vendor like "%'+obj.searchData+'%" '
        sql+= 'or b.vendor like "%'+obj.searchData+'%" '
        sql+= 'or b.information like "%'+obj.searchData+'%" '
        sql+= 'or b.placement_location like "%'+obj.searchData+'%" '
        sql+= 'or b.vendor_comparation like "%'+obj.searchData+'%" '
        sql+= ')'
        return sql
    },
    getSubmissionDetails = obj => {
        sql = 'select * from submission_details '
        sql+= 'where submission_id='+obj.submission_id+' '
        return sql
    },
    getSubmissionDetail = obj => {
        sql = 'select * from submission_details '
        sql+= 'where id = ' + obj.id
        return sql
    },
    saveSubmissionDetail = obj => {
        sql = 'insert into submission_details '
        sql+= '(submission_id,product_id,vendor_id,itemname,brand,partnumber,description,proposed_vendor,amount,proposed_price,proposed_totalprice,information,purchase_reason,placement_location,vendor_comparation,createuser) '
        sql+= 'values '
        sql+= '("'+obj.submission_id+'","'+obj.product_id+'","'+obj.vendor_id+'","'+obj.itemname+'","'+obj.brand+'","'+obj.partnumber+'","'+obj.description+'","'+obj.proposed_vendor+'","'+obj.amount+'","'+obj.proposed_price+'","'+obj.proposed_totalprice+'","'+obj.information+'","'+obj.purchase_reason+'","'+obj.placement_location+'","'+obj.vendor_comparation+'","'+obj.createuser+'") '
        console.log('SQL',sql)
        return sql
    },
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
    },
    getSubmissiondetailpage = obj => {
        sql = 'select '
        sql+= 'submission_id,itemname,brand,partnumber,description,proposed_vendor,'
        sql+= 'amount,proposed_price,proposed_totalprice,information,purchase_reason,'
        sql+= 'placement_location,vendor_comparation,createuser '
        sql+= 'from submission_details '
        sql+= 'where submission_id='+obj.submission_id+' '
        sql+= 'and status!="0" '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        return sql
    },
    getAllSubmissiondetailpage = obj => {
        sql = 'select '
        sql+= 'submission_id,itemname,brand,partnumber,description,proposed_vendor,'
        sql+= 'amount,proposed_price,proposed_totalprice,information,purchase_reason,'
        sql+= 'placement_location,vendor_comparation,createuser '
        sql+= 'from submission_details '
        sql+= 'where status="2" '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        return sql
    },
    getAllSubmissiondetailcount = obj => {
        sql = 'select '
        sql+= 'count(submission_id) cnt '
        sql+= 'from submission_details '
        sql+= 'where status="2" '
        return sql
    },
    getSubmissiondetailcount = obj => {
        sql = 'select count(id) cnt from submission_details '
        sql+= 'where submission_id='+obj.submission_id+' '
        sql+= 'and status!="0" '
        return sql
    },
    searchSubmissiondetail = obj => {
        sql = 'select '
        sql+= 'submission_id,itemname,brand,partnumber,description,proposed_vendor,'
        sql+= 'amount,proposed_price,proposed_totalprice,information,purchase_reason,'
        sql+= 'placement_location,vendor_comparation,createuser '
        sql+= 'from submission_details '
        sql+= 'where submission_id='+obj.submission_id+' '
        sql+= 'and status="1" '
        sql+= 'and ('
        sql+= 'itemname like "%'+obj.searchData+'%" '
        sql+= 'or brand like "%'+obj.searchData+'%" '
        sql+= 'or partnumber like "%'+obj.searchData+'%" '
        sql+= 'or description like "%'+obj.searchData+'%" '
        sql+= ')'
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        return sql
    },
    searchSubmissiondetailcount = obj => {
        sql = 'select count(submission_id)cnt '
        sql+= 'from submission_details '
        sql+= 'where submission_id='+obj.submission_id+' '
        sql+= 'and status="1" '
        sql+= 'and ('
        sql+= 'itemname like "%'+obj.searchData+'%" '
        sql+= 'or brand like "%'+obj.searchData+'%" '
        sql+= 'or partnumber like "%'+obj.searchData+'%" '
        sql+= 'or description like "%'+obj.searchData+'%" '
        sql+= ')'
        return sql
    },
    getUsers = () => {
        sql = 'select * from users '
        return sql
    },
    getUser = obj => {
        sql = 'select * from users '
        sql+= 'where id = ' + obj.id + ' '
        return sql
    },
    saveUser = obj => {
        sql = 'insert into users '
        sql+= '(username,email,salt,password,level,createuser) '
        sql+= 'values '
        sql+= '("'+obj.username+'","'+obj.email+'","'+obj.salt+'","'+obj.password+'","'+obj.level+'","'+obj.createuser+'")'
        return sql;
    },
    updateUser = obj => {
        sql = 'update users '
        sql+= 'set username="' + obj.username + '",email="' + obj.email + '",level="' + obj.level + '",active="' + obj.active + '" '
        sql+= 'where id=' + obj.id
        return sql
    },
    getUserByEmail = email => {
        sql = 'select * from users '
        sql+= 'where email="'+email+'"'
        return sql
    },
    changePassword = (email,password) => {
        sql = 'update users set password="'+password+'" '
        sql+= 'where email="'+email+'"'
        return sql
    },
    login = obj => {
        sql = 'select id,salt,password,defaultRoute,email,username from users '
        sql+= 'where email="'+obj.email+'" '
        return sql
    },
    updatePassword = (obj,password) => {
        sql = 'update users set password="'+password+'" '
        sql+= 'where email = "' + obj.email + '" '
        return sql
    },
    activateUser = (obj,active) => {
        sql = 'update users set active="'+active+'" '
        sql+= 'where email = "' + obj.email + '" '
        return sql
    },
    createUser = obj => {
        sql = 'insert into users '
        sql+= '(username,email,password,salt) '
        sql+= 'values '
        sql+= '("'+obj.username+'","'+obj.email+'","'+obj.password+'","'+obj.salt+'")'
        return sql
    }
    
module.exports = {
    saveVendor: saveVendor,
    getVendor: getVendor,
    getVendors:getVendors,
    setVendorActive:setVendorActive,
    saveProduct:saveProduct,
    getProduct:getProduct,
    getProducts:getProducts,
    getProductpage : getProductpage,
    getProductCount : getProductCount,
    updateProduct:updateProduct,
    searchProduct : searchProduct,
    searchProductCount : searchProductCount,
    setProductActive:setProductActive,
    updateVendor:updateVendor,
    getVendorpage : getVendorpage,
    getVendorCount : getVendorCount,
    searchVendor : searchVendor,
    searchVendorCount : searchVendorCount,
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
    getAllSubmissiondetailpage:getAllSubmissiondetailpage,
    getAllSubmissiondetailcount:getAllSubmissiondetailcount,
    updateSubmissionDetail:updateSubmissionDetail,
    getSubmissiondetailpage:getSubmissiondetailpage,
    getSubmissiondetailcount:getSubmissiondetailcount,
    searchSubmissiondetail:searchSubmissiondetail,
    searchSubmissiondetailcount:searchSubmissiondetailcount,
    getSubmissionpage:getSubmissionpage,
    getSubmissioncount:getSubmissioncount,
    searchSubmission:searchSubmission,
    searchSubmissioncount:searchSubmissioncount,
    getCategories:getCategories,
    getCategory:getCategory,
    saveCategory:saveCategory,
    updateCategory:updateCategory,
    getCategoryCount:getCategoryCount,
    getCategorypage:getCategorypage,
    searchCategory : searchCategory,
    searchCategoryCount : searchCategoryCount,
    setCategoryActive : setCategoryActive,
    login:login,
    updatePassword:updatePassword,
    activateUser:activateUser,
    createUser:createUser
}
