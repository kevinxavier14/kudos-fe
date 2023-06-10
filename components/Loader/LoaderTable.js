import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoaderTable() {
    return (
        <section className="ksu-wrapper">
            <h1>
                <Skeleton width={500} />
            </h1>

            <div className="ksu-card full-width">
                <div className="space-between">
                    <h2>
                        <Skeleton width={300} />
                    </h2>
                </div>
                <div className="space-between" style={{ marginBlock: "20px" }}>
                    <h3>
                        <Skeleton width={300} />
                    </h3>
                    <h3>
                        <Skeleton width={300} />
                    </h3>
                    <h3>
                        <Skeleton width={300} />
                    </h3>
                    <h3>
                        <Skeleton width={300} />
                    </h3>
                </div>
                <div className="ksu-loader-table">
                    <Skeleton height={75} />
                    <Skeleton height={75} />
                    <Skeleton height={75} />
                    <Skeleton height={75} />
                    <Skeleton height={75} />
                    <Skeleton height={75} />
                </div>
            </div>
        </section>
    );
}
