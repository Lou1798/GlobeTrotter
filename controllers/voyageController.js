const db = require('../models/index');
const Voyage = db.Voyage;
const Day =  db.Day;

exports.dayLink = async function (req, res) {
    await Voyage.findAll({ include: Day,  where: { voyage_id: req.params.voyage_id } })
        .then(data => {
            console.log("All voyages:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.voyages = async function (req, res) {
    await Voyage.findAll()
        .then(data => {
            console.log("All voyages:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    
}

exports.voyageCreate = async (req, res) => {
    let voyage = Voyage.build({ name: req.body.name, 
        user_id: req.body.user_id })
    await voyage.save()
        .then(data => {
            console.log(voyage.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.voyageUpdate = async function (req, res) {
    if (req.params.voyage_id > 0) {
        await Voyage.update(
            {
                name: req.body.name },
            { where: { voyage_id: req.params.voyage_id } }
        )
            .then(data => {
                if (data[0] == 0) { res.status(400).json({ message: 'Not found' }) }
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Voyage not found' })
}

exports.voyageDelete = async function (req, res) {
    if (req.params.category_id) {
        await Voyage.destroy({ where: { voyage_id: req.params.voyage_id } })
            .then(data => {
                if (data == 0) res.status(400).json({ message: 'Not found' });
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Voyage not found' })
}

exports.voyageDetail = async function (req, res) {
    if (req.params.voyage_id) {
        await Voyage.findOne({ where: { voyage_id: req.params.voyage_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Voyage not found' })
}

// const { Op } = require("sequelize");
exports.voyageFilter = async function (req, res) {
    let params = {};
    Object.entries(req.body).forEach(([key, value]) => {
        params[key] = value;

    });
    await Voyage.findAll({  where: params })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}