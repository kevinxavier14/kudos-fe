import { Skeleton } from "@mui/material";

export default function LoaderDetailPage() {
    // return <Skeleton variant="rectangular" width={"full"} height={"full"} />;
    return (
        <section className="detail-wrapper">
            <div className="status-wrapper">
                <div
                    className="status-card ksu-card"
                    style={{
                        height: "100px",
                        flexDirection: "column",
                        gap: "0",
                    }}
                >
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </div>
                <div
                    className="status-card ksu-card"
                    style={{
                        height: "100px",
                        flexDirection: "column",
                        gap: "0",
                    }}
                >
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </div>
                <div
                    className="status-card ksu-card"
                    style={{
                        height: "200px",
                        flexDirection: "column",
                        gap: "0",
                    }}
                >
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </div>
            </div>
            <section className="ksu-wrapper form ">
                <Skeleton variant="text" />
                <div className="ksu-card full-width gap">
                    <Skeleton variant="text" style={{ width: "20ch" }} />
                    <div
                        className="space-between align-start"
                        style={{ gap: "10px" }}
                    >
                        <div className="inner-card left">
                            {/* nanti di isi sama image poto orangnya */}
                            <div
                                style={{
                                    height: "7ch",
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >
                                <Skeleton variant="circular" />
                                <Skeleton variant="text" />
                            </div>
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </div>
                        <div className="inner-card right">
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </div>
                    </div>
                </div>

                <div className="ksu-card full-width gap">
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </div>
            </section>
        </section>
    );
}
