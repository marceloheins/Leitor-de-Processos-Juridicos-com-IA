import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Interaction } from '../entities/Interaction';
import { OpenAI } from 'openai';
import { authMiddleware } from '../middleware/authMiddleware';
import { Report } from '../entities/Report';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/interact/:reportId', authMiddleware, async (req, res) => {
    const { question } = req.body;
    const reportRepository = AppDataSource.getRepository(Report);
    const interactionRepository = AppDataSource.getRepository(Interaction);

    const report = await reportRepository.findOne({ where: { id: req.params.reportId }});
    if (!report) 
        return res.status(404).json({ message: 'RelatÃ³rio nÃ£o encontrado' });

    const prompt = `Baseado no relatÃ³rio abaixo, responda a pergunta:\n\nRelatÃ³rio:\n${report.content}\n\nPergunta: ${question}`;

const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],  
});

    const answer = response.choices[0].message?.content;   

    const interaction = interactionRepository.create({ question, answer: answer || "Não foi possível responder", report });
    await interactionRepository.save(interaction); 

    res.json(interaction);
});
export default router;

