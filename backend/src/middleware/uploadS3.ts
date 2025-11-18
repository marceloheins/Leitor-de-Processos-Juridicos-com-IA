import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';      
import path from 'path';
import { v4 as uuidv4} from 'uuid';


const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const uploadToS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME!,
        acl: 'private',
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
            cb(null, `documents/${fileName}`);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB por arquivo   
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') return cb(new Error('Apenas arquivos PDF são permitidos'));
        cb(null, true);
    },
}).array('files', 50); // Até 50 arquivos por upload 