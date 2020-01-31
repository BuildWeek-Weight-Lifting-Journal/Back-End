module.exports = (req, res, next) => {
    // this checkes the cookie with the login data, and if it exist the it will go to next()
    if (req.sessions && req.sessions.user) {
        next()
    } else {
        try{
            res.redirect('/')
        } catch {
            res.status(401).json({
                message: 'Sorry you can not proceed'
            })
        }
    }
}