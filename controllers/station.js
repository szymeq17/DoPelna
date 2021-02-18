const Station = require('../models/station')
const { Op } = require("sequelize");

exports.getAddStation = (req, res, next) => {
    res.render('add-station', {
        pageTitle: "Dodaj nową stację",
        path: "/add-station",
        loggedin: req.session.isLoggedIn
    });
}

exports.postAddStation = (req, res, next) => {
    const name = req.body.name;
    const street = req.body.street;
    const city = req.body.city;
    const postalcode = req.body.postalcode;

    const station = new Station({
        name: name,
        postalCode: postalcode,
        city: city,
        street: street
    });

    Station.findOne({
        where: {
            postalCode: postalcode,
            city: city,
            street: street
        }
    })
    .then(result => {
        if (result === null) {
            station
            .save()
            .then(result => {
                console.log("\u001B[32mStworzono stację\u001B[0m");
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            console.log("\u001B[31mIstieje już stacja o tym adresie\u001B[0m");
            res.redirect("/add-station");
        }
    })
    .catch(err => {
        console.log(err);
    }) 
}

exports.findStations = (req, res, next, keyword) => {
    res.json("a");
}