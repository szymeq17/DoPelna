const Price = require('../models/price')
const Station = require('../models/station');

exports.getAddPrice = (req, res, next) => {
    res.render('add-price', {
        pageTitle: "Dodaj cenę paliwa",
        path: "/add-price"
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

    let station;

    Station.findOne({where: {
        name: name,
        street: street,
        city: city,
        postalCode: postalcode 
    }})
    .then(result => {
        station = result;
        return Price.create({
            fuelType: fuelType,
            value: price,
            date: date
        });
    })
    .then(newPrice => {
        return station.addPrice(newPrice);
    })
    .then(() => {
        res.redirect('/add-price');
    })
    .catch(err => {
        console.log(err);
    })
}