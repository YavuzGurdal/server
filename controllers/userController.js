import User from '../models/UserModel.js';
import { createError } from '../error.js';

// @route GET /api/users/find/:id
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(
            req.params.id // get yapilacak ne ise onun id'sini yaziyorum
            // req.params.id 'daki id router.get("/find/:id", getUser); 'daki id'den geliyor
        )

        if (!user) return next(createError(404, 'User not found!'))

        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

// @route PUT /api/users/:id
export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        // req.params.id 'daki id router.put("/:id", verifyToken, updateUser); 'daki id'den geliyor
        // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
}

// @route DELETE /api/users/:id
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        // req.params.id 'daki id router.put("/:id", verifyToken, updateUser); 'daki id'den geliyor
        // req.user.id 'daki id authMiddleware icindeki verifyToken'daki jwt.verify icinden gonderilen req.user icinden geliyor
        try {
            const updatedUser = await User.findByIdAndDelete(
                req.params.id, // delete yapilacak ne ise onun id'sini yaziyorum
            )
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
}