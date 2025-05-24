const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
    
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ auth: false, message: 'Token não providenciado' });
    }
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Erro na autenticação' });
        }
        
        req.userId = decoded.id; 
        next();
    });
}