const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

const mailOption = (to, subject, text, html) => {
    return{
        from: process.env.EMAIL,
        to,
        subject,
        text,
        html
    }
}

const configMailer = {
    sendingEmail: async (to, subject, text, html) => {
        try {
            await transporter.sendMail(mailOption(to, subject, text, html))
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = configMailer;