const sequelize = require("../models/index.js");
const db = require("../models");

const Biodata = db.biodata;
const Op = db.Sequelize.Op;

// Create Biodata
exports.create = (req, res) => {
    // validate nama
    if(!req.body.nama) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
        return;
    }

    // Biodata obj
    const biodata = {
        nama: req.body.nama,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat
    }

    // save to database
    Biodata.create(biodata)
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error inserting biodata: " + err
        })
    })
}

// Read Biodata
exports.findAll = (req, res) => {
    Biodata.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error while retrieving biodata"
        })
    })
}

// Find single biodata from database
exports.findOne = (req, res) => {
    Biodata.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error while finding biodata"
        });
    });
};


// Update Biodata
exports.update = (req, res) => {
    // Obj biodata
    Biodata.update(
        {
            nama: req.body.nama,
            tempat_lahir: req.body.tempat_lahir,
            tanggal_lahir: req.body.tanggal_lahir,
            alamat: req.body.alamat
        },

        {
        where: {
            id: req.params.id
        }
    })
    .then(
        res.send({
            message: "Success update biodata with id = " + req.params.id + "!"
        })
    )
    .catch(err => {
        res.status(500).send({
            message: err.message || "Couldn't update book with id = "+ req.params.id
        })
    })
}

// Update one column/more
exports.updateOne = async (req, res) => {
    await Biodata.update(
        {
            nama: req.body.nama,
            tempat_lahir: req.body.tempat_lahir,
            tanggal_lahir: req.body.tanggal_lahir,
            alamat: req.body.alamat
        },

        {
        where: {
            id: req.params.id
        }
    })
    .then(
        res.send({
            message: "Success update biodata with id = " + req.params.id + "!"
        })
    )
    .catch(err => {
        res.status(500).send({
            message: err.message || "Couldn't update biodata with id = "+ req.params.id
        })
    })
}

// Delete a biodata
exports.delete = (req, res) => {
    Biodata.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(
        res.send({
            message: "Success delete biodata with id = " + req.params.id + "!"
        })
    )
    .catch(err => {
        res.status(500).send({
            message: err.message || "Couldn't delete biodata with id = "+ req.params.id
        })
    })
};