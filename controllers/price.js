const Price = require('../models/price')
const Station = require('../models/station');

exports.getAddPrice = (req, res, next) => {
    res.render('add-price', {
        pageTitle: "Dodaj cenę paliwa",
        path: "/add-price",
        loggedin: req.session.isLoggedIn
    });
}

exports.postAddPrice = (req, res, next) => {
    const name = req.body.name;
    const street = req.body.street;
    const city = req.body.city;
    const postalcode = req.body.postalcode;
    const fuelType = req.body.type;
    const price = parseFloat(req.body.price);
    const date = req.body.date;
    const username = req.user.nickname;

    let station;
    let newPrice;

    Station.findOne({where: {
        name: name,
        street: street,
        city: city,
        postalCode: postalcode 
    }})
    .then(result => {
        if(result === null) {
            res.redirect("/add-price");
        }
        else {
            station = result;
            return Price.create({
            fuelType: fuelType,
            value: price,
            date: date,
            stationName: name,
            stationPostalCode: postalcode,
            stationCity: city,
            stationStreet: street,
            stationUser: username
        });
        }
        
    })
    .then(result => {
        newPrice = result;
        return station.addPrice(newPrice);
    })
    .then(() => {
        let user = req.user;
        return user.addPrice(newPrice);
    })
    .then( () => {
        return req.user.increment("points", {by: 1});
    })
    .then(() => {
        res.redirect('/add-price');
    })
    .catch(err => {
        console.log(err);
    })
}