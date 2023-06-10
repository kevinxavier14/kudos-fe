import { useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { getCookie, urlbase } from "@/hooks/Cookies";

export default function TableButonAksi({ original, hrefWebsite, hrefApi }) {
    const [doneTerima, setDoneTerima] = useState(false);
    const [loadingTerima, setLoadingTerima] = useState(false);

    const [doneTolak, setDoneTolak] = useState(false);
    const [loadingTolak, setLoadingTolak] = useState(false);

    const [allDone, setAllDone] = useState(false);

    function PushData(type, id) {
        type == "terima" ? setLoadingTerima(true) : {};
        type == "tolak" ? setLoadingTolak(true) : {};
        setTimeout(() => {
            axios
                .post(
                    `${urlbase()}/api/v1/${hrefApi}/${type}/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: getCookie("token"),
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    type == "terima" ? setDoneTerima(true) : {};
                    type == "tolak" ? setDoneTolak(true) : {};
                })
                .catch((error) => {
                    console.error(error);
                });
        }, 2000);
    }

    function HandleTerimaButton(original) {
        if (doneTerima) {
            setTimeout(() => {
                {
                    console.log(doneTolak);
                }
                if (doneTerima || doneTolak) {
                    setAllDone(true);
                }
            }, 2000);
            return (
                <Button
                    className="ksu-button-custom"
                    variant="contained"
                    disableElevation
                >
                    <img
                        src="/icons/check-white.gif"
                        alt="check-red"
                        height="20px"
                    />
                </Button>
            );
        }
        if (loadingTerima) {
            return (
                <LoadingButton loading color="primary" variant="contained">
                    <span>Terima</span>
                </LoadingButton>
            );
        }

        return (
            <Button
                className="ksu-button-custom"
                variant="contained"
                disableElevation
                onClick={() => PushData("terima", original.id)}
            >
                TERIMA
            </Button>
        );
    }
    function HandleTolakButton(original) {
        if (doneTolak) {
            setTimeout(() => {
                {
                    console.log(doneTolak);
                }
                if (doneTerima || doneTolak) {
                    setAllDone(true);
                }
            }, 2000);
            return (
                <Button variant="outlined" color="error" disableElevation>
                    <img
                        src="/icons/check-red.gif"
                        alt="check-red"
                        height="20px"
                    />
                </Button>
            );
        }
        if (loadingTolak) {
            return (
                <LoadingButton loading color="primary" variant="contained">
                    <span>Terima</span>
                </LoadingButton>
            );
        }

        return (
            <Button
                variant="outlined"
                color="error"
                disableElevation
                onClick={() => PushData("tolak", original.id)}
            >
                TOLAK
            </Button>
        );
    }

    return (
        <div className="table-button-wrapper">
            <Link href={`../${hrefWebsite}/${original.id}`}>
                <Button variant="outlined" disableElevation>
                    DETAIL
                </Button>
            </Link>

            {original.statusPengajuan == "Pengajuan Diterima" ||
            original.statusPengajuan == "Ditolak" ? (
                <></>
            ) : (
                <>
                    {allDone != true ? (
                        <>
                            {HandleTerimaButton(original)}
                            {HandleTolakButton(original)}
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
}
