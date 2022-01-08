import jsonwebtoken from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((r) => r._id);
    } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = jsonwebtoken.sign(
        { id: savedUser._id.toString() },
        config.SECRET,
        {
            expiresIn: 86400, // 24 hours
        }
    );

    res.status(201).json({ token });
};

export const signIn = async (req, res) => {
    const findUser = await User.findOne({ email: req.body.email }).populate(
        "roles"
    );

    if (!findUser) return res.status(403).json({ message: "USER NOT FOUND" });

    const matchPassword = await User.matchPassword(
        req.body.password,
        findUser.password
    );

    if (!matchPassword)
        return res.status(401).json({ token: null, message: "Wrong password" });

    const token = jsonwebtoken.sign(
        { id: findUser._id.toString() },
        config.SECRET,
        {
            expiresIn: 84600, //24 hours
        }
    );

    console.log(findUser);

    res.status(200).json({ token });
};
