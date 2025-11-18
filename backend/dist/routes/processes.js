"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ormconfig_1 = require("../ormconfig");
const Process_1 = require("../entities/Process");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Get all processes for the authenticated user
router.get('/processes', authMiddleware_1.authMiddleware, async (req, res) => {
    const repo = ormconfig_1.AppDataSource.getRepository(Process_1.Process);
    const processes = await repo.find({ where: { user: { id: req.userId } }, relations: ['report'], order: { createdAt: 'DESC' },
    });
    res.json(processes);
});
exports.default = router;
//# sourceMappingURL=processes.js.map