"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../entities/User");
const Process_1 = require("../entities/Process");
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const ormconfig_1 = require("../../ormconfig");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
//Rota total de usuarios e processos
router.get("/admin/stats", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, async (req, res) => {
    try {
        const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
        const processRepo = ormconfig_1.AppDataSource.getRepository(Process_1.Process);
        const [users, processes] = await Promise.all([
            userRepo.count({ where: { organization: { id: req.orgId } } }),
            processRepo.count({ where: { organization: { id: req.orgId } } }),
        ]);
        res.json({ totalUsers: users, totalProcesses: processes });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao obter estatísticas administrativas." });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map