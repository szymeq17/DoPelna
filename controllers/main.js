exports.getIndex = (req, res, next) => {
    console.log("gówno") 
    res.render('index', {
         pageTitle: "DoPełna"
     });
     
}