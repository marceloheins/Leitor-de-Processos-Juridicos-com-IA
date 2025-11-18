"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = adminMiddleware;
const User_1 = require("../entities/User");
const ormconfig_1 = require("../ormconfig");
async function adminMiddleware(req, res, next) {
    const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
    const user = await userRepo.findOne({ where: { id: req.userId }, relations: ['organization'] });
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado. PermissÃµes de administrador necessÃ¡rias.' });
    }
    if (user.organization) {
        req.orgId = user.organization.id;
    }
    return next();
}
//# sourceMappingURL=adminMiddleware.js.map