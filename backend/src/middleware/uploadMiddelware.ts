import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const uploadDir = 'storage/local';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true});

};

const storage = multer.diskStorage({   
    destination: 'storage/local', filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    },
});

export const uploadMiddleware = multer({ storage, 
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Apenas arquivos PDF são permitidos'));
        }
        cb(null, true);
    },
 }).array('files', 50);