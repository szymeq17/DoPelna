const User =  require("../models/user");
const Price = require("../models/price");
const Station = require("../models/station");

exports.getIndex = (req, res, next) => {
    Price.findAll({
        limit: 6,
        order: [
            ["date", "DESC"]
        ]
    })
    .then(result => {
        res.render('index', {
            pageTitle: "DoPełna",
            path: "/",
            loggedin: req.session.isLoggedIn,
            recent: result,
            results: []
        });
        if(req.user) {
           console.log("\u001B[32mUżytkownik: " + req.user.nickname + "\u001B[0m");
        }
    })
    .catch(err => {
        console.log(err);
    })   
}