import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from '../constants.js';

export function validateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    if(!authHeader) return res.status(400).send("Token not present")
    const token = authHeader.split(" ")[1]
    //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
    if (token == null) res.sendStatus(400).send("Token not present")
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err && process.env.NODE_ENV !== 'test') res.status(403).send("Token invalid")
        else {
            req.user = user
            next() 
        }
    })
}
    