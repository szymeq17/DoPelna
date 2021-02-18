const Price = require('../models/price')

exports.getAddPrice = (req, res, next) => {
    res.render('add-price', {
        pageTitle: "Dodaj cenę paliwa"
    });
}