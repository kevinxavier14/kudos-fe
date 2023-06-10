import BulletProgress from "@/components/BulletProgress";
import { getCookie, urlbase } from "@/hooks/Cookies";
import { Button, Link, TextField } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import ReactToPrint from "react-to-print";
import axios from "axios";
import Loader from "@/components/Loader/Loader";

const label1 = [
    {
        label: "No. KTP",
        name: "nik", // belum ada di model
    },
    {
        label: "No. Telepon",
        name: "noTelpon",
    },
    {
        label: "Pekerjaan",
        name: "pekerjaan",
    },
    {
        label: "Agama",
        name: "agama",
    },
    {
        label: "Tempat Tanggal Lahir",
        name: "tempatTanggalLahir", // belum ada di model
    },
    {
        label: "Alamat",
        rows: 4,
        name: "alamat",
    },
];

const label2 = [
    {
        label: "Nama Ibu Kandung",
        name: "namaIbu",
    },
    {
        label: "Nama Ahli Waris",
        name: "namaAhliWaris",
    },
    {
        label: "Alamat Ahli Waris",
        rows: 4,
        name: "alamatAhliWaris",
    },
    {
        label: "No. Telepon Ahli Waris",
        name: "noTelponAhliWaris",
    },
    {
        label: "Tanggal Berlaku",
        name: "tanggalBerlaku",
    },
    {
        label: "Status Marital",
        name: "statusMartial",
    },
];

const label3 = [
    {
        label: "Nominal Pengajuan",
        name: "nominalPengajuan",
    },
    {
        label: "Nominal Terima",
        name: "nominalTerima",
    },
    {
        label: "Status",
        name: "status",
    },
    {
        label: "Jangka Waktu",
        name: "jangkaWaktu",
    },
];

const label4 = [
    {
        label: "Tanggal Pengajuan",
        name: "tanggalPengajuan",
    },
    {
        label: "Jenis Pinjaman",
        name: "jenisPinjaman",
    },
    {
        label: "Cara Pembayaran",
        name: "caraPembayaran",
    },
];

const label5 = [
    {
        label: "Nilai Jaminan",
        name: "nilaiJaminan",
    },
    {
        label: "Atas Nama",
        name: "atasNama",
    },
    {
        label: "Diperoleh Dari",
        name: "diperolehDari",
    },
];

const label6 = [
    {
        label: "Merk Type",
        name: "merkType",
    },
    {
        label: "Tahun",
        name: "tahun",
    },
    {
        label: "No. Polisi",
        name: "noPolisi",
    },
];

const label7 = [
    {
        label: "Jenis Kepemilikan",
        name: "jenisKepemilikan",
    },
    {
        label: "Lokasi",
        name: "lokasi",
    },
    {
        label: "Luas",
        name: "luas",
    },
];

