const jwt = require('jsonwebtoken');
const redisClient = require('../helpers/configRedis.helper');
const { JWT_SECRET } = process.env;

const authMiddleware = {
    isAuth: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new Error('Token is required');
            }
            const decoded = jwt.verify(token, JWT_SECRET);
            if (!decoded) {
                throw new Error('Token is not valid');
            }
            
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