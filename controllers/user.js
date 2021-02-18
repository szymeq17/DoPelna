exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: "Zaloguj się",
        path: "/user/login"
    });
}

exports.getRegister = (req, res, next) => {
    res.render('register', {
        pageTitle: "Zarejestruj się",
        path: "/user/register"
    });
}