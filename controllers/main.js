exports.getIndex = (req, res, next) => {
    res.render('index', {
         pageTitle: "DoPełna",
         path: "/",
         loggedin: req.session.isLoggedIn
     });
     if(req.user) {
        console.log("\u001B[32mUżytkownik: " + req.user.nickname + "\u001B[0m");
     }
}