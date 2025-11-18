

import { Router } from "express";
import { AppDataSource } from "../../ormconfig";
import { Process } from '../entities/Process';
import { Document } from "../entities/Document";
import { authMiddleware } from "../middleware/authMiddleware";
import { User } from "../entities/User";
import { uploadToS3 } from "../middleware/uploadS3";


const router = Router();

// Upload a document to a process
router.post('/upload', authMiddleware, uploadToS3, async (req, res) => {
        const { title } = req.body;
        const userId = req.userId;
        const files = req.files as Express.MulterS3.File[];

        const  userRepo = AppDataSource.getRepository(User);
        const processRepository = AppDataSource.getRepository(Process);
        const documentRepository = AppDataSource.getRepository(Document);

        const user = await userRepo.findOne({ where: { id: userId }, relations: ['organization'] });
        if (!user) {
            return res.status(404).json({ message: 'UsuÃ¡rio nÃ£o encontrado' });
        }

        const process = processRepository.create({ title, status: 'pendente', user, organization: user.organization, });
        await processRepository.save(process);

        const docs = files.map(files => 
    documentRepository.create({ fileName: files.originalname, 
                                fileUrl: files.location, process }));
        await documentRepository.save(docs);

        res.json({ message: 'Arquivo(s) enviado(s) com sucesso', processId: process.id });
    });

export default router;


