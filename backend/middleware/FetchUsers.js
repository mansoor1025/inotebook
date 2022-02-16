const jwt = require('jsonwebtoken');
// secret jwt token
const jwt_secret = "dasdasdasdas";

// fetch user function
const FetchUsers = (req, res, next) => {
    try {
        const token = req.header('auth_token');

        // if token is empty
        if (!token) {
            return res.status(401).json({ error: "token is not valid access denied" })
        }

        // verify jwt token
        jwt.verify(token, jwt_secret, function (err, decoded) {

            // check if token is invalid
            if (err) {
                return res.status(401).json({ error: "token is not valid access denied" })
            }
            else {
                // send user_id via middleware
                req.user = decoded.user_id;
                next()
            }

        });
    } catch (error) {
        // error handling
        console.log(error);
        return res.status(401).json({ error: "token is not valid access denied" })
    }
}

module.exports = FetchUsers;