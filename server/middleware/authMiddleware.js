const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.cookies.Authtoken;
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Include user role and email in the request
        req.userEmail = decoded.email; // Attach userEmail to request

        next();
    } catch (error) {
        console.log('Token verification error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
}

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.userType)) {
            return res.status(403).json({ error: 'Access denied - insufficient permissions' });
        }
        next();
    };
}

module.exports = { verifyToken, authorizeRoles };
