const db = require('../models/index');
const Day = db.Day;
const Voyage = db.Voyage;

exports.days = async function (req, res) {
    await Day.findAll({include: [Voyage]})
        .then(data => {
            console.log("All days:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.dayCreate = async function (req, res) {
    let day = Day.build({ title: req.body.title, 
        content: req.body.content, 
        specifiedTime: req.body.specifiedTime, 
        specifiedLocation: req.body.specifiedLocation, 
        voyage_id: req.body.voyage_id})
    await day.save()
        .then(data => {
            console.log(day.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.dayUpdate = async function (req, res) {
    if (req.params.day_id > 0) {
        await Day.update(
            { title: req.body.title, content: req.body.content, specifiedTime: req.body.specifiedTime, specifiedLocation: req.body.specifiedLocation, voyage_id: req.body.voyage_id},
            { where: { day_id: req.params.day_id } }
        )
            .then(data => {
                if (data[0] == 0) {res.status(400).json({ message: 'Day not found' })} 
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Day not found' })
}

exports.dayDelete = async function (req, res) {
    if (req.params.day_id) {
        await Note.destroy({ where: { day_id: req.params.day_id } })
            .then(data => {
                if (data == 0) res.status(400).json({ message: 'Day not found' });
                else res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Day not found' })
}

exports.dayDetail = async function (req, res) {
    if (req.params.day_id) {
        await Day.findOne({ where: { day_id: req.params.day_id }, include: [Voyage] })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Day not found' })
}

// const { Op } = require("sequelize");
exports.dayFilter = async function (req, res) {
    let params = {}; 
    Object.entries(req.body).forEach(([key, value]) => { 
        params[key]  = value; 
    });
    await Day.findAll({ where: params  })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}