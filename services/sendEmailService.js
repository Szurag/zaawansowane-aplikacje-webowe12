const {createTransport} = require('nodemailer');
const path = require('path');
require('dotenv').config();

const sendEmails = async (emails, db) => {
    const {default: hbsNodemailer} = await import('nodemailer-express-handlebars');

    const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    transporter.use('compile', hbsNodemailer({
        viewEngine: {
            extName: '.hbs',
            partialsDir: path.resolve('./views/partials'),
            defaultLayout: false
        },
        viewPath: path.resolve('./views'),
        extName: '.hbs'
    }));

    for (const email of emails) {
        const user = await db.query('SELECT name FROM cmsUsers WHERE email = ?', [email]);
        const mailOptions = {
            from: process.env.EMAIL_SENDER_USER,
            to: email,
            subject: 'Lekcja 13',
            template: 'email-template',
            context: {
                name: user[0].name
            }
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`E-mail wysłany do: ${email}`);
        } catch (error) {
            console.error(`Błąd podczas wysyłania e-maila do ${email}:`, error);
        }
    }
};

module.exports = {sendEmails};