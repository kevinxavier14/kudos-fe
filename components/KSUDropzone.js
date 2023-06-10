import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";

import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

// props
// file
// setFile

export default function KSUDropzone(props) {
    const [imageUrl, setImageUrl] = useState();

    const { setURL, setImage } = props;
    // react drop zone
    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles[0]);

        // convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result.toString());
            setURL(reader.result.toString());
        };
        reader.readAsDataURL(acceptedFiles[0]);
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
        acceptedFiles,
    } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg", "jpg"],
        },
    });
    return (
        <div className="ksu-dropzone">
            <div {...getRootProps()} className="inner-ksu-dropzone">
                <input {...getInputProps()} />

                {imageUrl ? (
                    <>
                        {/* {console.log(imageUrl)} */}
                        {acceptedFiles[0] ? (
                            <>
                                <img src={imageUrl} alt="preview-image" />
                                <p>{acceptedFiles[0].name}</p>
                            </>
                        ) : (
                            <></>
                        )}
                        <Button variant="outlined" disableElevation>
                            Ubah File
                        </Button>
                    </>
                ) : (
                    <>
                        <AddPhotoAlternateRoundedIcon
                            fontSize="large"
                            color="primary"
                        />
                        <Button variant="outlined" disableElevation>
                            Sematkan File
                        </Button>
                        <small>Hanya tipe file PNG dan JPEG.</small>
                    </>
                )}
            </div>
        </div>
    );
}
