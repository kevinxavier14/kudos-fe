export default function Chips({ type }) {
    let label = "";
    // console.log(type.length);
    type = type.toLowerCase();
    if (type.slice(0, 1) == "h") {
        if (type.slice(1, 2) == "-" || type.length == 1) {
            label = "dalam-tahap-survey";
        } else {
            label = "ditolak";
        }
    } else {
        if (type == "ditinjau manajer") {
            label = "ditinjau-manajer";
        } else if (type == "dalam tahap survey") {
            label = "dalam-tahap-survey";
        } else if (type == "menunggu konfirmasi") {
            label = "menunggu-konfirmasi";
        } else if (type == "diterima") {
            label = "diterima";
        } else if (type == "ditolak") {
            label = "ditolak";
        } else if (type == "pengajuan diterima") {
            label = "pengajuan-diterima";
        } else if (type == "sedang diajukan") {
            label = "sedang-diajukan";
        } else if (type == "belum cair") {
            label = "belum-cair";
            type = "Sedang Dicairkan";
        } else if (type == "terlambat") {
            label = "ditolak";
        } else {
            label = type;
        }
    }

    return (
        <div className={`chips ${label.toLowerCase()}`}>
            <p>{type}</p>
        </div>
    );
}
