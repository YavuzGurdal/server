// import mongoose from "mongoose";
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import { createError } from "../error.js";

// @desc Register new user
// @route POST /api/auth/signup
// @access Public
export const signup = asyncHandler(async (req, res, next) => {
    // req frontend'den gelen data(yani istekler)
    // res frontend'e giden data(yani cevaplar)

    const { name, email, password } = req.body // frontend'den gelen datayi destruction yapiyorum

    try {
        if (!name || !email || !password) return next(createError(400, 'Please add all fields'))

        // Cheeck if user exists
        const userExists = await User.findOne({ email })
        if (userExists) return next(createError(400, 'User already exists'))

        const salt = bcrypt.genSaltSync(10); // salt olusturuyoruz
        const hashedPassword = bcrypt.hashSync(password, salt); // salt ile password'u crypto'luyoruz
        const newUser = new User({ name, email, password: hashedPassword }); // user'i olusturuyoruz

        await newUser.save(); // oluturdugumuz user'i db'ye kaydediyoruz
        res.status(200).send("User has been created!"); // response olarak bu mesaji donuyoruz. bu mesaji frontend'de yakalayabiliriz 
    } catch (err) {
        next(err)
    }
})


// @desc Authenticate a user
// @route POST /api/auth/signin
// @access Public
export const signin = async (req, res, next) => {
    // req frontend'den gelen data(yani istekler)
    // res frontend'e giden data(yani cevaplar)

    //const { email, password } = req.body // sistem izin vermiyor

    try {
        if (!req.body.email || !req.body.password) return next(createError(400, 'Please add all fields'))

        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, 'User not found!'))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        // bcrypt.compare ile frontend'den gelen password ile db'deki passwordu karsilastiriyoruz

        if (!isCorrect) return next(createError(400, 'Wrong Credentials!'))

        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: '30d' // ne kadar surede gecersiz olacagi
        // })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        // hersey tamamsa hashlenmis token olusturuyoruz. bunu asagida cookie'ye gonderecegiz
        // token icin user'in id'sini kullandik

        const { password, ...others } = user._doc
        // user'in bilgileri icinden password'u cikariyoruz

        res.cookie("access_token", token, { // hash'lenmis token'i access_token olarak cookie'ye gonderiyoruz
            httpOnly: true
        }).status(200).json(others) // user'i gonderiyoruz
    } catch (err) {
        next(err);
    }
}