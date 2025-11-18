"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ormconfig_1 = require("../../ormconfig");
const Organization_1 = require("../entities/Organization");
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'segredo';
router.post('/org-register', async (req, res) => {
    const { orgName, name, email, password } = req.body;
    const orgRepo = ormconfig_1.AppDataSource.getRepository(Organization_1.Organization);
    const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
    const existing = await userRepo.findOne({ where: { email } });
    if (existing)
        return res.status(400).json({ error: 'Email jÃ¡ cadastrado' });
    const organization = orgRepo.create({ name: orgName });
    await orgRepo.save(organization);
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const user = userRepo.create({
        name,
        email,
        password: passwordHash,
        organization,
        role: 'admin',
    });
    await userRepo.save(user);
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
});
exports.default = router;
//# sourceMappingURL=orgRegister.js.map