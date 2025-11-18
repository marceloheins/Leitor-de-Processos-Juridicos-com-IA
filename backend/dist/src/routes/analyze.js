"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ormconfig_1 = require("../../ormconfig");
const Process_1 = require("../entities/Process");
const Document_1 = require("../entities/Document");
const Report_1 = require("../entities/Report");
const authMiddleware_1 = require("../middleware/authMiddleware");
const openai_1 = require("openai");
const s3_1 = require("../services/s3");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const router = (0, express_1.Router)();
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// Middleware to protect routes
router.post('/analyze/:processId', authMiddleware_1.authMiddleware, async (req, res) => {
    var _a;
    const { processId } = req.params;
    const processRepository = ormconfig_1.AppDataSource.getRepository(Process_1.Process);
    const reportRepository = ormconfig_1.AppDataSource.getRepository(Report_1.Report);
    const documentRepository = ormconfig_1.AppDataSource.getRepository(Document_1.Document);
    const processEntity = await processRepository.findOne({ where: { id: processId }, relations: ['organization'] });
    if (!processEntity) {
        return res.status(404).json({ message: 'Processo nÃ£o encontrado' });
    }
    await processRepository.update(processId, { status: 'processando' });
    const documents = await documentRepository.find({ where: { process: { id: processId } } });
    try {
        let fullText = '';
        for (const doc of documents) {
            const key = new URL(doc.fileUrl).pathname.substring(1);
            const s3Object = await s3_1.s3.getObject({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
            }).promise();
            const buffer = s3Object.Body;
            const data = await (0, pdf_parse_1.default)(buffer);
            fullText += `\n--- Documento: ${doc.fileName} ---\n${data.text}`;
        }
        const prompt = `Você é um analista juri­dico. Analise os documentos abaixo e gere um relatorio detalhado
            com os seguintes pontos:
            1. Resumo dos documentos
            2. Principais temas abordados
            3. Possíveis ricos ou inconsistencias
            4. Sugestao de acao
            
            Documentos:
            ${fullText}`;
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        });
        const reportText = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
        if (reportText) {
            const report = reportRepository.create({ content: reportText, process: processEntity });
            await reportRepository.save(report);
            await processRepository.update(processId, { status: 'concluido' });
            res.json({ message: 'Relatorio gerado com sucesso', reportId: report.id });
        }
        else {
            throw new Error("A resposta da IA estava vazia.");
        }
    }
    catch (error) {
        console.error('Erro ao analisar documentos:', error);
        await processRepository.update(processId, { status: 'erro' });
        res.status(500).json({ message: 'Erro ao analisar documentos' });
    }
});
exports.default = router;
//# sourceMappingURL=analyze.js.map