const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {

        const token = req.headers?.authorization.slice(7);
        let decodedData;


        if (!token) return res.status(401);

        decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.username = decodedData?.username;
        req.email = decodedData?.email;

        next();
    } catch (err) {
        res.status(403).json({ message: "No permision." , error: err});
        
    }
}

module.exports = auth;