const Station = require('../models/station')
const { Op } = require("sequelize");
const Price = require('../models/price');

exports.getStation = (req, res, next) => {
    let stationId = req.params.id;
    let station;

    let pb95;
    let pb98;
    let on;
    let lpg;

    Station.findOne({where: {id: stationId}})
    .then(result => {
        station = result;
    })
    .then(() => {
       return station.getPrices({
            where: {
                fuelType: "PB95"
            },
            limit: 1,
            order: [
            ["date", "DESC"]
            ]
        })
        .then(price => {
            pb95 = price[0];
        })
        .catch(err => {
            console.log(err);
        });
    })
    .then(() => {
        return station.getPrices({
            where: {
                fuelType: "PB98"
            },
            limit: 1,
            order: [
            ["date", "DESC"]
            ]
        })
        .then(price => {
            pb98 = price[0];
        })
        .catch(err => {
            console.log(err);
        });
    })
    .then(() => {
        return station.getPrices({
            where: {
                fuelType: "ON"
            },
            limit: 1,
            order: [
            ["date", "DESC"]
            ]
        })
        .then(price => {
            on = price[0];
        })
        .catch(err => {
            console.log(err);
        });
    })
    .then(() => {
        return station.getPrices({
            where: {
                fuelType: "LPG"
            },
            limit: 1,
            order: [
            ["date", "DESC"]
            ]
        })
        .then(price => {
            lpg = price[0];
        })
        .catch(err => {
            console.log(err);
        });
    })
    .then(() => {
        console.log(pb95);
        return res.render('station', {
            pageTitle: "Stacja",
            path: "station",
            loggedin: req.session.isLoggedIn,
            station: station,
            pb95: pb95,
            pb98: pb98,
            on: on,
            lpg: lpg
        });
    })
    .catch(err => {
        console.log(err);
    });

}

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
    }); 
}

exports.getfindStations = (req, res, next) => {
    const stationName = req.query.name;
    const stationCity = req.query.city;
    let stations;
    let prices = []

    Station.findAll({
        where: {
            name: stationName
        },

    })
    .then(results => {
        console.log(results[0]);
    })
    .catch(err => {
        console.log(err);
    });
}
