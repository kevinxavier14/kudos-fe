import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";

export default function StatusCardDetail({ title, value }) {
    let label = "";
    let icon;
    value = value.toLowerCase();
    console.log(value);
    if (value == "ditinjau manajer") {
        label = "ditinjau-manajer";
        icon = <SupervisorAccountRoundedIcon />;
    } else if (value == "dalam tahap survey") {
        label = "dalam-tahap-survey";
        icon = <NoteAltRoundedIcon />;
    } else if (value == "menunggu konfirmasi") {
        label = "menunggu-konfirmasi";
        icon = <HourglassTopRoundedIcon />;
    } else if (value == "diterima") {
        label = "diterima";
        icon = <CheckCircleRoundedIcon />;
    } else if (value == "ditolak") {
        label = "ditolak";
        icon = <CancelRoundedIcon />;
    } else if (value == "pengajuan diterima") {
        label = "pengajuan-diterima";
        icon = <CheckCircleRoundedIcon />;
    } else if (value == "sedang diajukan") {
        label = "sedang-diajukan";
        icon = <DriveFolderUploadRoundedIcon />;
    } else if (value == "sehat") {
        label = value;
        icon = <FavoriteIcon />;
    } else if (value == "telat") {
        label = value;
        icon = <NotificationImportantIcon />;
    } else if (value == "belum cair") {
        label = "belum-cair";
        value = "Sedang Dicairkan";
        icon = <CurrencyExchangeRoundedIcon />;
    } else {
        label = value;
    }

    return (
        <div className="status-card ksu-card">
            <div className={`chips ${label} icon-container`}>
                <p>{icon}</p>
            </div>
            <div className="status-container">
                <h4>{value}</h4>
                <small>{title}</small>
            </div>
        </div>
    );
}
