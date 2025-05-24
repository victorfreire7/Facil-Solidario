const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.headers['Authorization'];
    if(!token) return res.status(401).json({auth:false, message: 'token nao providenciado'});

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if(err) return res.status(500).json({auth:false, message:'erro na authenticaçao'});

        next();
    })
}