var nodemailer = require("nodemailer");

var config = require("./config");

var moment = require("moment");

var failSendEmail = true;

var baseURL = config.mailSender.getBaseURL();

//email to replay whitch will be visible from the recipiant
var mailSender = "miguel.dumont.devoption@gmail.com";

//Mail configuration
var smtpConfig = config.mailSender.smtpConfig;

//create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

var URLexpiration = 5 * 60; //5 min

//send mail with defined transport object
module.exports = {
    welcomeEmail: function (user, result) {
        console.log("send welcomeEmail to " + user.email);

        var welcomeEmail = {
            from: "Innerview team 👥 <" + mailSender + ">", // sender address
            to: user.email, // list of receivers
            subject: "Welcome to innerview !", // Subject line
            text: "Hello " + user.name + ",\n\nThank you for joining the Innerview community.\n\n\nThe Innerview team.", // plaintext body
            html: "<p>Hello " + user.name + ",<br/><br/>"
                    + "Thank you for joining the Innerview community.<br/><br/>"
                    + "Check out below your login IDs.<br/><br/>"
                    + "email: " + user.email + "<br/>"
                    + "password: " + user.clearPassword + "<br/><br/>"
                    + "The Innerview team.</p>" // html body
        };

        transporter.sendMail(welcomeEmail, function (error, info) {
            if (error) {
                return result(failSendEmail, error);
            }
            return result(!failSendEmail, info);
        });
    },
    resetPasswordEmail: function (user, result) {
        if (user.email === "" || user.email === undefined) {
            return result(failSendEmail, "invalid user email");

        } else {
            console.log("send resetPasswordEmail to " + user.email);
            var resetPasswordURL = baseURL + "#/resetPassword/" + user._id + "/" + moment().add(URLexpiration, "seconds").unix();

            var resetPasswordEmail = {
                from: "Innerview team 👥 <" + mailSender + ">", // sender address
                to: user.email, // list of receivers
                subject: "Reset password !", // Subject line
                text: "Hello " + user.name + ",\n\nCopy this following URL into your browser to reset your password: \n\n" + resetPasswordURL + "<\n\nThe Innerview team.", // plaintext body
                html: "<p>Hello " + user.name + ",<br/><br/>Click to this following URL to reset your password: <br/><br/><a href=\"" + resetPasswordURL + "\">" + resetPasswordURL + "</a><br/><br/>The Innerview team.</p>" // html body
            };

            transporter.sendMail(resetPasswordEmail, function (error, info) {
                if (error) {
                    return result(failSendEmail, error);
                }
                return result(!failSendEmail, info);
            });
        }
    }
};
