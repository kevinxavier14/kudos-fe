import { cloneElement, useEffect, useState } from "react";
import axios from "axios";
import { getCookie, urlbase } from "@/hooks/Cookies";
import LoaderDetailPage from "@/components/Loader/LoaderDetailPage";
import { Button, Link, Modal } from "@mui/material";
import { reformatDate, reformatNominal } from "../../hooks/GeneralFunction";
import StatusCardDetail from "@/components/StatusCardDetail";
import KSUDropzone from "@/components/KSUDropzone";
import KsuModal from "../../components/KsuModal";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { uploadFileToAws } from "@/hooks/aws.js";
import MyResponsivePie from "../../components/Chart/PieChart";

//Tagihan
const label1 = [
    {
        label: "Tagihan Bulan Ini",
        name: "tagihanBulanan",
    },
    {
        label: "Tagihan Terlambat Sebelumnya",
        name: "tagihanBulanSebelumnya",
    },
    {
        label: "Denda",
        name: "penalty",
    },
    {
        label: "Total Tagihan",
        name: "totalTagihan",
    },
];

const label1Right = [
    {
        label: "Tanggal Jatuh Tempo",
        name: "tanggalJatuhTempo",
    },
];

//Pinjaman
const label2Left = [
    // {
    //     label: "Status",
    //     name: "statusPinjaman",
    // },
    {
        label: "Nominal Pinjaman",
        name: "nominalPinjaman",
    },
    {
        label: "Nominal Terbayar",
        name: "nominalTerbayar",
    },
    {
        label: "Sisa Pinjaman",
        name: "sisaPinjaman",
    },
    {
        label: "Bunga",
        name: "bunga",
    },
    {
        label: "Tanggal Jatuh Tempo",
        name: "tanggalJatuhTempo",
    },
];

const label2Right = [
    {
        label: "Jenis Pinjaman",
        name: "jenisPinjaman",
    },
    {
        label: "Tanggal Selesai",
        name: "tanggalSelesai",
    },
    {
        label: "Jangka Waktu Pinjaman (dalam bulan)",
        name: "totalBulan",
    },
    {
        label: "Total Bulan Terbayar",
        name: "sisaBulan",
    },
];

//Anggota
const label3Left = [
    {
        label: "Username",
        name: "username",
    },
];

const label3Right = [
    {
        label: "Nama",
        name: "name",
    },
];

