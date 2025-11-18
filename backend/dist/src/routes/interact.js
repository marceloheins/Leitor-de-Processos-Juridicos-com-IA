"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ormconfig_1 = require("../../ormconfig");
const Interaction_1 = require("../entities/Interaction");
const openai_1 = require("openai");
const authMiddleware_1 = require("../middleware/authMiddleware");
const Report_1 = require("../entities/Report");
const router = (0, express_1.Router)();
const openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
router.post('/interact/:reportId', authMiddleware_1.authMiddleware, async (req, res) => {
    var _a;
    const { question } = req.body;
    const reportRepository = ormconfig_1.AppDataSource.getRepository(Report_1.Report);
    const interactionRepository = ormconfig_1.AppDataSource.getRepository(Interaction_1.Interaction);
    const report = await reportRepository.findOne({ where: { id: req.params.reportId } });
    if (!report)
        return res.status(404).json({ message: 'RelatÃ³rio nÃ£o encontrado' });
    const prompt = `Baseado no relatÃ³rio abaixo, responda a pergunta:\n\nRelatÃ³rio:\n${report.content}\n\nPergunta: ${question}`;
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
    });
    const answer = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
    const interaction = interactionRepository.create({ question, answer: answer || "Não foi possível responder", report });
    await interactionRepository.save(interaction);
    res.json(interaction);
});
exports.default = router;
//# sourceMappingURL=interact.js.map