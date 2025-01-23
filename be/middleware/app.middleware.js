const jwt = require('jsonwebtoken');
const redisClient = require('../helpers/configRedis.helper');
const { JWT_SECRET } = process.env;

const authMiddleware = {
    isAuth: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            
            const stroredToken = await redisClient.get(`token:${decoded.id}`);
            if (token !== stroredToken) {
                throw new Error('Token is not valid');
            }
            req.user = decoded.id;
            next();
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = authMiddleware;