import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

declare global{
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
    
    
    
    export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;  
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };   
            req.userId = decoded.userId;  
            next();
        } catch (error){  
            return res.status(401).json({ message: 'Token inválido' });
        } 
}  
