import jwt from "jsonwebtoken"
import { compare } from "bcrypt"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants.js';

const users = [{
    email: "david.cagigas@gmail.com",
    password: "$2b$10$X3zlzKn93J9bGfZz4kHxnuBbTGQ7D0R5R.Ron/fi9/j9TWInlXohK" //123456
}]
let refreshTokens = []


function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15m" }) 
}

function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "20m" })
    refreshTokens.push(refreshToken)
    return refreshToken
}
    
export const loginUser = async (req, res) => {
    const { email, password } = req.query;
    if (!email || !password) {
        return res.status(400).send('Missing required fields: email or password');
    } 
    
    const user = users.find((user) => user.email == email)
    if (user == null) {
        return res.status(400).send('User not found!');
    }
    if (await compare(password, user.password)) {
        const accessToken = generateAccessToken({email})
        const refreshToken = generateRefreshToken({email})
        return res.json({ accessToken, refreshToken })
    } 
    else {
        return res.status(401).send('Password Incorrect');
    }
};
/*
const createUser = async (req, res) => {
    const { email, password } = req.body;
    // TO DO: Validate email and password, There are libraries like zod or joi that can help with this.
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({email, password: hashedPassword})
    res.status(201).send(users)
};

const refreshToken = async (req,res) => {
    const { email, token } = req.body
    if (!refreshTokens.includes(token)) {
        return res.status(400).send("Refresh Token Invalid")
    }
    refreshTokens = refreshTokens.filter( (c) => c !== token)

    const accessToken = generateAccessToken({user: email})
    const refreshToken = generateRefreshToken({user: email})

    res.json({accessToken, refreshToken})
};
const logout = (req,res) => {
    const { token } = req.body
    refreshTokens = refreshTokens.filter( (c) => c != token)
    return res.status(204).send("Logged out!")
}
*/

