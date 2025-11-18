import { Request, Response, NextFunction } from "express";
import {User} from "../entities/User";
import { AppDataSource } from "../../ormconfig";

declare global{
    namespace Express{
        interface Request {
            orgId?: string;
        }
    }
}


export async function adminMiddleware(req: Request & { userId?: string }, res: Response, next: NextFunction) {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: req.userId }, relations: ['organization']});

    if (!user || user.role !== 'admin'){
         return res.status(403).json({ message: 'Acesso negado. PermissÃµes de administrador necessÃ¡rias.' });
    }

    if(user.organization){
        req.orgId = user.organization.id;
    }
    return next();
}

