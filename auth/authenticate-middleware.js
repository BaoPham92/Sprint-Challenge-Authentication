const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req ?
        req.headers.authorization :
        req.connection.context.Authorization;

    console.log('HEADER LOGGING', header, req.headers );

    if (header) {
        const token = header.replace('Bearer ', '');

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedJWT) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid Credentials",
                    error: err
                });
            } else {
                req.decodedJWT = decodedJWT;
                next();
            }
        });
    } else {
        res.status(400).json({ message: "No credentials provided" });
    }
};
