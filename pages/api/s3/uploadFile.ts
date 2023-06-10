import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
    region: "us-east-1",
    accessKeyId: "AKIA5ZHYPLPRIJQ6QMJI",
    secretAccessKey: "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",
    signatureVersion: "v4",
});

// const s3 = new S3({
//     region: "ap-southeast-1",
//     accessKeyId: "AKIA5ZHYPLPRBOM6T343",
//     secretAccessKey: "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",
//     signatureVersion: "v4",
// });

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(450).json({ message: "Method not allowed" });
    }
    try {
        const { name, type } = req.body;
        const fileParams = {
            Bucket: "ksu-srikandi",
            Key: name,
            Expires: 600,
            ContentType: type,
        };
        const url = await s3.getSignedUrlPromise("putObject", fileParams);
        res.status(200).json({ url });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "2mb",
        },
    },
};
