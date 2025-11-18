import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Process } from '../entities/Process';
import { Document } from '../entities/Document';
import { Report } from '../entities/Report';
import { Interaction } from '../entities/Interaction';
import { authMiddleware } from '../middleware/authMiddleware'; 


interface AuthRequest extends Request{
    userId?: |string;
}
const router = Router();

// Get /processes 
router.get('/processes', authMiddleware, async (req, res) => {
   const repo = AppDataSource.getRepository(Process);
   try { 
   console.log(`[processes] Buscando processos para User ID: ${req.userId}`);
     
   const processes = await repo.find({ where: { user: { id: req.userId } }, relations: ['report'],order: {createdAt: 'DESC'},
 });

 
 
 
 
 
 
 
 
 
 console.log(`[processes] processos encontrados (antes de enviar)`, JSON.stringify(processes, null, 2));
    res.json(processes);
  
}catch (error){
    console.error("[processes] Erro ao buscar processos", error);
    res.status(500).json({ message: "Erro ao buscar processos"});
}


});

export default router;

