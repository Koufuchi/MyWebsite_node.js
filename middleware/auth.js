function isAuthenticated(req, res, next) {
    if (req.session.auth) {
        return next();
    } else {
        res.status(401);
        res.json({ "status": 1 });
    }
}
module.exports = isAuthenticated;
