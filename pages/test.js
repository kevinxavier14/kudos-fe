import axios from "axios";
import { useState } from "react";
import { customAlphabet } from "nanoid";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

export default function Test() {
    const [file, setFile] = useState();

    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

    const id = nanoid();
    const uploadFile = async (file) => {
        let { data } = await axios.post("/api/s3/uploadFile", {
            name: "ktp-" + id + "-image",
            type: file.type,
        });
        console.log(
            "https://ksu-srikandi.s3.amazonaws.com/" + `ktp-${id}-image`
        );

        const url = data.url;

        await axios.put(url, file, {
            headers: {
                "Content-Type": file.type,
                "Access-Control-Allow-Origin": "*",
            },
        });
    };

    const uploadImage = (image) => {
        setFile(image);
    };

    const [postingStatus, setPostingStatus] = useState(false);
    function aritficialPost() {
        setPostingStatus(true);
        setTimeout(() => {
            setPostingStatus(false);
        }, 2000);
    }
    function HandleButton(
        text,
        functionToPost,
        postingStateStatus
        // isPostSubmitted
    ) {
        // functionToPost, masukin function yang bakal post
        // postingStateStatus == true, dia bakal set loading
        // postingStateStatus == false, loadingnya selesai
        // isPostSubmitted
        if (postingStateStatus) {
            return (
                <LoadingButton
                    endIcon={<SendIcon />}
                    loading={true}
                    loadingPosition="end"
                    variant="contained"
                >
                    <span>{text}</span>
                </LoadingButton>
            );
        } else {
            return (
                <Button
                    variant="contained"
                    disableElevation
                    onClick={() => {
                        functionToPost();
                    }}
                >
                    {text}
                </Button>
            );
        }
    }
    return (
        <section>
            {/* <input
                type="file"
                onChange={(e) => {
                    uploadImage(e.target.files[0]);
                    uploadFile(e.target.files[0]);
                }}
            /> */}
            {HandleButton("Ajukan Pinjaman", aritficialPost, postingStatus)}
        </section>
    );
}
