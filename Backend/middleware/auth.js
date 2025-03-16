const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};