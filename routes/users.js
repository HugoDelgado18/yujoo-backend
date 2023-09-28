const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { User, Event, Comment } = require('../models/index');
const authenticateJWT = require('../middleware/index');


//POST/REGISTER
router.post('/register', async (req, res, next) => {
    try {
        const { firstName, lastName, username, password, location, age, job, about, hobbies, distancePreference, profilePicture } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({
            firstName,
            lastName,
            username,
            password: hash,
            location,
            age,
            job,
            about,
            hobbies,
            distancePreference,
            profilePicture 
        });
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        res.send({ message: "User successfully registered!", token, hash });
    } catch (err) {
        console.log(err);
        next(err);
    }
})

router.post('/login', async (req ,res, next) => {
    try {
        const { username, password } = req.body;
        
        const  userToLogin = await User.findOne({
            where: {
                username: username
            }, include: [
                { model: Event, as: 'Events' },
                // { model: Comment, as: "Comments" }
            ]
        });
        if (userToLogin === null) {
            res.send('User note found, please try again or register user.');
        } else {
            const comparePasswords = await bcrypt.compare(password, userToLogin.password);
            if (!comparePasswords){
                console.log(userToLogin.password, password)
                res.send("Failed to Login.")
            } else {
                const token = jwt.sign(username, process.env.JWT_SECRET);
                res.send({ message: `Welcome, ${userToLogin.firstName}, you have successfully been logged in!`, token, userToLogin });
            }
        }
    } catch (error) {
        next(error);
    }
});

// get all users
router.get('/', async (req, res, next) => {
    try {
        const allUsers = await User.findAll({
            include: [
                { model: Event, as: 'Events' }
            ]
        });
        res.json(allUsers);
    } catch (error) {
        next(error);
    }
});

// get user by id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        // const user = await User.findByPk(id);
        const user = await User.findOne({
            where: {
                id: id
            }, include: [
                { model: Event, as: 'Events' },
                // { model: Comment, as: "Comments" }
            ]
        })
        res.json(user);
    } catch (error) {
        next(error);
    };
});
// get by username
router.get('/user/:username', async (req, res, next) => {
    try {
        const username = req.params.username;
        // const user = await User.findByPk(id);
        const user = await User.findOne({
            where: {
                username: username
            }, include: [
                { model: Event, as: 'Events' },
                // { model: Comment, as: "Comments" }
            ]
        })
        res.json(user);
    } catch (error) {
        next(error);
    };
});

router.post('/', async (req, res, next) => {
    try {
        const { firstName, lastName, username, password, location, age, job, about, hobbies, distancePreference, profilePicture } = req.body;
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            location: location,
            age: age,
            job: job,
            about: about,
            hobbies: hobbies,
            distancePreference: distancePreference,
            profilePicture: profilePicture
        });
        res.json(newUser);
    } catch (error) {
        next(error);
    };
});

router.put('/:id', async (req, res, next) => {
    try {
        const { firstName, lastName, username, password, location, age, job, about, hobbies, distancePreference, profilePicture } = req.body;
        const id = req.params.id;
        const user = await User.findByPk(id);
        const hashedPW = await hashPassword(password, 10);
        await user.update({ firstName, lastName, username, password: hashedPW, location, age, job, about, hobbies, distancePreference, profilePicture });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    };
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id)
        await user.destroy();
        res.sendStatus(204);
    } catch (error) {

    }
});
// add event to user
router.post('/event/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { title, description, date, time, duration, image } = req.body;
        const user = await User.findByPk(userId);
        const newEvent = await Event.create({
            title: title,
            description: description,
            date: date,
            time: time,
            duration: duration,
            image: image,
        })
        await user.addEvent(newEvent);
        res.json(newEvent);
    } catch (error) {
        next(error);
    }
})


module.exports = router;