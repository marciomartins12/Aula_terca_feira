function userMiddleware(req, res, next) {
    if (req.session.user && req.session.user.email) {
        return next();
    } else {
        res.render("login");
    }
}
module.exports = userMiddleware;