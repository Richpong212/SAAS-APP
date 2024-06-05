import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
    try {
        // get user data from request body
        const { name, email, password } = req.body;

        // check if all field are filled
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // create new user
        const newUser = new User({
            name,
            email, 
            password: hashedPassword
         });

        // save user to database
        const savedUser = await newUser.save();

        return res.status(200).json({
            message: "success",
            user: savedUser
         });   
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
        // get user data from request body
        const { email, password } = req.body;

        // check if all field are filled
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        return res.status(200).json({
            message: "success",
            user
        });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
};