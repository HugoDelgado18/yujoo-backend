const express = require('express');
const router = express.Router();
const { User, Event, Comment } = require('../models/index');

router.get('/', async (req, res, next) => {
    try {
        const events = await Event.findAll({
            include: [
                { model: User, as: "Users" }
            ]
        });
        res.json(events);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const event = await Event.findOne({
            where: {
                id: id
            }, include: [
                { model: User, as: "Users" },
                { model: Comment, as: "Comments" }
            ]
        })
        res.json(event);
    } catch (error) {
        next(error);
    }
});

router.get('/event/:title', async (req, res, next) => {
    try {
        const title = req.params.title;
        const event = await Event.findOne({
            where: {
                title: title
            }, include: [
                { model: User, as: "Users" }
            ]
        })
        res.json(event);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { title, description, date, time, duration, image, comment } = req.body;
        const newEvent = await Event.create({
            title: title,
            description: description,
            date: date,
            time: time,
            duration: duration,
            image: image,
            comment: comment
        })
        res.json(newEvent);
    } catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { title, description, date, time, duration, image, comment } = req.body;
        const id = req.params.id;
        const event = await Event.findByPk(id);
        await event.update({ title, description, date, time, duration, image, comment });
        res.status(201).json(event);
    } catch (error) {
        next(error);
    };
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const event = await Event.findByPk(id);
        await event.destroy();
        res.status(202).send("Your event has successfully been deleted!")
    } catch (error) {
        next(error);
    }
})

// users to events
router.post('/user/:id', async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const userId = req.body.id;
        const event = await Event.findByPk(eventId);
        const user = await User.findByPk(userId);
        await event.addUser(user);
        res.json(event);
    } catch (error) {
        next(error);
    }
})
// user leaves comment on event post
router.post('/comment/:id', async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const content = req.body.content
        // consider adding users relationship to comments !!!
        // const userId = req.body.id;
        const event = await Event.findByPk(eventId);
        const newComment = await Comment.create({
            content: content
        })
        // const user = await User.findByPk(userId);
        await event.addComments(newComment);
        res.json(event);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