export default function detailPermohonanPinjaman({ pengajuanPinjaman_id }) {
    let componentRef = useRef();
    const [pagePoint, setPagePoint] = useState(1);
    const [hasilSurvey, setHasilSurvey] = useState();
    const [persetujuanSurveyor, setPersetujuanSurveyor] = useState();
    const [loadingPage, setLoadingPage] = useState(true);
    const [pengajuanPinjaman, setPengajuanPinjaman] = useState();

    useEffect(() => {
        axios
            .get(
                urlbase() +
                    "/api/v1/pengajuan-pinjaman/" +
                    pengajuanPinjaman_id,
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            )
            .then((response) => {
                // console.log(response);
                setPengajuanPinjaman(response.data);
                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function HandleJaminan() {
        let type = "";
        let attr = pengajuanPinjaman.jaminan.merkType;

        if (attr == null) {
            type = "Sertifikat";
        } else {
            type = "Kendaraan";
        }
    }

    function updateStatus(type, id, jaminanId) {
        axios
            .put(
                urlbase() + `/api/v1/pengajuan-pinjaman/${type}/${id}`,
                {},
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        buatPinjaman(id, jaminanId);
    }

    function updateStatusFromSurveyor(status, id) {
        axios
            .put(
                urlbase() +
                    `/api/v1/pengajuan-pinjaman/updateStatus/${status}/${id}`,
                {},
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function updateHasilSurvey(hasilSurvey, id) {
        axios
            .put(
                urlbase() +
                    `/api/v1/pengajuan-pinjaman/updateHasilSurvey/${id}/${hasilSurvey}`,
                {},
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function buatPinjaman(idPengajuanPinjaman, idJaminan) {
        axios
            .post(
                urlbase() +
                    `/api/v1/pinjaman/add/${idPengajuanPinjaman}/${idJaminan}`,
                {},
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleAuthorizationPersetujuanManajer() {
        if (getCookie("role") == "MANAJER") {
            if (pengajuanPinjaman.status == "Sedang ditinjau manajer") {
                return (
                    <div className="space-between align-start">
                        <div className="inner-card left">
                            <h3>Terima Pengajuan</h3>
                            <Link href="../permohonan/">
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() =>
                                        updateStatus(
                                            "survey",
                                            pengajuanPinjaman.id
                                        )
                                    }
                                >
                                    Terima
                                </Button>
                            </Link>
                        </div>
                        <div className="inner-card right">
                            <h3>Tolak Pengajuan</h3>
                            {/* <div className="div ksu-input-text-field">
                                <TextField
                                    id="outlined-basic"
                                    label="Alasan penolakan"
                                    multiline
                                    fullWidth
                                />
                            </div> */}
                            <Link href="../permohonan/">
                                <Button
                                    variant="outlined"
                                    disableElevation
                                    color="error"
                                    onClick={() =>
                                        updateStatus(
                                            "tolak",
                                            pengajuanPinjaman.id
                                        )
                                    }
                                >
                                    Tolak
                                </Button>
                            </Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="space-between align-start">
                        <p>
                            Pengajuan pinjaman ini sudah melalui tahap
                            peninjauan oleh manajer
                        </p>
                    </div>
                );
            }
        } else {
            if (pengajuanPinjaman.status == "Sedang ditinjau manajer") {
                return (
                    <div className="space-between align-start">
                        <p>
                            Pengajuan pinjaman ini sedang ditinjau oleh manajer
                        </p>
                    </div>
                );
            } else {
                return (
                    <div className="space-between align-start">
                        <p>
                            Pengajuan pinjaman ini sudah melalui tahap
                            peninjauan oleh manajer
                        </p>
                    </div>
                );
            }
        }
    }

    function handleAuthorizationSurvey() {
        if (getCookie("role") == "SURVEYOR") {
            if (pengajuanPinjaman.hasilSurvey == null) {
                return (
                    <div className="ksu-card full-width gap">
                        <h2>Penjelasan Survei</h2>
                        <div className="div ksu-input-text-field">
                            <TextField
                                id="outlined-basic"
                                label="Penjelasan"
                                multiline
                                minRows={3}
                                fullWidth
                                onBlur={(e) => {
                                    setHasilSurvey(e.target.value);
                                    {
                                        console.log(hasilSurvey);
                                    }
                                }}
                            />
                        </div>
                        <div className="space-between align-right">
                            <Link
                                href={`/pinjaman/permohonan/${pengajuanPinjaman.id}`}
                            >
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() => {
                                        updateHasilSurvey(
                                            hasilSurvey,
                                            pengajuanPinjaman.id
                                        );
                                    }}
                                >
                                    Submit
                                </Button>
                            </Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="ksu-card full-width gap">
                        <h2>Hasil Survei</h2>
                        <div className="ksu-input-text-field">
                            <div className="inner-card left">
                                <div>
                                    <p>
                                        <strong>Surveyor</strong>
                                    </p>
                                    <p>{pengajuanPinjaman.surveyor.name}</p>
                                </div>
                                <h3>Loloskan Survei</h3>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() => {
                                        updateStatusFromSurveyor(
                                            "Menunggu Konfirmasi Akhir Manajer",
                                            pengajuanPinjaman.id
                                        );
                                    }}
                                >
                                    Loloskan
                                </Button>
                            </div>
                            <div className="inner-card right">
                                <div>
                                    <p>
                                        <strong>Hasil Survey</strong>
                                    </p>
                                    <p>{pengajuanPinjaman.hasilSurvey}</p>
                                </div>
                                <h3>Tolak Survei</h3>
                                <Button
                                    variant="outlined"
                                    disableElevation
                                    color="error"
                                    onClick={() => {
                                        updateStatusFromSurveyor(
                                            "Ditolak",
                                            pengajuanPinjaman.id
                                        );
                                    }}
                                >
                                    Tolak
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            }
        } else {
            if (pengajuanPinjaman.hasilSurvey == null) {
                return (
                    <div className="ksu-card full-width gap">
                        <p>
                            Pengajuan pinjaman ini sedang ditinjau oleh
                            surveyor. Hasil survey akan ditampilkan setelah
                            surveyor selesai melakukan survey.
                        </p>
                    </div>
                );
            } else {
                return (
                    <div className="ksu-card full-width gap">
                        <h2>Hasil Survei</h2>
                        <div className="ksu-input-text-field">
                            <div className="inner-card left">
                                <div>
                                    <p>
                                        <strong>Surveyor</strong>
                                    </p>
                                    <p>{pengajuanPinjaman.surveyor.name}</p>
                                </div>
                            </div>
                            <div className="inner-card right">
                                <div>
                                    <p>
                                        <strong>Hasil Survey</strong>
                                    </p>
                                    <p>{pengajuanPinjaman.hasilSurvey}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    function handleAuthorizationBuatPinjaman() {
        if (getCookie("role") == "MANAJER") {
            if (
                pengajuanPinjaman.status == "dalam tahap survey" ||
                pengajuanPinjaman.status == "Menunggu Konfirmasi Akhir Manajer"
            ) {
                return (
                    <div className="space-between align-start">
                        <div className="inner-card left">
                            <h3>Terima Pengajuan</h3>
                            <Link href="..">
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() =>
                                        updateStatus(
                                            "terima",
                                            pengajuanPinjaman.id,
                                            pengajuanPinjaman.jaminan.id
                                        )
                                    }
                                >
                                    Terima dan Buat Pinjaman
                                </Button>
                            </Link>
                        </div>
                        <div className="inner-card right">
                            <h3>Tolak Pengajuan</h3>
                            <Link href="../permohonan/">
                                <Button
                                    variant="outlined"
                                    disableElevation
                                    color="error"
                                    onClick={() =>
                                        updateStatus(
                                            "tolak",
                                            pengajuanPinjaman.id,
                                            pengajuanPinjaman.jaminan.id
                                        )
                                    }
                                >
                                    Tolak
                                </Button>
                            </Link>
                        </div>
                    </div>
                );
            } else if (
                pengajuanPinjaman.status == "diterima" ||
                pengajuanPinjaman.status == "ditolak"
            ) {
                return (
                    <div className="space-between align-start">
                        <p>Pengajuan pinjaman ini sudah diterima/ditolak</p>
                    </div>
                );
            } else {
                return (
                    <div className="space-between align-start">
                        <p>Pengajuan pinjaman ini belum ditinjau manajer</p>
                    </div>
                );
            }
        } else {
            if (pengajuanPinjaman.status == "dalam tahap survey") {
                return (
                    <div className="space-between align-start">
                        <p>Pengajuan pinjaman sedang di tahap survey</p>
                    </div>
                );
            } else if (
                pengajuanPinjaman.status == "diterima" ||
                pengajuanPinjaman.status == "ditolak"
            ) {
                return (
                    <div className="space-between align-start">
                        <p>Pengajuan pinjaman ini sudah diterima/ditolak</p>
                    </div>
                );
            } else {
                return (
                    <div className="space-between align-start">
                        <p>Pengajuan pinjaman ini belum ditinjau manajer</p>
                    </div>
                );
            }
        }
    }

    if (loadingPage || pengajuanPinjaman == undefined) {
        return <Loader height={"full"} />;
    } else {
        switch (pagePoint) {
            case 1:
                return (
                    <section className="ksu-wrapper form center">
                        <h1>
                            Detail Permohonan Pinjaman - {pengajuanPinjaman.id}
                        </h1>
                        <BulletProgress
                            jumlahBullet={3}
                            bulletDone={0}
                            type={"kevin"}
                            setPagePoint={setPagePoint}
                            pagePoint={pagePoint}
                        />

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
                                            {console.log(pengajuanPinjaman)}
                                            <p>
                                                <strong>
                                                    {
                                                        pengajuanPinjaman
                                                            .anggota.name
                                                    }
                                                </strong>
                                            </p>
                                            <p>
                                                {pengajuanPinjaman.anggota.id}
                                            </p>
                                        </div>
                                    </div>

                                    {label1.map((item, index) => (
                                        <div key={index}>
                                            <p>
                                                <strong>{item.label}</strong>
                                            </p>
                                            <p>
                                                {
                                                    pengajuanPinjaman.anggota[
                                                        item.name
                                                    ]
                                                }
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="inner-card right">
                                    {label2.map((item, index) => (
                                        <div key={index}>
                                            <p>
                                                <strong>{item.label}</strong>
                                            </p>
                                            <p>
                                                {
                                                    pengajuanPinjaman.anggota[
                                                        item.name
                                                    ]
                                                }
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="ksu-card full-width gap">
                            <h2>Data Permohonan Pinjaman</h2>
                            <div className="space-between align-start">
                                <div className="inner-card left">
                                    {label3.map((item, index) => (
                                        <div key={index}>
                                            <p>
                                                <strong>{item.label}</strong>
                                            </p>
                                            <p>
                                                {pengajuanPinjaman[item.name]}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="inner-card right">
                                    {label4.map((item, index) => (
                                        <div key={index}>
                                            <p>
                                                <strong>{item.label}</strong>
                                            </p>
                                            <p>
                                                {pengajuanPinjaman[item.name]}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="ksu-card full-width gap">
                            <h2>Data Jaminan</h2>
                            <div className="space-between align-start">
                                <div className="inner-card left">
                                    {label5.map((item, index) => (
                                        <div key={index}>
                                            <p>
                                                <strong>{item.label}</strong>
                                            </p>
                                            <p>
                                                {
                                                    pengajuanPinjaman.jaminan[
                                                        item.name
                                                    ]
                                                }
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="inner-card right">
                                    {HandleJaminan()}
                                </div>
                            </div>
                        </div>

                        <div className="ksu-card full-width gap">
                            <h2>Hasil Persetujuan Manajer</h2>
                            <div className="space-between align-start">
                                {handleAuthorizationPersetujuanManajer(
                                    pengajuanPinjaman
                                )}
                            </div>
                        </div>

                        <div className="space-between">
                            <ReactToPrint
                                trigger={() => (
                                    <Button>
                                        Print Detail &nbsp;
                                        <LocalPrintshopRoundedIcon />
                                    </Button>
                                )}
                                content={() => componentRef}
                            />
                            {/* Template Dokumen PDF */}
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
                                                    Detail Permohonan Pinjaman
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
                                                            {
                                                                pengajuanPinjaman
                                                                    .anggota
                                                                    .name
                                                            }
                                                        </strong>
                                                    </p>
                                                    <p>Member ID</p>
                                                </div>
                                            </div>
                                            {label1.map((item, index) => (
                                                <div key={index}>
                                                    <p>
                                                        <strong>
                                                            {item.label}
                                                        </strong>
                                                    </p>
                                                    <p>
                                                        {
                                                            pengajuanPinjaman
                                                                .anggota[
                                                                item.name
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="inner-card right">
                                            {label2.map((item, index) => (
                                                <div key={index}>
                                                    <p>
                                                        <strong>
                                                            {item.label}
                                                        </strong>
                                                    </p>
                                                    <p>
                                                        {
                                                            pengajuanPinjaman
                                                                .anggota[
                                                                item.name
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <br />
                                    <h2>Data Permohonan Pinjaman</h2>
                                    <div className="space-between align-start">
                                        <div className="inner-card left">
                                            {label3.map((item, index) => (
                                                <div key={index}>
                                                    <p>
                                                        <strong>
                                                            {item.label}
                                                        </strong>
                                                    </p>
                                                    <p>
                                                        {
                                                            pengajuanPinjaman[
                                                                item.name
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="inner-card right">
                                            {label4.map((item, index) => (
                                                <div key={index}>
                                                    <p>
                                                        <strong>
                                                            {item.label}
                                                        </strong>
                                                    </p>
                                                    <p>
                                                        {
                                                            pengajuanPinjaman[
                                                                item.name
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <br />
                                    <h2>Data Jaminan</h2>
                                    <div className="space-between align-start">
                                        <div className="inner-card left">
                                            {label5.map((item, index) => (
                                                <div key={index}>
                                                    <p>
                                                        <strong>
                                                            {item.label}
                                                        </strong>
                                                    </p>
                                                    <p>
                                                        {
                                                            pengajuanPinjaman
                                                                .jaminan[
                                                                item.name
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="inner-card right">
                                            {HandleJaminan()}
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
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
                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<NavigateNextRoundedIcon />}
                                onClick={() => setPagePoint(2)}
                            >
                                Berikutnya
                            </Button>
                        </div>
                    </section>
                );
            case 2:
                return (
                    <section className="ksu-wrapper form center">
                        <h1>
                            Survei Permohonan Pinjaman - {pengajuanPinjaman.id}
                        </h1>
                        <BulletProgress
                            jumlahBullet={3}
                            bulletDone={0}
                            type={"kevin"}
                            setPagePoint={setPagePoint}
                            pagePoint={pagePoint}
                        />
                        {handleAuthorizationSurvey()}
                        <div className="space-between">
                            <Button
                                variant="outlined"
                                disableElevation
                                startIcon={<ArrowBackIosNewRoundedIcon />}
                                onClick={() => setPagePoint(1)}
                            >
                                Sebelumnya
                            </Button>
                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<NavigateNextRoundedIcon />}
                                onClick={() => {
                                    setPagePoint(3);
                                }}
                            >
                                Berikutnya
                            </Button>
                        </div>
                    </section>
                );
            case 3:
                return (
                    <section className="ksu-wrapper form center">
                        <h1>Persetujuan Akhir - {pengajuanPinjaman.id}</h1>

                        <BulletProgress
                            jumlahBullet={3}
                            bulletDone={0}
                            type={"kevin"}
                            setPagePoint={setPagePoint}
                            pagePoint={pagePoint}
                        />

                        <div className="ksu-card full-width gap">
                            <h2>Hasil Persetujuan Akhir</h2>
                            {handleAuthorizationBuatPinjaman(pengajuanPinjaman)}
                        </div>

                        <div className="space-between">
                            <Button
                                variant="outlined"
                                disableElevation
                                startIcon={<ArrowBackIosNewRoundedIcon />}
                                onClick={() => setPagePoint(2)}
                            >
                                Sebelumnya
                            </Button>
                        </div>
                    </section>
                );
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(
        urlbase() + "/api/v2/pengajuan-pinjaman/list-of-all-ids"
    );
    const data = await res.json();
    console.log(data);
    const paths = data.map((item) => {
        return {
            params: { detail: item.toString() },
        };
    });
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const detail = context.params.detail;
    // const res = await fetch("http://localhost:8080/pengajuan-pinjaman/" + detail);
    // const data = await res.json();
    // console.log(detail);

    return {
        props: {
            pengajuanPinjaman_id: detail,
        },
    };
};
