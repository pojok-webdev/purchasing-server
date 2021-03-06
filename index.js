var express = require('express'),
app = express(),
path = require('path'),
con = require('./js/connections.js'),
query = require('./js/queries.js'),
help = require('./js/help.js'),
bodyParser = require('body-parser'),
mailer = require('./js/mailer.js'),
jwt = require('jsonwebtoken'),
secretOrKey = 'padinet',
config = require("./js/configs.js"),
auth = require('./js/auth.js'),
auth1 = require('./js/auth.1.js'),
common = require("./js/commons.js");
app.engine("html",require("ejs").renderFile);
    app.set('views',path.join(__dirname,'views'));
    app.use(express.static(__dirname+'views'));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.post('/login',(req,res) => {
    email = req.body.email
    password = req.body.password
    console.log("QUERY",query.login({email:req.body.email}))
    con.getdata(query.login({email:req.body.email}),result=>{
        _result = result[0]
        lg = auth1.login(_result,password)
        if(lg){
            var payload = {id:_result.id,name:_result.username,email:_result.email,defaultRoute:result.defaultRoute}
            var token = jwt.sign(payload,secretOrKey,{expiresIn:config.jwt().expiresIn})
            console.log('token',token)
            console.log("RESULT",_result)
            _result.token = token
            _result.message = "ok"
            res.send(_result)
        }else{
            res.send({message:'auth error'})
        }
    })
})
app.post('/updatepassword',(req,res) => {
    con.getdata(query.login({email:req.body.email,password:req.body.password}),result => {
        user = result[0]
        console.log("USER",result)
        newpassword = auth1.changePassword(user,req.body.newpassword)
        console.log("QUERY",query.updatePassword({email:req.body.email},newpassword))
        con.getdata(query.updatePassword({email:req.body.email},newpassword),result => {
            res.send(result)
        })
    })
})
app.post('/createuser',(req,res) => {
    _salt = auth1.createSalt(32,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    newpassword = auth1.changePassword({
        salt:_salt,
        password:req.body.password
    },req.body.password)
    console.log("New Password",newpassword)
    console.log("Salt",_salt)
    req.body.password = newpassword
    req.body.salt = _salt
    console.log("Query",query.createUser(req.body))
    con.getdata(query.createUser(req.body),result => {
        res.send(result)
    })
})
app.post('/activateuser',(req,res) => {
    con.getdata(query.activateUser(req.body,req.body.active), result => {
        res.send(result)
    })
})
app.get('/islogin/:token', (req,res) => {
    verify = jwt.verify(req.params.token,secretOrKey,(err,data) => {
        if(!err){
            console.log("Verified",data)
            res.send(data)
        }else{
            console.log("Err",err)
            res.send(err)
        }
    })
})
app.get('/getlogin/:token',(req,res) => {
    decoded = jwt.decode(req.params.token,{complete:true})
    console.log("decoded",decoded)
    res.send(decoded)
})

app.get('/sendmail/:recipient',(req,res) => {
    res.header("Access-Control-Allow-Origin","*");
    var recipient = req.params.recipient;
    mail = {
        to : recipient,
        msg : "Test Mail : "+recipient
    }
    mailer.sendmail(mail,function(content){
        res.send("Mail Sent : ",recipient);
    });
})
app.get('/help/:method',(req,res) => {
    obj = help.getdata(req.params.method)
    appconfig = config.appserver()
    console.log("Obj",obj)
    res.render("help.html",{
        data:{
            name:req.params.name,
            method:req.params.method,
            name:obj.name,
            method:obj.method,
            description:obj.description,
            format:obj.format,
            syntax:obj.syntax,
            server:appconfig.name,
            port:appconfig.port
        }
    });
})
app.post('/saveproduct',(req,res) => {
    con.getdata(query.saveProduct(req.body),(result) => {
        console.log("Save Product",result);
        res.send(result);
    });
});
app.post('/updateproduct',(req,res) => {
console.log("Query",query.updateProduct(req.body));
    con.getdata(query.updateProduct({
        id:req.body.id,
	vendor_id:req.body.vendor_id,
	category_id:req.body.category_id,
        name:req.body.name,
        partnumber:req.body.partnumber,
        unit:req.body.unit,
        price:req.body.price,
	    createuser:req.body.createuser,
        discountlevel:req.body.discountlevel
    }),(result) => {
        console.log("Update Product",result);
        res.send(result);
    });
});
app.get('/getproduct/:id',(req,res) => {
    console.log("Query",query.getProduct(req.params.id));
    con.getdata(query.getProduct({id:req.params.id}),result => {
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getproducts',(req,res) => {
    console.log("Query",query.getProducts());
    con.getdata(query.getProducts(),result => {
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getproductpage/:page/:pageSize', (req,res) => {
    con.getdata(query.getProductpage(req.params),result => {
        res.send(result)
    })
})
app.get('/getproductcount', (req,res) => {
    con.getdata(query.getProductCount(req.params),result => {
        res.send(result)
    })
})
app.get('/setproductactive/:id/:status',(req,res) => {
    con.getdata(query.setProductActive({id:req.params.id,status:req.params.status}),result => {
        console.log('setproductactive',result)
        res.send(result)
    })
})
app.post('/searchproduct', (req,res) => {
    console.log("Params",req.body)
    con.getdata(query.searchProduct(req.body),result => {
        res.send(result)
    })
})
app.post('/searchproductcount', (req,res) => {
    console.log("req.bdy",req.body)
    con.getdata(query.searchProductCount(req.body),result => {
        res.send(result)
    })
})
app.post('/updatevendorimage',(req,res) => {
    con.getdata(query.updateVendorImage(req.body), result => {
        res.send(result)
    })
})
app.post('/savevendor',(req,res) => {
    name = req.body.name;
    address = req.body.address;
    phone = req.body.phone;
    bankaccount = req.body.bankaccount;
    createuser = req.body.createuser;
    con.getdata(query.saveVendor(req.body),result => {
        console.log("save vendor post data",req.body);
        res.send(result);
    })
})
app.post('/updatevendor',(req,res) => {
    id = req.body.id;
    name = req.body.name;
    address = req.body.address;
    phone = req.body.phone;
    bankaccount = req.body.bankaccount;
    createuser = req.body.createuser;
    con.getdata(query.updateVendor(req.body),(result) => {
        console.log("save vendor post data",req.body);
        res.send(result);
    })
})
app.get('/setvendoractive/:id/:status',(req,res) => {
    con.getdata(query.setVendorActive({id:req.params.id,status:req.params.status}),result => {
        console.log('setvendoractive',result)
        res.send(result)
    })
})
app.get('/getvendor/:id',(req,res) => {
    console.log("Query",query.getVendor(req.params.id));
    con.getdata(query.getVendor({id:req.params.id}),result => {
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getvendors',(req,res) => {
    console.log("Query",query.getVendors());
    con.getdata(query.getVendors(),result => {
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getvendorpage/:page/:pageSize', (req,res) => {
    console.log("QUERY",query.getVendorpage(req.params))
    con.getdata(query.getVendorpage(req.params),result => {
        res.send(result)
    })
})
app.get('/getvendorcount', (req,res) => {
    con.getdata(query.getVendorCount(req.params),result => {
        res.send(result)
    })
})
app.post('/searchvendor', (req,res) => {
    con.getdata(query.searchVendor(req.body),result => {
        res.send(result)
    })
})
app.post('/searchvendorcount', (req,res) => {
    console.log("req.bdy",req.body)
    con.getdata(query.searchVendorCount(req.body),result => {
        res.send(result)
    })
})
app.post('/savecategory',(req,res) => {
    con.getdata(query.saveCategory({
        name:req.body.name,
        description:req.body.description,
        createuser:req.body.createuser
    }),(result) => {
        console.log("Save Category",result);
        res.send(result);
    });
});
app.post('/updatecategory',(req,res) => {
    con.getdata(query.updateCategory({
        id:req.body.id,
        name:req.body.name,
        description:req.body.description
    }),(result) => {
        console.log("Update Category",result);
        res.send(result);
    });
});
app.get('/getcategory/:id',(req,res) => {
    console.log("Query",query.getCategory(req.params.id));
    con.getdata(query.getCategory({id:req.params.id}),result => {
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getcategories',(req,res) => {
    console.log("Query",query.getCategories());
    con.getdata(query.getCategories(),result => {
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getcategorypage/:page/:pageSize', (req,res) => {
    con.getdata(query.getCategorypage(req.params),result => {
        res.send(result)
    })
})
app.get('/getcategorycount', (req,res) => {
    con.getdata(query.getCategoryCount(req.params),result => {
        res.send(result)
    })
})
app.post('/searchcategory', (req,res) => {
    con.getdata(query.searchCategory(req.body),result => {
        res.send(result)
    })
})
app.post('/searchcategorycount', (req,res) => {
    console.log("req.bdy",req.body)
    con.getdata(query.searchCategoryCount(req.body),result => {
        res.send(result)
    })
})
app.get('/setcategoryactive/:id/:status', (req,res) => {
    con.getdata(query.setCategoryActive(req.params), result => {
        res.send(result)
    })
})
app.post('/savesubmission',(req,res) => {
    console.log("Save Submission invoked");
    console.log("Query",query.saveSubmission(req.body))
    con.getdata(query.saveSubmission(req.body),result=>{
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getsubmissions',(req,res) => {
    con.getdata(query.getSubmissions(),result=>{
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getsubmissionbyid/:id', (req,res) => {
    console.log("getSubmissionById invoked")
    con.getdata(query.getSubmissionById({id:req.params.id}),result => {
        console.log('Result',result)
        res.send(result)
    })
})
app.get('/getsubmissionpage/:status/:pageIndex/:pageSize',(req,res) => {
    console.log('req params',req.params)
    con.getdata(query.getSubmissionpage(req.params),result => {
        res.send(result)
    })
})
app.get('/getsubmissioncount/:status',(req,res) => {
    con.getdata(query.getSubmissioncount(req.params),result => {
        res.send(result)
    })
})
app.post('/searchsubmission',(req,res) => {
    con.getdata(query.searchSubmission(req.body),result => {
        res.send(result)
    })
})
app.post('/searchsubmissioncount',(req,res) => {
    con.getdata(query.searchSubmissioncount(req.body),result => {
        res.send(result)
    })
})
app.get('/setsubmissionstatus/:id/:status',(req,res) => {
    con.getdata(query.setSubmissionStatus(req.params),result => {
        res.send(result)
    })
})
app.post('/updatesubmission',(req,res) => {
    con.getdata(query.updateSubmission(req.body),result => {
        console.log("Result",result)
        res.send(result)
    })
})
app.get('/getsubmissiondetails/:submission_id',(req,res)=>{
    console.log("Query",query.getSubmissionDetails({submission_id:req.params.submission_id}));
    con.getdata(query.getSubmissionDetails({submission_id:req.params.submission_id}),result=>{
        console.log("Result",result)
        res.send(result)
    })
})
app.get('/getsubmissiondetail/:id',(req,res)=>{
    con.getdata(query.getSubmissionDetail({id:req.params.id}),result=>{
        console.log("Result",result)
        res.send(result)
    })
})
app.post('/savesubmissiondetail',(req,res)=>{
    console.log('req body',req.body)
    con.getdata(query.saveSubmissionDetail(req.body),result => {
        console.log("Result",result)
        res.send(result)
    })
})
app.get('/getallsubmissiondetails', (req,res) => {
    con.getdata(query.getAllSubmissiondetails(), result => {
        console.log('getAllSubmissiondetails',result)
        res.send(result)
    })
})
app.get('/getallsubmissiondetailpage/:status/:pageIndex/:pageSize', (req,res) => {
    con.getdata(query.getAllSubmissiondetailpage(req.params), result => {
        console.log('AllSubmissiondetailpage',result)
        res.send(result)
    })
})

app.get('/getallsubmissiondetailcount/:status', (req,res) => {
    con.getdata(query.getAllSubmissiondetailcount(req.params), result => {
        console.log('AllSubmissiondetailcount',result)
        res.send(result)
    })
})
app.post('/updatesubmissiondetail',(req,res) => {
    con.getdata(query.updateSubmissionDetail(req.body),result => {
        console.log("Result",result)
        res.send(result)
    })
})
app.get('/getsubmissiondetailpage/:submission_id/:pageIndex/:pageSize',(req,res) => {
    con.getdata(query.getSubmissiondetailpage(req.params),result => {
        console.log('submissiondetail page',result)
        res.send(result)
    })
})
app.get('/getsubmissiondetailcount/:submission_id',(req,res) => {
    con.getdata(query.getSubmissiondetailcount(req.params),result => {
        console.log('submissiondetail page',result)
        res.send(result)
    })
})
app.post('/searchsubmissiondetail',(req,res) => {
    con.getdata(query.searchSubmissiondetail(req.body),result => {
        console.log('submissiondetail page',result)
        res.send(result)
    })
})
app.post('/searchsubmissiondetailcount',(req,res) => {
    con.getdata(query.searchSubmissiondetailcount(req.body),result => {
        console.log('submissiondetail page',result)
        res.send(result)
    })
})
app.get('/setsubmissiondetailstatus/:id/:status',(req,res) => {
    con.getdata(query.setSubmissionDetailStatus(req.params),result => {
        res.send(result)
    })
})
app.get('/getusers',(req,res)=>{
    con.getdata(query.getUsers(),result=>{
        console.log("Result",result)
        res.send(result)
    })
})
app.get('/getuserbyname/:username',(req,res) => {
    con.getdata(query.getUserByName(req.params),result => {
        console.log('getUserByName',result)
        res.send(result)
    })
})
app.post('/getuser',(req,res)=>{
    con.getdata(query.getUser({id:req.body.id}),result=>{
        console.log("Result",result)
        res.send(result)
    })
})
app.get('/getuserimage/:id',(req,res)=>{
    con.getdata(query.getUserImage({id:req.params.id}),result=>{
        console.log("GetUserImageResult",result)
        //res.header("Content-Type", "jpeg");
//        res.header("Content-Type", "application/octet-stream");
        res.end(result[0].image,'binary')
    })
})
app.get('/getvendorimage/:id/:type',(req,res)=>{
    //imagetype: namecard,offeringsample,invoicesample,receiptsample
    con.getdata(query.getVendorImage({id:req.params.id,type:req.params.type}),result=>{
        console.log("GetVendorImageResult",result)
        res.header("Content-Type", "jpeg");
        res.end(result[0].image,'binary')
    })
})
app.post('/saveuser',(req,res)=>{
    obj = common.saveUser(req.body)
    res.send(obj)
})
app.post('/updateuser',(req,res)=>{
    con.getdata(query.updateUser(req.body),result=>{
        res.send(result)
    })
})
app.post('/changepassword',(req,res)=>{
    obj = common.changePassword(req.body.email,req.body.password)
    res.send(obj)
})
app.post('/login',(req,res)=>{
    obj = common.login(req.body.email,req.body.password)
    res.send(obj)
})
app.post('/getvendorbyproduct',(req,res) => {
    con.getdata(query.getvendorbyproduct(req.body), result => {
        console.log('getvendorbyproduct',result)
        res.send(result)
    })
})
app.post('/getproductbycategory',(req,res) => {
    con.getdata(query.getproductbycategory(req.body),result => {
        console.log('getproductbycategory',result)
        res.send(result)
    })
})
app.post('/getproductbyvendor',(req,res) => {
    con.getdata(query.getproductbyvendor(req.body), result => {
        console.log('getproductbyvendor',result)
        res.send(result)
    })
})
app.post('/disassociate_product_vendor',(req,res) => {
    con.getdata(query.disassociate_product_vendor(req.body), result => {
        console.log('disassociate_product_vendor',result)
        res.send(result)
    })
})
app.post('/associate_product_vendor',(req,res) => {
    con.getdata(query.associate_product_vendor(req.body), result => {
        console.log('associate_product_vendor',result)
        res.send(result)
    })
})
app.post('/savepurchasehistory',(req,res) => {
    con.getdata(query.savePurchaseHistory(req.body),result => {
        console.log('save purchase history',result)
        res.send(result)
    })
})
app.post('/updatepurchasehistory',(req,res) => {
    con.getdata(query.updatepurchasehistory(req.body),result => {
        console.log('updatepurchasehistory',result)
        res.send(result)
    })
})
app.post('/getpurchasehistory',(req,res) => {
    con.getdata(query.getPurchaseHistory(req.body),result => {
        console.log('save getPurchaseHistory',result)
        res.send(result)
    })
})
app.post('/getpurchasehistorybysubmission',(req,res) => {
    con.getdata(query.getPurchaseHistoryBySubmission(req.body),result => {
        console.log('save getPurchaseHistoryBySubmission',result)
        res.send(result)
    })
})
app.get('/getpayments',(req,res) => {
    con.getdata(query.getPayments(),result => {
        console.log('save getpayments',result)
        res.send(result)
    })
})
app.post('/getpayment',(req,res) => {
    con.getdata(query.getPayment(req.body),result => {
        console.log('save getpayment',result)
        res.send(result)
    })
})
app.post('/getpaymentsbysubmissionid', (req,res) => {
    con.getdata(query.getPaymentsBySubmissionId(req.body), result => {
        console.log('getpaymentbysubmissionbyid',result)
        res.send(result)
    })
})
app.post('/getpaymentsbysubmissiondetailid', (req,res) => {
    con.getdata(query.getPaymentsBySubmissionDetailId(req.body), result => {
        console.log('getPaymentsBySubmissionDetailId',result)
        res.send(result)
    })
})

app.post('/updatepayment',(req,res) => {
    con.getdata(query.updatePayment(req.body),result => {
        console.log('save updatepayment',result)
        res.send(result)
    })
})
app.post('/savepayment',(req,res) => {
    con.getdata(query.savePayment(req.body),result => {
        console.log('save savepayment',result)
        res.send(result)
    })
})
app.get('/submissiondetailfrompurchasehistory',(req,res) => {
    con.getdata(query.submission_detail_from_purchase_history(),result => {
        console.log('submission_detail_from_purchase_history',result)
        res.send(result)
    })
})
app.get('/removeallassociatedvendors/:id',(req,res) => {
    con.getdata(query.remove_all_associated_vendor({product_id:req.params.id}),result => {
        console.log('remove_all_associated_vendor',result)
        res.send(result)
    })
})
app.get('/removeallassociatedproducts/:id',(req,res) => {
    con.getdata(query.remove_all_associated_product({vendor_id:req.params.id}),result => {
        console.log('remove_all_associated_product',result)
        res.send(result)
    })
})
app.post('/updaterejectreason',(req,res) => {
    con.getdata(query.updateRejectReason(req.body),result => {
        console.log('updateRejectReason',result)
        res.send(result)
    })
})
app.post('/saveplafon',(req,res) => {
    con.getdata(query.savePlafon(req.body),result => {
        console.log('savePlafon',result)
        res.send(result)
    })
})
app.get('/getplafons',(req,res) => {
    con.getdata(query.getPlafons(),result => {
        console.log('getPlafons',result)
        res.send(result)
    })
})
app.get('/getplafon/:id',(req,res) => {
    con.getdata(query.getPlafon(req.params),result => {
        console.log('getPlafon',result)
        res.send(result)
    })
})
app.post('/updateplafon',(req,res) => {
    con.getdata(query.updatePlafon(req.body),result => {
        console.log('updatePlafon',result)
        res.send(result)
    })
})
app.post('/removeplafon',(req,res) => {
    con.getdata(query.removePlafon(req.body),result => {
        console.log('removePlafon',result)
        res.send(result)
    })
})
app.get('/getusersbydivisionid/:division_id', (req,res) => {
    con.getdata(query.getUsersByDivisionId(req.params),result => {
        console.log('getusersbydivisonid',result)
        res.send(result)
    })
})
app.get('/getdivisionsbyuserid/:user_id', (req,res) => {
    con.getdata(query.getDivisionsByUserId(req.params),result => {
        console.log('getusersbydivisonid',result)
        res.send(result)
    })
})
app.get('/getvendorpics/:vendor_id',(req,res) => {
    con.getdata(query.getVendorPics(req.params),result => {
        console.log('getVendorPics',result)
        res.send(result)
    })
})
app.post('/savevendorpic',(req,res) => {
    con.getdata(query.saveVendorPic(req.body),result => {
        console.log('saveVendorPic',result)
        res.send(result)
    })
})
app.post('/updatevendorpic',(req,res) => {
    con.getdata(query.updateVendorPic(req.body),result => {
        console.log('updateVendorPic',result)
        res.send(result)
    })
})
app.get('/deletevendorpic/:id',(req,res) => {
    con.getdata(query.deleteVendorPic(req.params),result => {
        console.log('deletevendorPic',result)
        res.send(result)
    })
})
app.get('/getproductimages/:product_id',(req,res) => {
    con.getdata(query.getProductImages(req.params),result => {
        console.log('getProductImages',result)
        res.send(result)
    })
})
app.post('/saveproductimage',(req,res) => {
    con.getdata(query.saveProductImage(req.body),result => {
        console.log('saveProductImage',result)
        res.send(result)
    })
})
app.post('/updateproductimage',(req,res) => {
    con.getdata(query.updateProductImage(req.body),result => {
        console.log('updateProductImage',result)
        res.send(result)
    })
})
app.get('/deleteproductimage/:id',(req,res) => {
    con.getdata(query.deleteProductImage(req.params),result => {
        console.log('deleteProductImage',result)
        res.send(result)
    })
})
app.post('/savesubmissiondetailvendor/',(req,res) => {
    con.getdata(query.saveSubmissionDetailVendor(req.body),result => {
        console.log('savesubmissionvendor',result)
        res.send(result)
    })
})
app.post('/removesubmissiondetailvendor/',(req,res) => {
    con.getdata(query.removeSubmissionDetailVendor(req.body),result => {
        console.log('removesubmissionvendor',result)
        res.send(result)
    })
})
app.get('/getsubmissiondetailvendor/:submission_detail_id',(req,res) => {
    con.getdata(query.getSubmissionDetailVendor(req.params),result => {
        console.log('removesubmissionvendor',result)
        res.send(result)
    })
})
app.listen(process.env.PORT || 2018);
