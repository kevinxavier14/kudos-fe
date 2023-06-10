import { Button, Link, Modal } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function KsuModal({
    firstButtonText,
    firstButtonTextVariant,
    imageUrl,
}) {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Button
                onClick={handleOpenModal}
                variant={firstButtonTextVariant}
                disableElevation
            >
                {firstButtonText}
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div
                    className="space-between center"
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        top: "50%",
                        left: "50%",
                        width: "fit-content",
                        height: "fit-content",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#ffffff",
                        borderRadius: "20px",
                        padding: "30px",
                        gap: "10px",
                    }}
                >
                    <img
                        src={imageUrl}
                        alt="image pencairan dana"
                        style={{
                            height: "80vh",
                            boxShadow: "rgba(73, 75, 193, 0.1) 0px 0px 0px 1px",
                        }}
                    />
                    <div className="space-between center">
                        <Button
                            variant="text"
                            disableElevation
                            onClick={() => {
                                handleCloseModal();
                            }}
                        >
                            Kembali
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
