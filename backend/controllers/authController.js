import Admin from "../models/admin_model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newAdmin = new Admin({
            ...req.body,
            password: hash,
        });

        await newAdmin.save();

        const token = jwt.sign(
            { id: newAdmin._id, isAdmin: newAdmin.isAdmin },
            process.env.JWT_SECRET
        );

        const { password, ...otherDetails } = newAdmin._doc;
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ details: { ...otherDetails } });

    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({
            email: req.body.email,
        });
        console.log(admin)
        if (!admin) return next(errorHandler(404, "Admin not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            admin.password
        );
        if (!isPasswordCorrect)
            return next(errorHandler(400, "Wrong password or username!"));

        const token = jwt.sign(
            { id: admin._id, isAdmin: admin.isAdmin },
            process.env.JWT_SECRET
        );

        const { password, ...otherDetails } = admin._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails } });
    } catch (err) {
        next(err);
    }
};

export { register, login };
