exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: "Zaloguj się"
    });
}

exports.getRegister = (req, res, next) => {
    res.render('register', {
        pageTitle: "Zarejestruj się"
    });
}