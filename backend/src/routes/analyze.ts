import {Router} from 'express';
import { AppDataSource } from '../../ormconfig';
import { Process } from '../entities/Process';
import { Document } from '../entities/Document';
import { Report } from '../entities/Report';
import { authMiddleware } from '../middleware/authMiddleware'; 
import { OpenAI} from 'openai';
import { s3 } from '../services/s3';
import pdfParse from 'pdf-parse';

const router = Router();
const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY, });

// Middleware to protect routes
router.post('/analyze/:processId', authMiddleware, async (req, res) => {
    const { processId } = req.params;
   

    const processRepository = AppDataSource.getRepository(Process);
    const reportRepository = AppDataSource.getRepository(Report);
    const documentRepository = AppDataSource.getRepository(Document);

    const processEntity = await processRepository.findOne({ where: { id: processId }, relations: ['organization'] });
    if (!processEntity) {
        return res.status(404).json({ message: 'Processo nÃ£o encontrado' });

    }
    await processRepository.update(processId, { status: 'processando' });
    const documents = await documentRepository.find({ where: { process: { id: processId } } });

        try {
            let fullText = '';
            for (const doc of documents) {
                
                const key = new  URL(doc.fileUrl).pathname.substring(1);

                const s3Object = await s3.getObject({
                    Bucket: process.env.AWS_S3_BUCKET_NAME!,
                    Key: key,

                }).promise();

                const buffer = s3Object.Body as Buffer;


                const data = await pdfParse(buffer);
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

            const reportText = response.choices[0].message?.content;
            
            if (reportText){
                console.log(`[analyze] tentando criar relatorio para Proesso ID: ${processEntity.id}`);
                const report = reportRepository.create({ content: reportText, process: processEntity });
                
                console.log(`[analyze] Objeto report criado (antes do salvar):`, JSON.stringify(processEntity, null, 2));
                
                processEntity.report = report;

                await reportRepository.save(report);
                console.log(`[analyze] relatorio salvo com ID: ${report.id}. Associado ao Processo ID: ${report.process.id}`);
                
                console.log(`[analize] estado de processEntity apos salvar report` , JSON.stringify(processEntity, null, 2));
               
                await processRepository.update(processId, { status: 'concluido' });
                res.json({ message: 'Relatorio gerado com sucesso', reportId: report.id });
            }else {
                throw new Error("A resposta da IA estava vazia.");
            }}catch (error) {
            console.error('Erro ao analisar documentos:', error);
            await processRepository.update(processId, { status: 'erro' });
            res.status(500).json({ message: 'Erro ao analisar documentos' });  

            }
});



export default router;

        


