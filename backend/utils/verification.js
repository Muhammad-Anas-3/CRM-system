import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Invalid token!"));
        req.user = user;
        next();
    });
};

export { verifyToken };
