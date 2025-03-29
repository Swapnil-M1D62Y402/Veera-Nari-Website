import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import db from '../config/db.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    token = req.cookies.jwt || (req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1]);

    if (!token) {
        res.status(401).json({ msg: "Auth Error" })
        throw new Error("Not Authorized, no token");
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await db.user.findUnique({
            where: { id: decode.userId },
            select: { id: true, email: true, name: true }
        });
        next();

    } catch (err) {
        res.status(401).json({ msg: "Auth Error" })
        throw new Error("Not Authorized, token failed");
    }
});

export default protect;