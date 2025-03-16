const nodeMailer = require('nodemailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport(
    {
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    }
)

async function mailSender(email, subject, body) {
    const info = await transporter.sendMail(
        {
            from: `Send by NoteFlow ${process.env.MAIL_HOST}`,
            to: email,
            subject: subject,
            html: body
        }
    )

    console.log("mail sent successfully", info);
}

module.exports = mailSender;