import { Router} from "express";
import { AppDataSource } from "../../ormconfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register novo usuario
router.post('/register', async (req, res) => {
    try{
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos sÃ£o obrigatÃ³rios' });
    }

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) 
        return res.status(400).json({ message: 'Email jÃ¡ Existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
        name, 
        email, 
        password: hashedPassword, });

    await userRepository.save(user);

    res.status(201).json({ message: 'UsuÃ¡rio Registrado com Sucesso' });
} catch (error) {
    console.error('Erro ao registrar usuÃ¡rio:', error);
    res.status(500).json({ message: 'Erro ao registrar usuÃ¡rio' });
}
});

// Login
router.post('/login', async (req, res) => {
    try{
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Todos os campos sÃ£o obrigatÃ³rios' });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    
    if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Email ou Senha Inválida' });
    } 
        
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });  
    
    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
    });
} catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
}

});
  

export default router;
        
    
    

