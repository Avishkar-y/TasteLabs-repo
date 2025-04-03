import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
    const { name, gmail, password } = req.body;

    try {
        let user = await User.findOne({ gmail });

        if (user) return res.json({ message: "User Already exist" });

        const hashPass = await bcrypt.hash(password, 10);

        user = await User.create({ name, gmail, password: hashPass });

        res.json({ message: "User Register Successfully..!", user });
    } catch (error) {
        res.json({ message: error });
    }
};

// Log in an existing user and return JWT token
export const login = async (req, res) => {
    const { gmail, password } = req.body;

    try {
        let user = await User.findOne({ gmail });
        // If user doesn't exist
        if (!user) return res.json({ message: "User not exist..!" });

        // Check if password is correct
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "!@#$%^&*()", {
            expiresIn: '1d'
        });

        res.json({ message: `Welcome ${user.name}`, token });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Return authenticated user's profile
export const profile = async (req, res) => {
    res.json({ user: req.user });
};
