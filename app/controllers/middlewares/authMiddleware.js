const jwt = require('jsonwebtoken');
const {jwtSecret} = require('./../../../config/app');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({message: 'Token not provided.'})
    } else {
        const token = authHeader.replace('Bearer ', '');
        try {
            jwt.verify(token, jwtSecret);
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                res.status(401).json({message: 'Invalid token.'})
            }
        }
        next();
    }
};