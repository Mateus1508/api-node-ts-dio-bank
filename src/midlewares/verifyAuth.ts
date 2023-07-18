import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (authToken) {
        const [,token] = authToken.split(' ');

        try {
            const { sub } = verify(token, '123456789')
            console.log('Token for user', sub);
            return next();
        }
        catch(err) {
            return res.status(401).json({messages: 'User don\'t authorized!'})
        }
    }
    return res.status(401).json({messages: 'User don\'t authorized!'})
}