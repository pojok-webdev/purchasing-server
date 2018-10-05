var saveVendor = obj => {
        sql = 'insert into vendors ';
        sql+= '(name,address,phone,bankaccount,namecard,offeringsample,invoicesample,receiptsample,createuser)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.address+'",';
        sql+= '"'+obj.phone+'",';
        sql+= '"'+obj.bankaccount+'",';



        sql+= '"'+obj.namecard+'",';
        sql+= '"'+obj.offeringsample+'",';
        sql+= '"'+obj.invoicesample+'",';
        sql+= '"'+obj.receiptsample+'",';



        sql+= '"'+obj.createuser+'"';
        sql+= ')';
        sql+= 'on duplicate key update ';
        sql+= 'name="'+obj.name+'",';
        sql+= 'address="'+obj.address+'",'
        sql+= 'phone="'+obj.phone+'",';
        sql+= 'bankaccount="'+obj.bankaccount+'", '




        sql+= 'namecard="'+obj.namecard+'",';
        sql+= 'offeringsample="'+obj.offeringsample+'",'
        sql+= 'invoicesample="'+obj.invoicesample+'",';
        sql+= 'receiptsample="'+obj.receiptsample+'", '

        sql+= 'createuser="'+obj.createuser+'" '
        return sql;
    },
    updateVendor = obj => {
        sql = 'update vendors ';
        sql+= 'set name="'+obj.name+'",';
        sql+= 'address="'+obj.address+'",';
        sql+= 'phone="'+obj.phone+'",';
        sql+= 'bankaccount="'+obj.bankaccount+'",';

        sql+= 'namecard="'+obj.namecard+'",';
        sql+= 'offeringsample="'+obj.offeringsample+'",';
        sql+= 'invoicesample="'+obj.invoicesample+'",';
        sql+= 'receiptsample="'+obj.receiptsample+'",';




        sql+= 'createuser="'+obj.createuser+'"';
        sql+= 'where id ="'+obj.id+'" '
        console.log('SQL',sql)
        return sql;
    },
    getVendor = obj => {
        sql = 'select id,name,address,phone,bankaccount,namecard,offeringsample,invoicesample,receiptsample from vendors ';
        sql+= 'where id="'+obj.id+'" '
        sql+= 'order by name asc '
        return sql;
    },
    getVendors = () => {
        sql = 'select id,name,address,phone,bankaccount,namecard,offeringsample,invoicesample,receiptsample from vendors ';
        sql+= 'where status="1" '
        sql+= 'order by name asc '
        return sql;
    },
    getVendorpage = obj => {
        sql = 'select id,name,address,phone,bankaccount,namecard,offeringsample,invoicesample,receiptsample from vendors ';
        sql+= 'where status="1" '
        sql+= 'order by name asc '
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
        sql = 'select id,name,address,phone,bankaccount,namecard,offeringsample,invoicesample,receiptsample from vendors '
        sql+= 'where status="1" '
        sql+= 'and ('
        sql+= 'name like "%'+obj.searchData+'%" ' 
        sql+= 'or address like "%'+obj.searchData+'%" '
        sql+= 'or phone like "%'+obj.searchData+'%" '
        sql+= 'or bankaccount like "%'+obj.searchData+'%" '
        sql+= ') '
        sql+= 'order by name asc '
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
        sql+= '(name,category_id,partnumber,unit,createuser)';
        sql+= 'values ';
        sql+= '(';
        sql+= '"'+obj.name+'",';
        sql+= '"'+obj.category_id+'",';
        sql+= '"'+obj.partnumber+'",';
        sql+= '"'+obj.unit+'",';
        sql+= '"'+obj.createuser+'") ';
        return sql;
    },
    updateProduct = obj => {
        console.log("OBJ",obj)
        sql = 'update products ';
        sql+= 'set name="'+obj.name+'",';
        sql+= 'partnumber="'+obj.partnumber+'",';
        sql+= 'category_id="'+obj.category_id+'",';
        sql+= 'unit="'+obj.unit+'" ';
        sql+= 'where id="'+obj.id+'"';
        return sql;
    },
    getProduct = obj => {
        sql = 'select a.id,a.category_id,a.name,b.name category_name,a.partnumber,a.unit,a.lastupdate from products a ';
        sql+= 'left outer join categories b on b.id=a.category_id '
        sql+= 'where a.id="'+obj.id+'" ';
        sql+= 'order by a.name asc '
        return sql;
    },
    getProducts = () => {
        sql = 'select a.id,a.category_id,b.name category_name,a.name,a.partnumber,a.unit,a.lastupdate from products a ';
        sql+= 'left outer join categories b on b.id=a.category_id '
        sql+= 'where a.status="1" '
        sql+= 'order by a.name asc '
        return sql;
    },
    getProductpage = obj => {
        sql = 'select a.id,a.category_id,a.name,b.name category_name,a.partnumber,a.unit,a.lastupdate from products a ';
        sql+= 'left outer join categories b on b.id=a.category_id '
        sql+= 'where a.status="1" '
        sql+= 'order by a.name asc '
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
        sql = 'select a.id,a.name,b.name category_name,a.partnumber,a.unit,a.lastupdate from products a '
        sql+= 'left outer join categories b on b.id=a.category_id '
        sql+= 'where  '
        sql+= ' ('
        sql+= 'a.name like "%'+obj.searchData+'%" ' 
        sql+= 'or a.partnumber like "%'+obj.searchData+'%" '
        sql+= 'or a.unit like "%'+obj.searchData+'%" '
        sql+= 'or b.name like "%'+obj.searchData+'%" '
        sql+= ') '
        sql+= 'and a.status="1" '
        sql+= 'order by a.name asc '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        console.log('SQL',sql)
        return sql
    },
    searchProductCount = obj => {
        sql = 'select count(a.id)cnt from products a '
        sql+= 'left outer join categories b on b.id=a.category_id '
        sql+= 'where  '
        sql+= ' ('
        sql+= 'a.name like "%'+obj.searchData+'%" ' 
        sql+= 'or a.partnumber like "%'+obj.searchData+'%" '
        sql+= 'or a.unit like "%'+obj.searchData+'%" '
        sql+= 'or b.name like "%'+obj.searchData+'%" '
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
        sql+= 'order by name asc '
        return sql;
    },
    getCategories = () => {
        sql = 'select id,name,description,status,createuser,createdate from categories ';
        sql+= 'where status="1" '
        sql+= 'order by name asc '
        return sql;
    },
    getCategorypage = obj => {
        sql = 'select id,name,description,status,createuser,createdate from categories ';
        sql+= 'where status="1" '
        sql+= 'order by name asc '
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
        sql+= 'order by name asc '
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
        sql+= '(subject,budgeting_number,submission_date,staff_name,implementation_target,purchase_target,createuser)';
        sql+= 'values ';
        sql+= '("'
        sql+= obj.subject+'","'
        sql+= obj.budgeting_number+'","'
        sql+= obj.submission_date+'","'
        sql+= obj.staff_name+'","'
        sql+= obj.implementation_target+'","'
        sql+= obj.purchase_target+'","'
        sql+= obj.createuser
        sql+= '")';
        return sql;
    },
    getSubmissions = () => {
        sql = 'select * from submissions '
        sql+= 'order by createdate desc '
        return sql;
    },
    getSubmissionById = obj => {
        sql = 'select '
        sql+= 'id,subject,submission_date,staff_name,implementation_target,purchase_target,createuser,budgeting_number '
        sql+= 'from submissions '
        sql+= 'where id="'+ obj.id +'" '
        sql+= 'order by createdate desc '

        return sql
    },
    getSubmissionpage = obj => {
        sql = 'select '
        sql+= 'id,subject,submission_date,staff_name,implementation_target,purchase_target,createuser,budgeting_number '
        sql+= 'from submissions '
        sql+= 'where status="'+obj.status+'" '
        sql+= 'order by createdate desc '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        return sql
    },
    getSubmissioncount = obj => {
        sql = 'select count(id) cnt from submissions '
        sql+= 'where status="'+obj.status+'" '
        console.log('sql',sql)
        return sql
    },
    searchSubmission = obj => {
        sql = 'select '
        sql+= 'distinct a.id,a.subject,a.submission_date,a.staff_name,a.implementation_target,a.purchase_target,a.createuser, '
        sql+= 'a.budgeting_number '
        sql+= 'from submissions a '
        sql+= 'left outer join submission_details b on b.submission_id=a.id '
        sql+= 'where '
        sql+= 'a.status="'+obj.status+'" '
        sql+= 'and ('
        sql+= 'a.staff_name like "%'+obj.searchData+'%" '
        sql+= 'or a.subject like "%'+obj.searchData+'%" '
        sql+= 'or b.itemname like "%'+obj.searchData+'%" '
        sql+= 'or b.brand like "%'+obj.searchData+'%" '
        sql+= 'or b.description like "%'+obj.searchData+'%" '
        sql+= 'or b.partnumber like "%'+obj.searchData+'%" '
        sql+= 'or b.proposed_vendor like "%'+obj.searchData+'%" '
        sql+= 'or b.vendor like "%'+obj.searchData+'%" '
        sql+= 'or b.information like "%'+obj.searchData+'%" '
        sql+= 'or b.placement_location like "%'+obj.searchData+'%" '
        sql+= ')'
        sql+= 'order by a.createdate desc '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        console.log('SQL',sql)
        return sql
    },
    searchSubmissioncount = obj => {
        sql = 'select count(a.id) cnt '
        sql+= 'from submissions a '
        sql+= 'left outer join submission_details b on b.submission_id=a.id '
        sql+= 'where a.status="'+obj.status+'" '
        sql+= 'and ('
        sql+= 'a.staff_name like "%'+obj.searchData+'%" '
        sql+= 'or a.subject like "%'+obj.searchData+'%" '
        sql+= 'or b.itemname like "%'+obj.searchData+'%" '
        sql+= 'or b.brand like "%'+obj.searchData+'%" '
        sql+= 'or b.description like "%'+obj.searchData+'%" '
        sql+= 'or b.partnumber like "%'+obj.searchData+'%" '
        sql+= 'or b.proposed_vendor like "%'+obj.searchData+'%" '
        sql+= 'or b.vendor like "%'+obj.searchData+'%" '
        sql+= 'or b.information like "%'+obj.searchData+'%" '
        sql+= 'or b.placement_location like "%'+obj.searchData+'%" '
        sql+= ')'
        sql+= 'order by a.createdate desc '

        console.log('searchsubmissioncount',sql)
        return sql
    },
    setSubmissionStatus = obj => {
        sql = 'update submissions '
        sql+= 'set status="'+obj.status+'" '
        sql+= 'where id='+obj.id+' '
        console.log('SetSubmissionStatus',sql)
        return sql
    },
    updateSubmission = obj => {
        sql = 'update submissions '
        sql+= 'set submission_date="'+obj.submission_date+'",'
        sql+= 'budgeting_number="'+obj.budgeting_number+'",'
        sql+= 'subject="'+obj.subject+'",'
        sql+= 'staff_name="'+obj.staff_name+'",'
        sql+= 'implementation_target="'+obj.implementation_target+'",'
        sql+= 'purchase_target="'+obj.purchase_target+'" '
        sql+= 'where id='+obj.id+' '
        console.log('SQL',sql)
        return sql
    },
    getSubmissionDetails = obj => {
        sql = 'select * from submission_details '
        sql+= 'where submission_id='+obj.submission_id+' '
        sql+= 'order by createdate desc '
        return sql
    },
    getSubmissionDetail = obj => {
        sql = 'select * from submission_details '
        sql+= 'where id = ' + obj.id + ' '
        sql+= 'order by createdate desc '
        return sql
    },
    saveSubmissionDetail = obj => {
        sql = 'insert into submission_details '
        sql+= '('
        sql+= 'submission_id,'
        sql+= 'product_id,'
        sql+= 'vendor_id,'
        sql+= 'itemname,'
        sql+= 'brand,'
        sql+= 'partnumber,'
        sql+= 'description,'
        sql+= 'proposed_vendor,'
        sql+= 'amount,'
        sql+= 'discountlevel,',
        sql+= 'proposed_price,'
        sql+= 'proposed_totalprice,'
        sql+= 'information,'
        sql+= 'purchase_reason,'
        sql+= 'placement_location,'
        sql+= 'guarantee,'
        sql+= 'ppn,'
        sql+= 'ongkir,'
        sql+= 'note,'
        sql+= 'createuser'
        sql+= ') '
        sql+= 'values '
        sql+= '("'
        sql+= obj.submission_id+'","'
        sql+= obj.product_id+'","'
        sql+= obj.vendor_id+'","'
        sql+= obj.itemname+'","'
        sql+= obj.brand+'","'
        sql+= obj.partnumber+'","'
        sql+= obj.description+'","'
        sql+= obj.proposed_vendor+'","'
        sql+= obj.amount+'","'
        sql+= obj.discountlevel+'","'
        sql+= obj.proposed_price+'","'
        sql+= obj.proposed_totalprice+'","'
        sql+= obj.information+'","'
        sql+= obj.purchase_reason+'","'
        sql+= obj.placement_location+'","'
        sql+= obj.guarantee+'","'
        sql+= obj.ppn+'","'
        sql+= obj.ongkir+'","'
        sql+= obj.note+'","'
        sql+= obj.createuser
        sql+= '") '
        console.log('SQL',sql)
        return sql
    },
    updateSubmissionDetail = obj => {
        sql = 'update submission_details '
        sql+= 'set itemname="'+obj.itemname+'",'
        sql+= 'brand="'+obj.brand+'",'
        sql+= 'partnumber="'+obj.partnumber+'",'
        sql+= 'description="'+obj.description+'",'
        sql+= 'proposed_vendor="'+obj.proposed_vendor+'",'
        sql+= 'amount="'+obj.amount+'",'
        sql+= 'discountlevel="'+obj.discountlevel+'",'
        sql+= 'proposed_price="'+obj.proposed_price+'",'
        sql+= 'proposed_totalprice="'+obj.proposed_totalprice+'",'
        sql+= 'vendor="'+obj.vendor+'",'
        sql+= 'price="'+obj.price+'",'
        sql+= 'totalprice="'+obj.totalprice+'",'
        sql+= 'information="'+obj.information+'",'
        sql+= 'purchase_reason="'+obj.purchase_reason+'",'
        if(obj.purchase_date != null){
            sql+= 'purchase_date="'+obj.purchase_date+'",'
        }
        sql+= 'placement_location="'+obj.placement_location+'",'
        sql+= 'guarantee="'+obj.guarantee+'",'
        sql+= 'ppn="'+obj.ppn+'",'
        sql+= 'ongkir="'+obj.ongkir+'",'
        sql+= 'reject_reason="'+obj.reject_reason+'",'
        sql+= 'note="'+obj.note+'"'
        sql+= 'where id='+obj.id+' '
        console.log('SQL',sql);
        return sql
    },
    getSubmissiondetailpage = obj => {
        sql = 'select '
        sql+= 'id,submission_id,itemname,brand,partnumber,description,proposed_vendor,'
        sql+= 'amount,proposed_price,proposed_totalprice,information,purchase_reason,'
        sql+= 'placement_location,guarantee,ppn,ongkir,reject_reason,note,purchase_date,reject_reason,createuser '
        sql+= 'from submission_details '
        sql+= 'where submission_id='+obj.submission_id+' '
        sql+= 'and status!="0" '
        sql+= 'order by createdate desc '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        return sql
    },
    getAllSubmissiondetails = () => {
        sql = 'select '
        sql+= 'id,submission_id,itemname,brand,partnumber,description,proposed_vendor,'
        sql+= 'amount,proposed_price,proposed_totalprice,information,purchase_reason,'
        sql+= 'placement_location,guarantee,ppn,ongkir,reject_reason,note,purchase_date,createuser '
        sql+= 'from submission_details '
        sql+= 'where status!="0" '
        sql+= 'order by createdate desc '
        return sql
    }
    getAllSubmissiondetailpage = obj => {
        sql = 'select '
        sql+= 'id,submission_id,itemname,brand,partnumber,description,proposed_vendor,'
        sql+= 'amount,proposed_price,proposed_totalprice,information,purchase_reason,'
        sql+= 'placement_location,guarantee,ppn,ongkir,reject_reason,note,purchase_date,reject_reason,createuser '
        sql+= 'from submission_details '
        sql+= 'where status="'+obj.status+'" '
        sql+= 'order by createdate desc '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        return sql
    },
    getAllSubmissiondetailcount = obj => {
        sql = 'select '
        sql+= 'count(submission_id) cnt '
        sql+= 'from submission_details '
        sql+= 'where status="'+obj.status+'" '
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
        sql+= 'id,submission_id,itemname,brand,partnumber,description,proposed_vendor,'
        sql+= 'amount,proposed_price,proposed_totalprice,information,purchase_reason,'
        sql+= 'placement_location,guarantee,ppn,ongkir,reject_reason,note,purchase_date,reject_reason,createuser '
        sql+= 'from submission_details '
        sql+= 'where status='+obj.status+' '
        sql+= 'and ('
        sql+= 'itemname like "%'+obj.searchData+'%" '
        sql+= 'or brand like "%'+obj.searchData+'%" '
        sql+= 'or partnumber like "%'+obj.searchData+'%" '
        sql+= 'or description like "%'+obj.searchData+'%" '
        sql+= ')'
        sql+= 'order by createdate desc '
        sql+= 'limit '+obj.pageIndex+','+obj.pageSize+' '
        console.log('searchsubmissiondetail',sql)
        return sql
    },
    searchSubmissiondetailcount = obj => {
        sql = 'select count(submission_id)cnt '
        sql+= 'from submission_details '
        sql+= 'where status='+obj.status+' '
        sql+= 'and ('
        sql+= 'itemname like "%'+obj.searchData+'%" '
        sql+= 'or brand like "%'+obj.searchData+'%" '
        sql+= 'or partnumber like "%'+obj.searchData+'%" '
        sql+= 'or description like "%'+obj.searchData+'%" '
        sql+= ')'
        console.log('searchsubmissiondetail',sql)
        return sql
    },
    setSubmissionDetailStatus = obj => {
        sql = 'update submission_details '
        sql+= 'set status="'+obj.status+'" '
        sql+= 'where id='+obj.id+' '
        console.log('SetSubmissionDetailStatus',sql)
        return sql
    }
    getUsers = () => {
        sql = 'select * from users '
        sql+= 'order by username asc '
        return sql
    },
    getUser = obj => {
        sql = 'select * from users '
        sql+= 'where id = ' + obj.id + ' '
        return sql
    },
    getUserImage = obj => {
        sql = 'select image from users '
        sql+= 'where id = ' + obj.id + ' '
        console.log('SQL',sql)
        return sql
    }
    getVendorImage = obj => {
        switch(obj.type){
            case 'namecard':
            imagetype = 'namecard'
            break
            default:
            imagetype = 'namecard'
        }
        sql = 'select '+obj.type+' image from vendors '
        sql+= 'where id='+obj.id+' '
        console.log('VendorImage SQL',sql)
        return sql
    }
    saveUser = obj => {
        sql = 'insert into users '
        sql+= '(username,email,salt,password,level,createuser) '
        sql+= 'values '
        sql+= '("'+obj.username+'","'+obj.email+'","'+obj.salt+'","'+obj.password+'","'+obj.level+'","'+obj.createuser+'")'
        return sql;
    },
    updateUser = obj => {
        sql = 'update users '
        sql+= 'set username="' + obj.username + '",'
        sql+= 'email="' + obj.email + '",'
        sql+= 'image="' + obj.image + '",'
        sql+= 'level="' + obj.level + '",'
        sql+= 'active="' + obj.active + '" '
        sql+= 'where id=' + obj.id
        console.log('update user',sql)
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
        sql = 'select id,salt,password,defaultRoute,email,username,level from users '
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
    },
    associate_product_vendor = obj => {
        sql = 'insert into products_vendors '
        sql+= '(product_id,vendor_id,createuser) '
        sql+= 'values '
        sql+= '('+obj.product_id+','+obj.vendor_id+',"'+obj.createuser+'")'
        return sql
    },
    disassociate_product_vendor = obj => {
        sql = 'delete from products_vendors '
        sql+= 'where product_id=' + obj.product_id+' '
        sql+= 'and vendor_id = ' + obj.vendor_id + ' '
        return sql
    },
    remove_all_associated_vendor = obj => {
        sql = "delete from products_vendors "
        sql+= "where product_id="+obj.product_id+" "
        console.log("remove all associated vendors",sql)
        return sql
    },
    remove_all_associated_product = obj => {
        sql = "delete from products_vendors "
        sql+= "where vendor_id="+obj.vendor_id+" "
        console.log("remove all associated products",sql)
        return sql
    },
    getproductbycategory = obj => {
        sql = 'select a.id,a.name,a.partnumber,a.unit,b.name category from products a '
        sql+= 'left outer join categories b on b.id=a.category_id '
        sql+= 'where b.id = '+ obj.category_id+' '
        sql+= 'order by a.name asc '
        console.log('getproductbycategory',sql)
        return sql
    },
    getproductbyvendor = obj => {
        sql = 'select b.id,b.name,b.partnumber,b.unit,c.name category from products_vendors a '
        sql+= 'left outer join products b on b.id=a.product_id '
        sql+= 'left outer join categories c on c.id=b.category_id '
        sql+= 'where a.vendor_id = '+ obj.vendor_id+' '
        sql+= 'order by b.name asc '
        console.log('getproductbyvendor',sql)
        return sql
    },
    getvendorbyproduct = obj => {
        sql = 'select b.id,b.name,b.address,b.phone,b.bankaccount,b.namecard from products_vendors a '
        sql+= 'left outer join vendors b on b.id=a.vendor_id '
        sql+= 'where a.product_id = '+obj.product_id + ' '
        sql+= 'order by b.name asc '
        console.log('getvendorbyproduct',sql)
        return sql
    },
    savePurchaseHistory = obj => {
        sql = 'insert into purchasehistories '
        sql+= '(submission_detail_id,product_name,vendor_name,submission_date,implementation_target,createuser) '
        sql+= 'values '
        sql+= '('
        sql+= obj.submission_detail_id+',"'
        sql+= obj.product_name+'","'
        sql+= obj.vendor_name+'","'
        sql+= obj.submission_date+'","'
        sql+= obj.implementation_target+'","'
        sql+= obj.createuser+'")'
        console.log('savepurchasehistory',sql)
        return sql
    },
    getPurchaseHistory = obj => {
        sql = 'select * from purchasehistories '
        sql+= 'where submission_detail_id='+obj.submission_detail_id+' '
        sql+= 'order by createdate desc '

        console.log('getpurchasehistory',sql)
        return sql
    },
    getPurchaseHistoryBySubmission = obj => {
        sql = 'select b.* from submission_details a '
        sql+= 'left outer join purchasehistories b on b.submission_detail_id=a.id '
        sql+= 'where a.submission_id = ' + obj.submission_id + ' '
        sql+= 'order by b.createdate desc '
        console.log('getpurchasehistorybysubmission',sql)
        return sql
    },
    savePayment = obj => {
        sql = 'insert into payments '
        sql+= '(submission_detail_id,payment_type,amount,payment_date,createuser) '
        sql+= 'values '
        sql+= '("'
        sql+= obj.submission_detail_id+'","'
        sql+= obj.payment_type+'","'
        sql+= obj.amount+'","'
        sql+= obj.payment_date+'","'
        sql+= obj.createuser
        sql+= '")'
        console.log('savepayment',sql)
        return sql
    },
    updatePayment = obj => {
        sql = 'update payments '
        sql+= 'set '
        sql+= 'submission_detail_id="'+obj.submission_detail_id+'", '
        sql+= 'payment_type="'+obj.payment_type+'", '
        sql+= 'amount="'+obj.amount+'", '
        sql+= 'payment_date="'+obj.payment_date+'", '
        sql+= 'createuser="'+obj.createuser+'" '
        sql+= 'where id='+obj.id+' '
        console.log('updatepayment',sql)
        return sql
    },
    getPayments = obj => {
        sql = 'select * from payments '
        console.log('getpayments',sql)
        return sql
    },
    getPayment = obj => {
        sql = 'select * from payments '
        sql+= 'where id='+obj.id+' '
        console.log('getpayment',sql)
        return sql
    },
    getPaymentsBySubmissionId = obj => {
        sql = 'select c.* from submissions a '
        sql+= 'left outer join submission_details b on b.submission_id=a.id '
        sql+= 'left outer join payments c on c.submission_detail_id = b.id '
        sql+= 'where a.id = ' + obj.id + ' '
        console.log('getpaymentbysubmissionid:',sql)
        return sql
    },
    getPaymentsBySubmissionDetailId = obj => {
        sql = 'select b.* from submission_details a '
        sql+= 'left outer join payments b on b.submission_detail_id = a.id '
        sql+= 'where a.id = ' + obj.id + ' '
        console.log('getpaymentbysubmissiondetailid:',sql)
        return sql
    },
    submission_detail_from_purchase_history = obj => {
        sql = 'SELECT purchasehistories.id, purchasehistories.submission_detail_id, purchasehistories.product_name, '
        sql+= 'purchasehistories.vendor_name, submission_details.purchase_date, '
        sql+= 'submission_details.amount, submission_details.price, submission_details.totalprice, '
        sql+= 'submissions.staff_name FROM `purchasehistories`, `submission_details`, `submissions` '
        sql+= 'WHERE purchasehistories.submission_detail_id=submission_details.id AND submissions.id=submission_details.submission_id '
        console.log("submission_detail_from_purchase_history",sql)
        return sql
        comment = 'query by Raka'
    },
    updatepurchasehistory = obj => {
        sql = 'UPDATE `purchasehistories` '
        sql+= 'SET `product_name`="'+obj.product_name+'",'
        sql+= '`vendor_name`="'+obj.vendor_name+'",'
        sql+= '`submission_date`="'+obj.submission_date+'",'
        sql+= '`implementation_target`="'+obj.implementation_target+'",'
        sql+= '`createuser`="'+obj.createuser+'" '
        sql+= 'WHERE `submission_detail_id`='+obj.submission_detail_id+''
        console.log('update purchase history',sql)
        return sql
        comment = 'query by raka'
    },
    updateVendorImage = obj => {
        sql = 'update vendors set '+obj.imagetype+' = "'+obj.image+'" '
        sql+= 'where id='+obj.id +' '
        console.log('update vendor image query',sql)
        return sql
    },
    updateRejectReason = obj => {
        sql = 'update submission_details '
        sql+= 'set reject_reason = "'+obj.reject_reason+'" '
        sql+= 'where id = ' + obj.id + ' '
        console.log('update rejectreason sql',sql)
        return sql
    },
    savePlafon = obj => {
        sql = 'insert into plafons '
        sql+= '(division,city,quarter,budget_limit,current_budget) '
        sql+= 'values '
        sql+= '("'+obj.division+'","'+obj.city+'","'+obj.quarter+'","'+obj.budget_limit+'","'+obj.current_budget+'")'
        console.log("Save plafon",sql)
        return sql
    }
    getPlafons = () => {
        sql = 'select * from plafons '
        console.log('Get plafons',sql)
        return sql
    }
    getPlafon = obj => {
        sql = 'select * from plafons '
        sql+= 'where id=' + obj.id + ' '
        console.log("Get plafon",sql)
        return sql
    }
    updatePlafon = obj => {
        sql = 'update plafons '
        sql+= 'set division = ' + obj.division + ', '
        sql+= 'city = "' + obj.city + '", '
        sql+= 'quarter = ' + obj.quarter + ', '
        sql+= 'current_budget = ' + obj.current_budget + ' '
        sql+= 'budget_limit = ' + obj.budget_limit + ' '
        sql+= 'where id = ' + obj.id + ' '
        console.log("Update plafon",sql)
        return sql
    },
    removePlafon = obj => {
        sql = 'delete from plafons '
        sql+= 'where id = ' + obj.id + ' '
        console.log('Remove plafon',sql)
        return sql
    },
    getUsersByDivisionId = obj => {
        sql = 'select a.*,c.name division from users a '
        sql+= 'left outer join divisions_users b on b.user_id=a.id '
        sql+= 'left outer join divisions c on c.id=b.division_id '
        sql+= 'where c.id=' + obj.division_id + ' '
        console.log("Get User By Division Id",sql)
        return sql
    }
    getDivisionsByUserId = obj => {
        sql = 'select c.name division from users a '
        sql+= 'left outer join divisions_users b on b.user_id=a.id '
        sql+= 'left outer join divisions c on c.id=b.division_id '
        sql+= 'where a.id=' + obj.user_id + ' '
        console.log("Get DIvision By User ID",sql)
        return sql
    }
    module.exports = {
        getUsersByDivisionId:getUsersByDivisionId,
        getDivisionsByUserId:getDivisionsByUserId,
        savePlafon:savePlafon,
        getPlafons:getPlafons,
        getPlafon:getPlafon,
        updatePlafon:updatePlafon,
        removePlafon:removePlafon,
        updateRejectReason:updateRejectReason,
        updateVendorImage:updateVendorImage,
        remove_all_associated_product:remove_all_associated_product,
        remove_all_associated_vendor:remove_all_associated_vendor,
        updatepurchasehistory:updatepurchasehistory,
        getproductbycategory:getproductbycategory,
        submission_detail_from_purchase_history:submission_detail_from_purchase_history,
        getPaymentsBySubmissionDetailId:getPaymentsBySubmissionDetailId,
        getPaymentsBySubmissionId:getPaymentsBySubmissionId,
        getPayment:getPayment,
        getPayments:getPayments,
        updatePayment:updatePayment,
        savePayment:savePayment,
        getPurchaseHistory:getPurchaseHistory,
        getPurchaseHistoryBySubmission:getPurchaseHistoryBySubmission,
        savePurchaseHistory:savePurchaseHistory,
        getvendorbyproduct:getvendorbyproduct,
        getproductbyvendor:getproductbyvendor,
        disassociate_product_vendor:disassociate_product_vendor,
        associate_product_vendor:associate_product_vendor,
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
        getVendorImage:getVendorImage,
        saveSubmission:saveSubmission,
        getSubmissions:getSubmissions,
        setSubmissionStatus:setSubmissionStatus,
        updateSubmission:updateSubmission,
        getUsers:getUsers,
        getUser:getUser,
        getUserImage:getUserImage,
        saveUser:saveUser,
        updateUser:updateUser,
        getUserByEmail:getUserByEmail,
        changePassword:changePassword,
        getSubmissionDetails:getSubmissionDetails,
        getSubmissionDetail:getSubmissionDetail,
        saveSubmissionDetail:saveSubmissionDetail,
        getAllSubmissiondetails:getAllSubmissiondetails,
        getAllSubmissiondetailpage:getAllSubmissiondetailpage,
        getAllSubmissiondetailcount:getAllSubmissiondetailcount,
        updateSubmissionDetail:updateSubmissionDetail,
        getSubmissiondetailpage:getSubmissiondetailpage,
        getSubmissiondetailcount:getSubmissiondetailcount,
        searchSubmissiondetail:searchSubmissiondetail,
        searchSubmissiondetailcount:searchSubmissiondetailcount,
        setSubmissionDetailStatus:setSubmissionDetailStatus,
        getSubmissionpage:getSubmissionpage,
        getSubmissionById: getSubmissionById,
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
