import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});     

export function getSignedUrl(key: string, expiresSeconds = 3600){
    return s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
        Expires: expiresSeconds,
    }); 

}
export async function uploadBuffer(key: string, buffer: Buffer, contentType: 'text/plain'){
    const res = await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ACL: 'private',
    }).promise();
    return res.Location; 
}