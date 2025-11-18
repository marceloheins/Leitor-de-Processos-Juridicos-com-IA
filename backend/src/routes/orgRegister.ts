import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Organization } from '../entities/Organization';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'segredo';

router.post('/org-register' , async (req, res) =>{
    const { orgName, name, email, password } = req.body;

    const orgRepo = AppDataSource.getRepository(Organization);
    const userRepo = AppDataSource.getRepository(User);

    const existing = await userRepo.findOne({ where: { email}});
    if (existing) return res.status(400).json({ error: 'Email jÃ¡ cadastrado'});

    const organization = orgRepo.create({ name: orgName});
    await orgRepo.save(organization);

    const passwordHash = await bcrypt.hash(password, 10);
    const user = userRepo.create({
        name,
        email,
        password: passwordHash,
        organization,
        role: 'admin',
    })

    await userRepo.save(user);

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });

});
export default router;

