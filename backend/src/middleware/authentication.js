const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, email) => {
        if (err) {
            return res.status(403).json({ status: 403, message: 'Sessione scaduta' });
        }

        req.email = email

        next()
    })
}

module.exports = authenticateToken;
