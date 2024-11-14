const express = require('express');
const router = express.Router();
const db = require('../helpers/db');
const { sendEmails } = require('../services/sendEmailService');
require('dotenv').config();

router.get('/email', async (req, res) => {
    try {
        const users = await db.query('SELECT * FROM cmsUsers');

        res.render('email', {users});
    } catch (error) {
        console.error('Błąd podczas pobierania użytkowników:', error);
        res.status(500).send('Błąd podczas pobierania użytkowników');
    }
});

router.post('/send-emails', async (req, res) => {
    const emails = req.body.emails;

    try {
        await sendEmails(emails, db);
        res.status(200).send({ message: 'E-maile zostały wysłane' });
    } catch (error) {
        console.error('Błąd podczas wysyłania e-maili:', error);
        res.status(500).send('Błąd podczas wysyłania e-maili');
    }
});
module.exports = router;