import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    let token;

    // Get token from cookies
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify token
            jwt.verify(token, process.env.JWT_SECRET);

            next(); // Proceed to the next middleware if token is valid
        } catch (error) {
            console.log(error);
            return res.status(401).json({ msg: "Not authorized" });
        }
    } else {
        return res.status(401).json({ msg: "Not authorized, no token" });
    }
};

export { verifyToken };
