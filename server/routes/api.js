const express = require('express');
const router = express.Router();

const db = 'mongodb://userankit:ankit123@dbh61.mlab.com:27617/eventsdb';
const mongoose = require('mongoose');
mongoose.connect(db, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to mongodb');
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, 'secretkey');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;
    next();
}

router.get('/', (req, res) => {
    res.send('From API route');
})

const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);

        } else {
            const payload = { subject: registeredUser._id };
            const token = jwt.sign(payload, 'secretkey');

            res.status(200).send({ token });
        }
    });
});


router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            res.status(500).send('Internal server error');
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid credentials');
                } else {
                    const payload = { subject: user._id };
                    const token = jwt.sign(payload, 'secretkey');
                    res.status(200).send({ token });
                }
            }

        }
    });
});

router.get('/restricted', verifyToken, (req, res) => {
    const str = "only logged in users can see this restrcited data";
    res.json(str);
});

module.exports = router;