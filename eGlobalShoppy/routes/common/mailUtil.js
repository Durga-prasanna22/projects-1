var nodemailer = require("nodemailer");

const sendMail = async (email, subject, mailcontent) => {
    const trasport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: "webdev.prasad@gmail.com",
        pass: "mirv ttwt ajzl jcgm",
      }
    });
    // mailcontent  = '<!DOCTYPE><html><head></head><body><b>hello from mailsss</b></body></html>';
  
    await trasport.sendMail({
      from: "webdev.prasad@gmail.com",// process.env.Gmail,
      to: email,
      subject: subject,
      text: mailcontent
    });
  }
  module.exports = sendMail;