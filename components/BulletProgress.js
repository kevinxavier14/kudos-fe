import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

import DescriptionIcon from "@mui/icons-material/Description";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// props:
// jumlahBullet={3} total bullet
// bulletDone ={2} total bullet terisi
// type={"pendaftaran"} pendaftaran, pembayaran, anggota, permohonan

export default function BulletProgress(props) {
    let bulletDone = props.bulletDone;
    let jumlahBullet = props.jumlahBullet;
    let labelPendaftaran = [];
    let iconPendaftaran = [];
    // props.setPagePoint();
    let typeOfBehaviour = "";

    if (props.type == "pendaftaran") {
        jumlahBullet = 3;
        labelPendaftaran = ["PERMOHONAN", "JAMINAN", "REKAP"];
    } else if (props.type == "anggota") {
        jumlahBullet = 3;
        labelPendaftaran = ["DETAIL CALON", "UPLOAD DOKUMEN", "REKAP"];
    } else if (props.type == "kevin") {
        jumlahBullet = 3;
        labelPendaftaran = ["PENGAJUAN", "SURVEI", "PERSETUJUAN"];
        typeOfBehaviour = "kevin";
        iconPendaftaran = [
            <DescriptionIcon />,
            <ThumbsUpDownIcon />,
            <CheckBoxIcon />,
        ];
    }

    const listOfDone = [];

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        borderRadius: 20,
        height: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor:
                theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor:
                theme.palette.mode === "light" ? "#317863" : "#c1ffec",
        },
    }));

    // handle bullet
    Array.from(Array(bulletDone), (e, i) => {
        return listOfDone.push(i + 1);
    });

    function handleBar() {
        if (bulletDone == 0) {
            return 0;
        }
        // if (bulletDone == 1) {
        //     return 0;
        // }
        if (props.type == "anggota") {
            if (bulletDone == jumlahBullet - 1) return 100;
            let formula = (bulletDone / (jumlahBullet - 1)) * 100;
            return formula;
        }
        if (bulletDone == jumlahBullet) return 100;
        let formula = ((bulletDone - 1) / (jumlahBullet - 1)) * 100;
        return formula;
    }
    return (
        <div className={`ksu-bullet-progress ${props.type}`}>
            <div className={`ksu-bullet-progress-line ${props.type}`}>
                <BorderLinearProgress
                    variant="determinate"
                    value={handleBar()}
                />
            </div>
            {Array.from(Array(jumlahBullet), (e, i) => {
                return (
                    <div
                        key={i}
                        className="ksu-bullet-wrapper"
                        onClick={() => {
                            props.setPagePoint(i + 1);
                        }}
                    >
                        {/* {listOfDone.indexOf(i + 1) > -1 ? (
                            <div className={`ksu-bullet done`}>
                                <CheckIcon />
                            </div>
                        ) : (
                            <div
                                className={`ksu-bullet ${
                                    i == props.pagePoint - 1 ? "active" : ""
                                }`}
                            >
                                {i + 1}
                            </div>
                        )} */}
                        {typeOfBehaviour == "kevin" ? (
                            <>
                                {listOfDone.indexOf(i + 1) > -1 ? (
                                    <div className={`ksu-bullet done`}>
                                        {iconPendaftaran[i]}
                                    </div>
                                ) : (
                                    <div
                                        className={`ksu-bullet ${
                                            i == props.pagePoint - 1
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        {iconPendaftaran[i]}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {listOfDone.indexOf(i + 1) > -1 ? (
                                    <div className={`ksu-bullet done`}>
                                        <CheckIcon />
                                    </div>
                                ) : (
                                    <div
                                        className={`ksu-bullet ${
                                            i == props.pagePoint - 1
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        {i + 1}
                                    </div>
                                )}
                            </>
                        )}

                        <small>{labelPendaftaran[i]}</small>
                    </div>
                );
            })}
        </div>
    );
}
