"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ormconfig_1 = require("../ormconfig");
const Report_1 = require("../entities/Report");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Buscar relatÃ³rio por ID do processo
router.get('/report/:reportId', authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const { processId } = req.params;
        const userId = req.userId;
        const reportRepository = ormconfig_1.AppDataSource.getRepository(Report_1.Report);
        const report = await reportRepository.findOne({
            where: { process: { id: processId } },
            relations: ['interactions', 'process', 'process.user'],
        });
        if (!report) {
            return res.status(404).json({ message: 'RelatÃ³rio nÃ£o encontrado' });
        }
        //Verifica se o relatorio pertence ao usuario autenticado
        if (report.process.user.id !== userId) {
            return res.status(403).json({ message: 'Acesso negado ao relatÃ³rio' });
        }
        res.json(report);
    }
    catch (error) {
        console.error('Erro ao buscar relatÃ³rio:', error);
        res.status(500).json({ message: 'Erro ao buscar relatÃ³rio' });
    }
});
router.get('report/:processId', authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const { processId } = req.params;
        const userId = req.userId;
        const reportRepository = ormconfig_1.AppDataSource.getRepository(Report_1.Report);
        const report = await reportRepository.findOne({
            where: { process: { id: processId } },
            relations: ['interactions', 'process', 'process.user'],
        });
        if (!report) {
            return res.status(404).json({ message: 'Relatório não encontrado' });
        }
        if (report.process.user.id !== userId) {
            return res.status(403).json({ message: 'Acesso negado ao relatório' });
        }
        res.json(report);
    }
    catch (error) {
        console.error('Erro ao buscar relatorio por ID do processo:', error);
        res.status(500).json({ message: 'Erro ao buscar relatório' });
    }
});
router.get('/report/:reportId', authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const { reportId } = req.params;
        const userId = req.userId;
        const reportRepository = ormconfig_1.AppDataSource.getRepository(Report_1.Report);
        const report = await reportRepository.findOne({
            where: { id: reportId },
            relations: ['interactions', 'process', 'process.user'],
        });
        if (!report) {
            return res.status(404).json({ message: 'RelatÃ³rio nÃ£o encontrado' });
        }
        if (report.process.user.id !== userId) {
            return res.status(403).json({ message: 'Acesso negado ao relatÃ³rio' });
        }
        res.json(report);
    }
    catch (error) {
        console.error('Erro ao buscar relatÃ³rio:', error);
        res.status(500).json({ message: 'Erro ao buscar relatÃ³rio' });
    }
});
exports.default = router;
//# sourceMappingURL=report.js.map