import axios from "axios";
import { customAlphabet } from "nanoid";

export async function uploadFileToAws(file, type, username, setLoading) {
    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
    const id = nanoid();
    const config = {
        headers: {
            "Content-Type": file.type,
            "Access-Control-Allow-Origin": "*",
        },
        onUploadProgress: (progress) => {
            setLoading(Math.round(progress.loaded * 100) / progress.total);
            console.log(Math.round(progress.loaded * 100) / progress.total);
        },
    };
    let { data } = await axios.post("/api/s3/uploadFile", {
        name: `${username}-${id}-${type}`,
        type: file.type,
    });
    const url = data.url;
    try {
        // throw new Error("mew");
        await axios.put(url, file, config);
        return `https://ksu-srikandi.s3.amazonaws.com/${username}-${id}-${type}`;
    } catch (e) {
        console.log("upload file to aws ", e.message);
        return e.message;
    }
}
