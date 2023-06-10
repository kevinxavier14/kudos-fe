import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

export default function Loader({ height }) {
    return (
        <div
            className={`loader ${height == "full" ? "full-height-100vh" : ""}`}
        >
            <CircularProgress sx={{ color: "#d64d64" }} />
            <p>loading...</p>
        </div>
        // <Skeleton variant="rounded" width={210} height={60} />
    );
}
