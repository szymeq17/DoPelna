const User = require("../models/user");
const bcrypt = require('bcryptjs');


exports.getLogin = (req, res, next) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render('login', {
        pageTitle: "Zaloguj się",
        path: "/user/login",
        loggedin: req.session.isLoggedIn,
        error: message
    });
}

exports.getRegister = (req, res, next) => {
    res.render('register', {
        pageTitle: "Zarejestruj się",
        path: "/user/register",
        loggedin: req.session.isLoggedIn
    });
}

exports.postLogin = (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;

    User.findOne({where: {
        nickname: login
    }})
    .then(result => {
        if(result === null) {
            req.flash("error", "Niepoprawna nazwa użytkownika lub hasło");
            res.redirect("/user/login")
        }
        bcrypt.compare(password, result.password)
        .then(match => {
            if(match) {
                req.session.isLoggedIn = true;
                req.session.user = result;
                res.redirect("/");
            }
            else {
                req.flash("error", "Niepoprawna nazwa użytkownika lub hasło");
                res.redirect("/user/login");
            }
            
        })
        .catch(err => {
            console.log(err);
            res.redirect("user/login");
        })
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postRegister = (req, res, next) => {
    const login = req.body.login;
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    User.findOne({where: {
        nickname: login
    }})
    .then(result => {
        if(result === null) {
            if(password1 !== password2) {
                console.log("\u001B[31mHasła nie są takie same\u001B[0m");
                return res.redirect("/user/register");
            }
            return bcrypt.hash(password1, 12)
            .then(hashedPassword => {
                let user = new User({
                    nickname: login,
                    password: hashedPassword,
                    points: 0
                });
        
                user.save()
                .then(() => {
                    console.log("\u001B[32mUtworzono konto\u001B[0m");
                    res.redirect("/user/login");
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
        else {
            console.log("\u001B[31mIstieje już użytkownik o tej nazwie\u001B[0m");
            return res.redirect("/");
        }
    });
    
}

exports.getLogout = (req, res, next) => {
    req.user = null;
    req.session.isLoggedIn = false;
    res.redirect("/");
}

exports.getMyProfile = (req, res, next) => {
    user = req.user;
    user.getPrices()
    .then(prices => {
        res.render('my-profile', {
            pageTitle: "Mój profil",
            path: "/user/my-profile",
            loggedin: req.session.isLoggedIn,
            prices: prices,
            user: user.nickname,
            points: user.points
        });
    })
    .catch(err => {
        console.log(err);
    })
}