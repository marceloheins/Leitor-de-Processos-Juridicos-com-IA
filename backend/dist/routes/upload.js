"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ormconfig_1 = require("../ormconfig");
const Process_1 = require("../entities/Process");
const Document_1 = require("../entities/Document");
const authMiddleware_1 = require("../middleware/authMiddleware");
const User_1 = require("../entities/User");
const uploadS3_1 = require("../middleware/uploadS3");
const router = (0, express_1.Router)();
// Upload a document to a process
router.post('/upload', authMiddleware_1.authMiddleware, uploadS3_1.uploadToS3, async (req, res) => {
    const { title } = req.body;
    const userId = req.userId;
    const files = req.files;
    const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
    const processRepository = ormconfig_1.AppDataSource.getRepository(Process_1.Process);
    const documentRepository = ormconfig_1.AppDataSource.getRepository(Document_1.Document);
    const user = await userRepo.findOne({ where: { id: userId }, relations: ['organization'] });
    if (!user) {
        return res.status(404).json({ message: 'UsuÃ¡rio nÃ£o encontrado' });
    }
    const process = processRepository.create({ title, status: 'pendente', user, organization: user.organization, });
    await processRepository.save(process);
    const docs = files.map(files => documentRepository.create({ fileName: files.originalname,
        fileUrl: files.location, process }));
    await documentRepository.save(docs);
    res.json({ message: 'Arquivo(s) enviado(s) com sucesso', processId: process.id });
});
exports.default = router;
//# sourceMappingURL=upload.js.map