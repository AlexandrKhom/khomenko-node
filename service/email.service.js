const nodemailer = require('nodemailer');

const variables = require('../config/variables');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: variables.NO_REPLY_EMAIL,
        pass: variables.NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, title, description) => {
    return transporter.sendMail({
        from: 'no reply',
        to: userMail,
        subject: title,
        html: description
    });
};

module.exports = {
    sendMail
};
