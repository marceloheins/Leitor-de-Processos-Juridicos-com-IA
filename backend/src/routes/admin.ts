import {Router, Request } from "express";
import { User } from "../entities/User";
import { Process } from "../entities/Process";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { AppDataSource } from "../../ormconfig";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

interface AdminRequest extends Request{
    orgId?: string;

}

//Rota total de usuarios e processos
router.get("/admin/stats", authMiddleware, adminMiddleware, async (req: AdminRequest, res) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const processRepo = AppDataSource.getRepository(Process);

        const [users, processes] = await Promise.all([
            userRepo.count({ where: { organization: { id: req.orgId}}}),
            processRepo.count({ where: { organization: { id: req.orgId}}}),
        ]);
        res.json({ totalUsers: users, totalProcesses: processes });
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter estatísticas administrativas." });
    }   
});
export default router;

