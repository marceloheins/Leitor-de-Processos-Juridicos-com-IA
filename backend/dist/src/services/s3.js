"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
exports.getSignedUrl = getSignedUrl;
exports.uploadBuffer = uploadBuffer;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.s3 = new aws_sdk_1.default.S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
function getSignedUrl(key, expiresSeconds = 3600) {
    return exports.s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Expires: expiresSeconds,
    });
}
async function uploadBuffer(key, buffer, contentType) {
    const res = await exports.s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ACL: 'private',
    }).promise();
    return res.Location;
}
//# sourceMappingURL=s3.js.map