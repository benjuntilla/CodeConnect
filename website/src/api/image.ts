import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config";

export async function uploadProfilePfp(user_uuid: string, file: any) {
  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIA3LALEAOS4LXKA7XR",
      secretAccessKey: "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",
    },
  });
  let key_name = "profile_pfp/" + user_uuid;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: "codecupid-images",
      Key: key_name,
      Body: file,
    })
  );

  return "https://codecupid-images.s3.us-east-1.amazonaws.com/" + key_name;
}

export async function uploadProjectImg(project_uuid: string, file: any) {
  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.VITE_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.VITE_AWS_SECRET_KEY!,
    },
  });
  let key_name = "project_imgs/" + project_uuid;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: "codecupid-images",
      Key: key_name,
      Body: file,
    })
  );

  return "https://codecupid-images.s3.us-east-1.amazonaws.com/" + key_name;
}
