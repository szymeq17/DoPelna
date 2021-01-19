exports.getIndex = (req, res, next) => {
     res.render('index', {
         pageTitle: "DoPełna"
     });
}

exports.getAddPrice = (req, res, next) => {
    res.render('add-price', {
        pageTitle: "Dodaj cenę paliwa"
    });
}

exports.getAddStation = (req, res, next) => {
    res.render('add-station', {
        pageTitle: "Dodaj nową stację"
    });
}