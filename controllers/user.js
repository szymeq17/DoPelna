const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: "Zaloguj się",
        path: "/user/login",
        loggedin: req.session.isLoggedIn
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
        nickname: login,
        password: password
    }})
    .then(result => {
        if(result !== null) {
            req.session.isLoggedIn = true;
            req.session.user = result;
            res.redirect("/");
        }
        else {
            res.redirect("/user/login")
        }
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
            if(password1 === password2) {
                let user = new User({
                    nickname: login,
                    password: password1,
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
            }
            else {
                res.redirect("/user/register");
                console.log("\u001B[31mHasła nie są takie same\u001B[0m")
            }
        }
        else {
            res.redirect("/");
            console.log("\u001B[31mIstieje już użytkownik o tej nazwie\u001B[0m");
        }
    })
    .catch(err => {
        console.log(err);
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