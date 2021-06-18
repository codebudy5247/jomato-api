const bcrypt =require ("bcryptjs");
const jwt =require("jsonwebtoken");

const User=require("../models/userModel.js");

exports.signup = async (req, res) => {
    const { name, email, password, avatar, PhoneNumber } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            name,
            avatar,
            PhoneNumber
        });

        const token = jwt.sign(
            { name: result.name, id: result._id , Role:result.Role},
            process.env.JWT_SECRET,
            {
                expiresIn: "11h",
            }
        );

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

exports.signin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { name: oldUser.name, id: oldUser._id ,Role:oldUser.Role},
            process.env.JWT_SECRET,
            {
                expiresIn: "11h",
            }
        );

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }



}



