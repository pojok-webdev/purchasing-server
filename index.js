var express = require('express'),
app = express(),
path = require('path'),
con = require('./js/connections.js'),
query = require('./js/queries.js'),
help = require('./js/help.js'),
bodyParser = require('body-parser'),
mailer = require('./js/mailer.js'),
otp = require('./js/otp.js');
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
app.get('/sendmail/:recipient',function(req,res){
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
app.get('/help/:method',function(req,res){
    obj = help.getdata(req.params.method)
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
            server:'localhost',
            port:'2018'
        }
    });
})
app.post('/saveproduct',function(req,res){
    con.getdata(query.saveProduct({
        name:req.body.name,
        partnumber:req.body.partnumber,
        unit:req.body.unit,
        price:req.body.price,
        discountlevel:req.body.discountlevel
    }),function(result){
        console.log("Save Product",result);
        res.send(result);
    });
});
app.get('/getproduct/:id',function(req,res){
    console.log("Query",query.getProduct(req.params.id));
    con.getdata(query.getProduct(req.params.id),function(result){
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getproducts',function(req,res){
    console.log("Query",query.getProducts());
    con.getdata(query.getProducts(),function(result){
        console.log("Result",result);
        res.send(result);
    })
})
app.post('/savevendor',function(req,res){
    name = req.body.name;
    address = req.body.address;
    phone = req.body.phone;
    bankaccount = req.body.bankaccount;
    createuser = req.body.createuser;
    con.getdata(query.saveVendor({
        name:name,address:address,phone:phone,bankaccount:bankaccount,createuser:createuser
    }),function(result){
        console.log("save vendor post data",req.body);
        res.send(result);
    })
})
app.get('/getvendor/:id',function(req,res){
    console.log("Query",query.getVendor(req.params.id));
    con.getdata(query.getVendor(req.params.id),function(result){
        console.log("Result",result);
        res.send(result);
    })
})
app.get('/getvendors',function(req,res){
    console.log("Query",query.getVendors());
    con.getdata(query.getVendors(),function(result){
        console.log("Result",result);
        res.send(result);
    })
})
app.listen(process.env.PORT || 2018);
