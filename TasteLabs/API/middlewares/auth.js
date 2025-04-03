import { User } from "../Models/User.js";
import jwt from 'jsonwebtoken'

// Middleware to authenticate user using JWT
export const Authenticate = async (req, res, next) => {
    const token = req.header("Auth");

    try {
        // If no token is provided, prompt user to log in
        if (!token) return res.json({ message: "login first" });

        // Verify the token and extract user ID
        const decode = jwt.verify(token, "!@#$%^&*()");
        const id = decode.userId;

        // Find user by ID from database
        let user = await User.findById(id);

        // If user not found, respond accordingly
        if (!user) return res.json({ message: "User not exist" });

        // Attach user to request object and proceed
        req.user = user;
        next();
    } catch (error) {
        // Catch any token verification or DB errors
        res.json({ message: error });
    }
}
