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
    let prices = [[], [], [], []];

    Station.findAll({
        where: {
            name: {
                [Op.regexp]: "(?i)" + stationName
            },
            city: {
                [Op.regexp]: "(?i)" + stationCity
            }
        },
        include: {
            model: Price,
            where: {
                fuelType: "pb95"
            },
            limit: 1,
            order: [
            ["date", "DESC"]
            ]
        }

    })
    .then(results => {
        stations = results;
        for (let i=0; i<results.length; i++) {
            prices[0].push(results[i].prices === undefined ? null : results[i].prices[0]);
        }
    })
    .then(() => {
        return Station.findAll({
            where: {
                name: stationName
            },
            include: {
                model: Price,
                where: {
                    fuelType: "pb98"
                },
                limit: 1,
                order: [
                ["date", "DESC"]
                ]
            }
        });
    })
    .then(results => {
        for (let i=0; i<results.length; i++) {
            prices[1].push(results[i].prices === undefined ? null : results[i].prices[0]);
        }
    })
    .then(() => {
        return Station.findAll({
            where: {
                name: stationName
            },
            include: {
                model: Price,
                where: {
                    fuelType: "on"
                },
                limit: 1,
                order: [
                ["date", "DESC"]
                ]
            }
        });
    })
    .then(results => {
        for (let i=0; i<results.length; i++) {
            prices[2].push(results[i].prices === undefined ? null : results[i].prices[0]);
        }
    })
    .then(() => {
        return Station.findAll({
            where: {
                name: stationName
            },
            include: {
                model: Price,
                where: {
                    fuelType: "lpg"
                },
                limit: 1,
                order: [
                ["date", "DESC"]
                ]
            }
        });
    })
    .then(results => {
        for (let i=0; i<results.length; i++) {
            prices[3].push(results[i].prices === undefined ? null : results[i].prices[0]);
        }
    })
    .then(() => {
        console.log(prices);
        console.log(stations);
        res.render('index', {
            pageTitle: "DoPełna",
            path: "/",
            loggedin: req.session.isLoggedIn,
            recent: [],
            results: stations,
            prices: prices
        });
    })
    .catch(err => {
        console.log(err);
    });
}