//Jaminan
const label4Left = [
    {
        label: "Nilai Jaminan",
        name: "nilaiJaminan",
    },
    {
        label: "Jenis Jaminan",
        name: "jenisJaminan",
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

const label4RightKendaraan = [
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

const label4RightSertifikat = [
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

export default function DetailPinjaman({ pinjaman_id }) {
    const [pinjaman, setPinjaman] = useState();
    const [tagihan, setTagihan] = useState();
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingPageTagihan, setLoadingPageTagihan] = useState(true);
    const [pinjamanReformatted, setPinjamanReformatted] = useState();
    const [tagihanReformatted, setTagihanReformatted] = useState();

    // buat upload pencairan dana ke aws
    const [pencairanDanaUrl, setPencairanDanaUrl] = useState();
    const [pencairanDanaImage, setPencairanDanaImage] = useState();
    const [pencairanDanaLoading, setPencairanDanaLoading] = useState(false);
    const [pencairanDanaSubmitted, setPencairanDanaSubmitted] = useState(false);
    const [pencairanDanaSubmitting, setPencairanDanaSubmitting] =
        useState(false);

    // buat chart sisa pinjaman
    const [sisaPinjamanChartData, setSisaPinjamanChartData] = useState();

    function handleJaminan() {
        let type = "";
        let attr = pinjamanReformatted.jaminan.merkType;

        if (attr == null) {
            type = "Sertifikat";
        } else {
            type = "Kendaraan";
        }

        switch (type) {
            case "Kendaraan":
                return label4RightKendaraan.map((item, index) => (
                    <div key={index}>
                        <p>
                            <strong>{item.label}</strong>
                        </p>
                        <p>{pinjamanReformatted.jaminan[item.name]}</p>
                    </div>
                ));
            case "Sertifikat":
                return label4RightSertifikat.map((item, index) => (
                    <div key={index}>
                        <p>
                            <strong>{item.label}</strong>
                        </p>
                        <p>{pinjamanReformatted.jaminan[item.name]}</p>
                    </div>
                ));
        }
    }

    async function HandleKsuDropzone() {
        setPencairanDanaSubmitting(true);
        try {
            const imageRes1 = await uploadFileToAws(
                pencairanDanaImage,
                "pencairanDana",
                pinjaman.anggota.username,
                setPencairanDanaLoading
            );
            console.log(imageRes1);

            const response = await axios.post(
                `${urlbase()}/api/v1/pencairan-pinjaman`,
                { idPinjaman: pinjaman.id, imagePencairan: imageRes1 },
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            );
            console.log("response");
            console.log(response);
        } catch (e) {
            console.log("up to spring", e);
        }
        setPencairanDanaSubmitting(false);
        setPencairanDanaSubmitted(true);
    }

    function handleConfirmBuktiPencairanDanaButton() {
        return (
            <Button
                variant="contained"
                disableElevation
                onClick={(e) => {
                    submitConfirmPencairanDana();
                }}
            >
                Konfirmasi Penerimaan Dana
            </Button>
        );
    }

    async function submitConfirmPencairanDana() {
        try {
            const response = await axios.post(
                `${urlbase()}/api/v1/pinjaman/confirm-pencairan/${pinjaman.id}`,
                {},
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            );
            console.log(response);
        } catch (e) {
            console.log("up confirm dana", e);
        }
    }

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/pinjaman/" + pinjaman_id, {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                setPinjaman(response.data);
                setLoadingPage(false);
                let responseClone = JSON.parse(JSON.stringify(response));
                console.log(response);
                responseClone.data.nominalPinjaman = reformatNominal(
                    responseClone.data.nominalPinjaman
                );
                responseClone.data.nominalTerbayar = reformatNominal(
                    responseClone.data.nominalTerbayar
                );
                responseClone.data.sisaPinjaman = reformatNominal(
                    responseClone.data.sisaPinjaman
                );
                responseClone.data.bunga = reformatNominal(
                    responseClone.data.bunga
                );
                responseClone.data.jaminan.nilaiJaminan = reformatNominal(
                    responseClone.data.jaminan.nilaiJaminan
                );
                responseClone.data.tanggalJatuhTempo = reformatDate(
                    responseClone.data.tanggalJatuhTempo
                );
                responseClone.data.tanggalSelesai = reformatDate(
                    responseClone.data.tanggalSelesai
                );
                console.log(responseClone.data);
                setPinjamanReformatted(responseClone.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/pinjaman/tagihan/" + pinjaman_id, {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                setTagihan(response.data);
                setLoadingPageTagihan(false);
                let responseClone = JSON.parse(JSON.stringify(response));
                console.log(response);
                responseClone.data.tagihanBulanan = reformatNominal(
                    responseClone.data.tagihanBulanan
                );
                responseClone.data.penalty = reformatNominal(
                    responseClone.data.penalty
                );
                responseClone.data.tagihanBulanSebelumnya = reformatNominal(
                    responseClone.data.tagihanBulanSebelumnya
                );
                responseClone.data.totalTagihan = reformatNominal(
                    responseClone.data.totalTagihan
                );
                // console.log(responseClone.data);
                setTagihanReformatted(responseClone.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(
                urlbase()+"/api/v1/pinjaman/sisa-pinjaman-chart/" + pinjaman_id,
                {headers: {
                    Authorization: getCookie('token'),
                    },
                }
            )
            .then((response) => {
                console.log("komponen chart")
                console.log(response.data);
                setSisaPinjamanChartData(response.data);
                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    //         const response = await axios.post(
    //             `${urlbase()}/api/v1/pencairan-pinjaman`,
    //             { idPinjaman: pinjaman.id, imagePencairan: imageRes1 },
    //             {
    //                 headers: {
    //                     Authorization: getCookie("token"),
    //                 },
    //             }
    //         );
    //         console.log("response");
    //         console.log(response);
    //     } catch (e) {
    //         console.log("up to spring", e);
    //     }
    //     setPencairanDanaSubmitting(false);
    //     setPencairanDanaSubmitted(true);
    // }
    async function submitConfirmPencairanDana() {
        try {
            const response = await axios.post(
                `${urlbase()}/api/v1/pinjaman/confirm-pencairan/${pinjaman.id}`,
                {},
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            );
            console.log(response);
        } catch (e) {
            console.log("up confirm dana", e);
        }
    }
    function handleConfirmBuktiPencairanDanaButton() {
        return (
            <Button
                variant="contained"
                disableElevation
                onClick={(e) => {
                    submitConfirmPencairanDana();
                }}
            >
                Konfirmasi Penerimaan Dana
            </Button>
        );
    }

    if (loadingPage || pinjaman == undefined) {
        return <LoaderDetailPage />;
    } else {
        return (
            <section className="detail-wrapper">
                <div className="status-wrapper">
                    <h1>&nbsp;</h1>
                    <StatusCardDetail
                        title={"Status Pinjaman"}
                        value={pinjamanReformatted.statusPinjaman}
                    />
                    {/* untuk react-chart */}
                    <div 
                        className="ksu-card"
                        style={{ height: "45vh", aspectRatio: "1/1" }}>
                            
                        <MyResponsivePie
                            title={"Chart Sisa Pinjaman (Jt Rp)"}
                            subtitle={"Pinjaman " + pinjamanReformatted.id}
                            data={sisaPinjamanChartData}
                        />
                    </div>
                </div>
                <section className="ksu-wrapper form">
                    <h1>Detail Pinjaman - {pinjamanReformatted.id}</h1>
                    <div className="ksu-card full-width gap">
                        <h2>Anggota</h2>
                        <div className="space-between align-start">
                            <div className="inner-card left">
                                {label3Left.map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>
                                            {
                                                pinjamanReformatted.anggota[
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
                        <h2>Tagihan</h2>

                        <div className="space-between align-start">
                            <div className="inner-card left">
                                {label1.slice(0, 2).map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>{tagihanReformatted[item.name]}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="inner-card right">
                                {label1.slice(2).map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>{tagihanReformatted[item.name]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-between align-right">
                            <Link href={`/pembayaran/${pinjamanReformatted.id}`}>
                                <Button 
                                    variant="contained" 
                                    disableElevation
                                >
                                    Lihat Pembayaran
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="ksu-card full-width gap">
                        <h2>Pinjaman</h2>
                        <div className="space-between align-start">
                            <div className="inner-card left">
                                {label2Left.map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>{pinjamanReformatted[item.name]}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="inner-card right">
                                {label2Right.map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>{pinjamanReformatted[item.name]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {console.log(pinjaman)}
                    <div className="ksu-card full-width gap">
                        <h2>Pencairan Dana</h2>

                        {/* misal dia anggota */}
                        {getCookie("role") == "ANGGOTA" ? (
                            <>
                                {pinjaman.statusPinjaman.toLowerCase() ==
                                "belum cair" ? (
                                    <>
                                        <div className="space-between">
                                            <div>
                                                <p>
                                                    <strong>Status</strong>
                                                </p>
                                                <p
                                                    style={{
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {/* handle status pinjaman */}
                                                    Sedang Dicairkan
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-between">
                                            <div>
                                                <p>
                                                    <strong>Status</strong>
                                                </p>
                                                <p
                                                    style={{
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {/* handle status pinjaman */}
                                                    Sudah Dicairkan
                                                </p>
                                            </div>
                                            <KsuModal
                                                firstButtonText={
                                                    "Bukti Pencairan"
                                                }
                                                firstButtonTextVariant={"text"}
                                                imageUrl={
                                                    pinjaman.buktiPencairanPinjaman
                                                }
                                            />
                                        </div>
                                        <div className="space-between center">
                                            {handleConfirmBuktiPencairanDanaButton()}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            // misal dia bukan anggota
                            <>
                                {/* misal dia belom cair bakal masuk sini */}
                                {pinjamanReformatted.statusPinjaman.toLowerCase() ==
                                "belum cair" ? (
                                    <>
                                        {/* if pencairan dananya lagi proses submit pada onPostToSpring*/}
                                        {!pencairanDanaSubmitted ? (
                                            <>
                                                <KSUDropzone
                                                    setURL={setPencairanDanaUrl}
                                                    setImage={
                                                        setPencairanDanaImage
                                                    }
                                                />
                                                {pencairanDanaImage ==
                                                undefined ? (
                                                    <div className="space-between center">
                                                        <Button
                                                            variant="contained"
                                                            disableElevation
                                                            disabled
                                                        >
                                                            Simpan Bukti
                                                            Pencairan Dana
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="space-between center">
                                                        {pencairanDanaSubmitting ? (
                                                            <LoadingButton
                                                                endIcon={
                                                                    <SendIcon />
                                                                }
                                                                loading={true}
                                                                loadingPosition="end"
                                                                variant="contained"
                                                            >
                                                                <span>
                                                                    Ajukan
                                                                    Pendaftaran
                                                                </span>
                                                            </LoadingButton>
                                                        ) : (
                                                            <Button
                                                                variant="contained"
                                                                disableElevation
                                                                onClick={() => {
                                                                    HandleKsuDropzone();
                                                                }}
                                                            >
                                                                Simpan Bukti
                                                                Pencairan Dana
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            // kalo udah submitted (kelar onPosToSpring) bakal masuk sini
                                            <>
                                                <div className="space-between">
                                                    <div>
                                                        <p>
                                                            <strong>
                                                                Status
                                                            </strong>
                                                        </p>
                                                        <p
                                                            style={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        >
                                                            Sudah Dicairkan
                                                        </p>
                                                    </div>
                                                    <KsuModal
                                                        firstButtonText={
                                                            "Bukti Pencairan"
                                                        }
                                                        firstButtonTextVariant={
                                                            "text"
                                                        }
                                                        imageUrl={
                                                            pencairanDanaUrl
                                                        }
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    // misal dia cair bakal masuk sini
                                    <div className="space-between">
                                        <div>
                                            <p>
                                                <strong>Status</strong>
                                            </p>
                                            <p
                                                style={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                Sudah Dicairkan
                                            </p>
                                        </div>
                                        <KsuModal
                                            firstButtonText={"Bukti Pencairan"}
                                            firstButtonTextVariant={"text"}
                                            imageUrl={
                                                pinjaman.buktiPencairanPinjaman
                                            }
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="ksu-card full-width gap">
                        <h2>Jaminan</h2>
                        <div className="space-between align-start">
                            <div className="inner-card left">
                                {/* <div className="image-wrapper-details">
                                nanti di isi sama image poto orangnya
                                {true ? (
                                    <img
                                        src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
                                        alt="person-image"
                                    />
                                ) : (
                                    <img
                                        src="https://i.stack.imgur.com/l60Hf.png"
                                        alt="default-pp-image"
                                    />
                                )}
                                <div className="name-wrapper">
                                    <p>
                                        <strong>{mockupData.name}</strong>
                                    </p>
                                    <p>{mockupData.id}</p>
                                </div>
                            </div> */}

                                {label4Left.map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>
                                            {
                                                pinjamanReformatted.jaminan[
                                                    item.name
                                                ]
                                            }
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="inner-card right">
                                {handleJaminan()}
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(urlbase() + "/api/v2/pinjaman/list-of-all-ids");
    const data = await res.json();

    console.log("data");
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

    return {
        props: {
            pinjaman_id: detail,
        },
    };
};
