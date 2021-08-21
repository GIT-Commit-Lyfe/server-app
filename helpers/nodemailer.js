const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.SENDER_PASS
  }
})

function sendEmail(receiver, subject, cb) { // callback nya (err, info)
  let mailOpts = {
      from: `Tes Nodemailer <${process.env.SENDER_MAIL}>`,
      to: receiver,
      subject,
      html: '<p>Ini tes email</p>',
      // text: '',
    }
  transporter.sendMail(mailOpts, cb)
  /*
    (err, info) => {
      if(err) console.log(err)
      console.log('Message sent', info)
      console.log('URL:', nodemailer.getTestMessageUrl(info))
    }
  */
}
