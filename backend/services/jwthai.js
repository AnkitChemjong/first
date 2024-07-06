import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey =process.env.SECRET;

function make(user) {
    if (!user) throw new Error('user must be specified');
    const payload = { userName: user.userName, email: user.email };
    const token = jwt.sign(payload, secretKey);
    return token;
}

function give(token) {
    if (!token) throw new Error('token must be specified');
    const user = jwt.verify(token, secretKey);
    return user;
}

export { make, give };
