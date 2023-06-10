import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FeedbacksPopup({
    setFeedbacks,
    labelBerhasil,
    redirectTo,
}) {
    const [visible, setVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const router = useRouter();
    const finalSlashIndex = router.asPath.lastIndexOf("/");
    const previousPath = router.asPath.slice(0, finalSlashIndex);

    useEffect(() => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            if (setFeedbacks?.status) {
                router.push(redirectTo);
            }
        }, 2000);
    }, []);
    if (visible) {
        setTimeout(() => {
            setVisible(false);
        }, 2000);
    }

    if (visible) {
        if (setFeedbacks != undefined) {
            console.log(setFeedbacks);
            if (setFeedbacks.response != undefined) {
                if (setFeedbacks.response.status == 500) {
                    return (
                        <div className="ksu-card ksu-feedbacks popup">
                            <img src="/icons/error.gif" alt="error" />
                            <div className="text-wrapper">
                                <h2>Gagal</h2>
                                <small>{setFeedbacks.message}</small>
                            </div>
                        </div>
                    );
                }
            }

            if (setFeedbacks.status == 200 || setFeedbacks.status == 201) {
                return (
                    <div className="ksu-card ksu-feedbacks popup">
                        <img src="/icons/confetti.gif" alt="berhasil" />
                        <div className="text-wrapper">
                            <h2>{labelBerhasil}</h2>
                        </div>
                    </div>
                );
            }
        }
    }
}
