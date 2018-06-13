var nodemailer = require('nodemailer'),
config = require("./configs.js"),
mail = config.mail();
transporter = nodemailer.createTransport({
    host:mail.host,
    secure:false,
    auth:mail.auth
}),
mailOptions = {
    from:mail.from,
    to:mail.to,
    cc:mail.cc,
    subject:mail.subject,
    text:mail.text
};
sendmail = function(mail,callback){
    mailOptions.text = mail.msg;
    mailOptions.to = mail.recipient;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    transporter.sendMail(mailOptions,function(err,res){
        if(err){
            console.log('Error kirim mail',err);
        }else{
            console.log('Mail sent',res);
        }
    });
    callback(mail.msg);
}
module.exports = {
    sendmail: sendmail
}
