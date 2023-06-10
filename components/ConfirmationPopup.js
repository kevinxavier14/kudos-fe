import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LayoutMotion from "./Layout/LayoutMotion";

export default function ConfirmationPopup({
    textH1,
    textP1,
    textP2,
    labelButtonAtas,
    linkTujuan,
    functionDiButtonAtas,
    setState,
    setStateConditionKembali,
    colorError,
}) {
    const [visible, setVisible] = useState(true);
    const router = useRouter();

    if (visible) {
        return (
            <LayoutMotion>
                <div className="ksu-card ksu-feedbacks popup gap">
                    <h1>{textH1}</h1>
                    <p style={{ textAlign: "center" }}>{textP1}</p>
                    <p style={{ textAlign: "center" }}>{textP2}</p>
                    <Button
                        variant="contained"
                        disableElevation
                        fullWidth
                        onClick={() => {
                            functionDiButtonAtas();
                            router.push(linkTujuan);
                        }}
                        color={colorError ? "error" : "primary"}
                    >
                        {labelButtonAtas}
                    </Button>
                    <Button
                        variant="text"
                        disableElevation
                        fullWidth
                        onClick={() => {
                            setVisible(false);
                            setState(setStateConditionKembali);
                        }}
                        color={colorError ? "error" : "primary"}
                    >
                        Kembali
                    </Button>
                </div>
            </LayoutMotion>
        );
    }
}
