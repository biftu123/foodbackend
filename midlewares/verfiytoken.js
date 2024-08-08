const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader =  req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
				console.error("JWT Verification Error:", err.message);
                return res.status(403).json({ status: false, err: err.message });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ status: false, message: "You are not authenticated" });
    }
};

const verifyAndAuthorization = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (['client', 'admin', 'vendor', 'driver'].includes(req.user.userType)) {
            next();
        } else {
            return res.status(401).json({ status: false, message: "You are not allowed to access" });
        }
    });
};

const verifyVendor = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (['admin', 'vendor'].includes(req.user.userType)) {
            next();
        } else {
            return res.status(401).json({ status: false, message: "You are not allowed to access" });
        }
    });
};

const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === 'admin') {
            next();
        } else {
            return res.status(401).json({ status: false, message: "You are not allowed to access" });
        }
    });
};

const verifyDriver = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (['admin', 'driver'].includes(req.user.userType)) {
            next();
        } else {
            return res.status(401).json({ status: false, message: "You are not allowed to access" });
        }
    });
};

module.exports = { verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin };