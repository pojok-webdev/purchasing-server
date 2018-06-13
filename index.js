var express = require('express'),
app = express(),
con = require('./js/connections.js'),
query = require('./js/queries.js'),
bodyParser = require('body-parser'),
mailer = require('./js/mailer.js'),
otp = require('./js/otp.js');
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
app.post('/saveproduct',function(req,res){
    name = req.body.name;
    partnumber = req.body.partnumber;
    unit = req.body.unit;
    price = req.body.price;
    discountlevel = req.body.discountlevel;
    lastupdate = req.body.lastupdate;
    con.getdata(query.saveProduct({
        name:name,
        partnumber:partnumber,
        unit:unit,
        price:price,
        discountlevel:discountlevel,
        lastupdate:lastupdate
    }),function(result){
        console.log("Save Product",result);
        mail = {
            msg : "Product saved : "+result
        }
        mailer.sendmail(mail,function(content){
            res.send("Product Saved : "+content);
        });
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
    bank_account = req.body.bank_account;
    con.getdata(query.saveVendor({
        name:name,address:address,phone:phone,bank_account:bank_account
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
