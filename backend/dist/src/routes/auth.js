"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ormconfig_1 = require("../../ormconfig");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// Register novo usuario
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos sÃ£o obrigatÃ³rios' });
        }
        const userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: 'Email jÃ¡ Existe' });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await userRepository.save(user);
        res.status(201).json({ message: 'UsuÃ¡rio Registrado com Sucesso' });
    }
    catch (error) {
        console.error('Erro ao registrar usuÃ¡rio:', error);
        res.status(500).json({ message: 'Erro ao registrar usuÃ¡rio' });
    }
});
// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos os campos sÃ£o obrigatÃ³rios' });
        }
        const userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email ou Senha Inválida' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
        });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map