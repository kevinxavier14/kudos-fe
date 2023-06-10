import { Button, CircularProgress, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";

import ReactToPrint from "react-to-print";
import { useEffect, useRef, useState } from "react";

import Loader from "@/components/Loader/Loader";

import axios from "axios";
import { getCookie, urlbase } from "@/hooks/Cookies";
import { useRouter } from "next/router";
import StatusCardDetail from "@/components/StatusCardDetail";
import LoaderDetailPage from "../../components/Loader/LoaderDetailPage";

const label1 = [
    {
        label: "Nama Anggota",
        name: "nama",
    },
    {
        label: "NIK",
        name: "nik",
    },
    {
        label: "Tempat Tanggal Lahir",
        name: "tempatTanggalLahir",
    },
    {
        label: "Nama Ibu Kandung",
        name: "namaIbu",
    },
    {
        label: "No. Telepon",
        name: "noTelepon",
    },
    {
        label: "Pekerjaan",
        name: "pekerjaan",
    },

    {
        label: "Alamat",
        rows: 4,
        name: "alamat",
    },
];
const label2 = [
    {
        label: "Agama",
        name: "agama",
    },
    {
        label: "Status Marital",
        name: "statusMartial",
    },

    {
        label: "Tanggal Pengajuan",
        name: "tanggalPengajuan",
    },
    {
        label: "Status Pengajuan",
        name: "statusPengajuan",
    },
    {
        label: "Nama Ahli Waris",
        name: "namaAhliWaris",
    },
    {
        label: "No. Telepon Ahli Waris",
        name: "noTelponAhliWaris",
    },
    {
        label: "Alamat Ahli Waris",
        name: "alamatAhliWaris",
    },
];

export default function DetailPendaftarn({ pengajuanAnggota_id }) {
    let componentRef = useRef();

    const [doneTerima, setDoneTerima] = useState(false);
    const [loadingTerima, setLoadingTerima] = useState(false);

    const [doneTolak, setDoneTolak] = useState(false);
    const [loadingTolak, setLoadingTolak] = useState(false);

    const [allDone, setAllDone] = useState(false);

    const [messageDitolak, setMessageDitolak] = useState();

    const [loadingPage, setLoadingPage] = useState(true);

    const [pengajuanAnggota, setPengajuanAnggota] = useState();

    const [updateStatus, setUpdateStatus] = useState();

    const router = useRouter();

    useEffect(() => {
        axios
            .get(
                `${urlbase()}/api/v1/pengajuan-anggota/` + pengajuanAnggota_id,
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            )
            .then((response) => {
                // console.log(response);
                setPengajuanAnggota(response.data);
                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    // redirect to login page
                    router.push("/login");
                }
            });
    }, []);

    function PushData(type, id) {
        type == "terima" ? setLoadingTerima(true) : {};
        type == "tolak" ? setLoadingTolak(true) : {};
        let body = {};
        type == "tolak"
            ? body == { id: id, status: "tolak", message: `${messageDitolak}` }
            : {};
        setTimeout(() => {
            axios
                .post(
                    `${urlbase()}/api/v1/pengajuan-anggota/${type}/${id}`,
                    body,
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
                    setUpdateStatus("Pengajuan Diterima");
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
                    setUpdateStatus("Ditolak");
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

    if (loadingPage || pengajuanAnggota == undefined) {
        return <LoaderDetailPage />;
        // return <Loader height={"full"} />;
    } else {
        return (
            <section className="detail-wrapper">
                <div className="status-wrapper">
                    <h1>&nbsp;</h1>

                    <StatusCardDetail
                        title={"Status Pengajuan"}
                        value={pengajuanAnggota.statusPengajuan}
                    />
                    {/* <StatusCardDetail
                        title={"Status Pengajuan"}
                        value={"Ditinjau Manajer"}
                    />
                    <StatusCardDetail
                        title={"Status Pengajuan"}
                        value={"dalam tahap survey"}
                    />
                    <StatusCardDetail
                        title={"Status Pengajuan"}
                        value={"menunggu konfirmasi"}
                    />
                    <StatusCardDetail
                        title={"Status Pengajuan"}
                        value={"diterima"}
                    />
                    <StatusCardDetail
                        title={"Status Pengajuan"}
                        value={"ditolak"}
                    />
                    <StatusCardDetail
                        title={"Status Pengajuan"}
                        value={"pengajuan diterima"}
                    />
                    <StatusCardDetail
                        title={"Status Pengajuan"}
                        value={"ha ho"}
                    /> */}
                </div>
                <section className="ksu-wrapper form ">
                    <h1>Detail Pengajuan Anggota - {pengajuanAnggota.id}</h1>
                    <div className="ksu-card full-width gap">
                        <h2>Data Anggota</h2>
                        <div className="space-between align-start">
                            <div className="inner-card left">
                                <div className="image-wrapper-details">
                                    {/* nanti di isi sama image poto orangnya */}
                                    {/* {true ? (
                                        <img
                                            src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
                                            alt="person-image"
                                        />
                                    ) : (
                                        <img
                                            src="https://i.stack.imgur.com/l60Hf.png"
                                            alt="default-pp-image"
                                        />
                                    )} */}
                                    <div className="name-wrapper">
                                        <p>
                                            <strong>
                                                {pengajuanAnggota.username}
                                            </strong>
                                        </p>
                                        <p>Member ID</p>
                                    </div>
                                </div>
                                {label1.map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>{pengajuanAnggota[item.name]}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="inner-card right">
                                {label2.map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>{pengajuanAnggota[item.name]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-between end">
                            <ReactToPrint
                                trigger={() => (
                                    <Button>
                                        Print Detail &nbsp;
                                        <LocalPrintshopRoundedIcon />
                                    </Button>
                                )}
                                content={() => componentRef}
                            />
                        </div>
                    </div>

                    <div style={{ display: "none" }}>
                        <div
                            className="ksu-card full-width gap no-padding to-print"
                            ref={(el) => (componentRef = el)}
                        >
                            <br />
                            <div className="space-between header">
                                <div className="inner-card left">
                                    <div className="logo-print">
                                        <img
                                            src="/drawer-header-left.png"
                                            alt="logo"
                                            className="logo-left"
                                        />
                                        <img
                                            src="/drawer-header-right.png"
                                            alt="logo"
                                            className="logo-right"
                                        />
                                    </div>
                                </div>
                                <div className="inner-card right">
                                    <p>
                                        <strong>
                                            PERMOHONAN MENJADI ANGGOTA
                                        </strong>
                                    </p>
                                </div>
                            </div>
                            <br />
                            <h2>Data Anggota</h2>
                            <div className="space-between align-start">
                                <div className="inner-card left">
                                    <div className="image-wrapper-details">
                                        {/* nanti di isi sama image poto orangnya */}
                                        {/* {true ? (
                                            <img
                                                src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
                                                alt="person-image"
                                            />
                                        ) : (
                                            <img
                                                src="https://i.stack.imgur.com/l60Hf.png"
                                                alt="default-pp-image"
                                            />
                                        )} */}
                                        <div className="name-wrapper">
                                            <p>
                                                <strong>
                                                    {pengajuanAnggota.username}
                                                </strong>
                                            </p>
                                            <p>Member ID</p>
                                        </div>
                                    </div>
                                    {label1.map((item, index) => (
                                        <div key={index}>
                                            <p>
                                                <strong>{item.label}</strong>
                                            </p>
                                            <p>{pengajuanAnggota[item.name]}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="inner-card right">
                                    {label2.map((item, index) => (
                                        <div key={index}>
                                            <p>
                                                <strong>{item.label}</strong>
                                            </p>
                                            <p>{pengajuanAnggota[item.name]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            {console.log(pengajuanAnggota)}
                            <div className="tanda-tangan space-between align-start">
                                <div className="inner-card left">
                                    <p>
                                        <strong>Cap Jempol</strong>
                                    </p>
                                    <br />
                                    <br />
                                    <br />
                                    <div className="line"></div>
                                </div>
                                <div className="inner-card right">
                                    <p>
                                        <strong>Tanda Tangan</strong>
                                    </p>
                                    <br />
                                    <br />
                                    <br />
                                    <div className="wrapper">
                                        <div className="inner">
                                            <div className="line"></div>
                                        </div>
                                        <div className="inner">
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {pengajuanAnggota.statusPengajuan == "Pengajuan Diterima" ||
                    pengajuanAnggota.statusPengajuan == "Ditolak" ? (
                        <></>
                    ) : (
                        <>
                            {allDone != true ? (
                                <div className="ksu-card full-width gap">
                                    <h2>Tombol Aksi</h2>
                                    <div className="space-between align-start">
                                        <div className="inner-card left">
                                            <p>
                                                <strong>
                                                    Lanjutkan Proses Pendaftaran
                                                </strong>
                                            </p>
                                            {HandleTerimaButton(
                                                pengajuanAnggota
                                            )}
                                        </div>
                                        <div className="inner-card right">
                                            <p>
                                                <strong>
                                                    Tolak Permohonan
                                                </strong>
                                            </p>
                                            <TextField
                                                id="outlined-basic"
                                                label="Alasan penolakan"
                                                color="error"
                                                multiline
                                                fullWidth
                                                onBlur={(e) => {
                                                    setMessageDitolak(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            {HandleTolakButton(
                                                pengajuanAnggota
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </section>
            </section>
        );
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(
        `${urlbase()}/api/v2/pengajuan-anggota/list-of-all-ids`
    );
    const data = await res.json();

    console.log("data");
    console.log(data);
    const paths = data.map((item) => {
        return {
            params: { id: item.toString() },
        };
    });
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const id = context.params.id;
    // const res = await fetch("${urlbase()}/pengajuan-anggota/" + id);
    // const data = await res.json();
    // console.log(id);
    // console.log(data);
    return {
        props: {
            pengajuanAnggota_id: id,
        },
    };
};
