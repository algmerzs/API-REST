import jsonwebtoken from "jsonwebtoken";
import User from "../models/User";

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
    });

    const savedUser = await newUser.save();

    jsonwebtoken.sign({ id: savedUser._id }, "", {});

    console.log(savedUser);
    res.send("signup");
};

export const signIn = async (req, res) => {
    res.status(201).json("sigin");
};
