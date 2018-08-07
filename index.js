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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
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
    con.getdata(query.saveProduct({
        name:req.body.name,
        vendor_id:req.body.vendor_id,
        category_id:req.body.category_id,
        partnumber:req.body.partnumber,
        unit:req.body.unit,
        price:req.body.price,
	    createuser:req.body.createuser,
        discountlevel:req.body.discountlevel
    }),(result) => {
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
app.post('/savevendor',(req,res) => {
    name = req.body.name;
    address = req.body.address;
    phone = req.body.phone;
    bankaccount = req.body.bankaccount;
    createuser = req.body.createuser;
    con.getdata(query.saveVendor(req.body),(result) => {
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
    con.getdata(query.getSubmissionDetails({id:req.params.id}),result=>{
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
app.post('/getuser',(req,res)=>{
    con.getdata(query.getUser({id:req.body.id}),result=>{
        console.log("Result",result)
        res.send(result)
    })
})
app.get('/getuserimage/:id',(req,res)=>{
    con.getdata(query.getUserImage({id:req.params.id}),result=>{
        console.log("GetUserImageResult",result)
//        res.header("Content-Type", "image/jpeg");
        res.header("Content-Type", "application/octet-stream");
        res.send(result[0].image)
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
app.listen(process.env.PORT || 2018);
