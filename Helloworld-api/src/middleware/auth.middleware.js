import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getUserById } from '../api/v1/Services/user.service.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, "Not authorized, no token provided");
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // important: check correct property name (id or userId)
    const userId = decoded.id || decoded.userId;

    if (!userId) {
        throw new ApiError(401, "Invalid token payload: no user id");
    }

    const user = await getUserById(userId);

    if (!user) {
        throw new ApiError(401, "User no longer exists");
    }

    req.user = user;
    next();
});
