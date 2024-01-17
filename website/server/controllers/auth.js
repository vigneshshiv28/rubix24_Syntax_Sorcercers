import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const signUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if(!email){
        return res.status(400).json({ message: "Email or phone number is required" });
    }

    try {
        
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "Account already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            firstName,
            lastName,
            profileImage,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

export { signUp };