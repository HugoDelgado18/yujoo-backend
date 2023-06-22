const express = require('express');
const router = express.Router();
const { User, Event } = require('../models/index');

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

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        // const user = await User.findByPk(id);
        const user = await User.findOne({
            where: {
                id: id
            }, include: [
                { model: Event, as: 'Events' }
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
                { model: Event, as: 'Events' }
            ]
        })
        res.json(user);
    } catch (error) {
        next(error);
    };
});

router.post('/', async (req, res, next) => {
    try {
        const { firstName, lastName, username, password, location, age, job, about, hobbies, distancePreference } = req.body;
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
            distancePreference: distancePreference
        });
        res.json(newUser);
    } catch (error) {
        next(error);
    };
});

router.put('/:id', async (req, res, next) => {
    try {
        const { firstName, lastName, username, password, location, age, job, about, hobbies, distancePreference } = req.body;
        const id = req.params.id;
        const user = await User.findByPk(id);
        await user.update({ firstName, lastName, username, password, location, age, job, about, hobbies, distancePreference });
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
        const { title, description, date, time, duration, image, comment } = req.body;
        const user = await User.findByPk(userId);
        const newEvent = await Event.create({
            title: title,
            description: description,
            date: date,
            time: time,
            duration: duration,
            image: image,
            comment: comment
        })
        await user.addEvent(newEvent);
        res.json(newEvent);
    } catch (error) {
        next(error);
    }
})


module.exports = router;