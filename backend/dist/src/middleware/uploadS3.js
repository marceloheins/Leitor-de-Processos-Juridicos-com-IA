"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const path_1 = __importDefault(require("path"));
const s3 = new aws_sdk_1.default.S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
exports.uploadToS3 = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'private',
        key: (req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
            cb(null, `documents/${fileName}`);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB por arquivo   
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf')
            return cb(new Error('Apenas arquivos PDF são permitidos'));
        cb(null, true);
    },
}).array('files', 50); // Até 50 arquivos por upload 
//# sourceMappingURL=uploadS3.js.map