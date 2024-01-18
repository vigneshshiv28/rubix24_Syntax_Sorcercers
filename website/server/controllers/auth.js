import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import GridOwner from "../models/GridOwner";

const signUp = async (req, res) => {
    const {firstName, lastName,email, phoneNumber,password } = req.body;

    if(!email && !phoneNumber && !password && !firstName && !lastName){
        return res.status(400).json({ message: "Please fill the required field" });
    }

    try {
        
        const isUserExist = await GridOwner.findOne({ email });
        console.log(isUserExist);
        if (isUserExist) {
            return res.status(400).json({ message: "Account already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const gridOwner = new GridOwner({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        await gridOwner.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({ token, gridOwner });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const login = async (req, res) => {
    const { phoneNumber, password } = req.body;
    
    console.log(req.body);

    if( !phoneNumber){
        return res.status(400).json({ message: "Phone number is required" });
    }

    try {
        const user = await GridOwner.findOne({  phoneNumber });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { signUp , login};