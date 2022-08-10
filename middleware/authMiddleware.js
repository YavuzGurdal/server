// bunu crud islemlerinde kullaniyoruz. 
// islem yapan kisi ile login olan kisinin ayni kisi olup olmadigini kontrol ediyoruz

import jwt from 'jsonwebtoken';
import { createError } from '../error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(createError(401, 'Not Authenticated!'))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // jwt'nin verify metodu ile token'in gecerli olup olmadigina bakiyoruz
        // (err, user) jwt'den geliyor. user icinde user id var

        if (err) return next(createError(403, 'Token is not valid!'))

        req.user = user; // bu sekilde verifyToken'in kullanildigi yerlerde user bilgilerini kullanabilirim
        // console.log(user)
        next()
    })
}