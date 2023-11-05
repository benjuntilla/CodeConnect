import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

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
