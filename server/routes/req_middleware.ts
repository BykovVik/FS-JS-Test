import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // Далее можно проводить проверку в базе данных или другом хранилище наличия пользователя с данным decodedToken.sub
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default isLoggedIn