import { useEffect, useState, useRef } from "react";
import { getCookie, urlbase } from "@/hooks/Cookies";
import { reformatNominal, reformatDate } from "@/hooks/GeneralFunction";
import Link from "next/link";
import { Button } from "@mui/material";
import KsuModal from "@/components/KsuModal";
import Loader from "@/components/Loader/Loader";
import axios from "axios";


export default function DetailPembayaran({pembayaran_id}) {
    const [loadingPage, setLoadingPage] = useState(true);
    const [pembayaran, setPembayaran] = useState();

    const userRole = getCookie('role');

    let nominalPembayaran = 0;
    let nominalPembayaranReformatted = "";

    useEffect(() => {
        axios
            .get(
                urlbase()+"/api/v1/pembayaran/view/" + pembayaran_id,
                {headers: {
                    Authorization: getCookie('token'),
                    },
                }
                
            )
            .then((response) => {
                // console.log(response);
                setPembayaran(response.data);
                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function HandleNominalPembayaran(pembayaran) {
        let jatuhTempoReformatted = reformatDate(pembayaran.pinjaman.tanggalJatuhTempo);
        let selesaiReformatted = reformatDate(pembayaran.pinjaman.tanggalSelesai);

        let jenisPinjaman = pembayaran.pinjaman.jenisPinjaman;
        
        console.log(jatuhTempoReformatted);
        console.log(selesaiReformatted);

        if (jenisPinjaman == "angsuran") {
           nominalPembayaran = pembayaran.pinjaman.tagihanBulanan;
        } else {
            if (jatuhTempoReformatted === selesaiReformatted) {
                nominalPembayaran = pembayaran.pinjaman.tagihanMusimanBulanTerakhir;
            } else {
                nominalPembayaran = pembayaran.pinjaman.tagihanMusimanBiasa;
            }
        }

        nominalPembayaranReformatted = reformatNominal(nominalPembayaran);
    }

    function updateStatus(type, id) {
        axios
            .put(
                urlbase() + `/api/v1/pembayaran/update-status/${type}/${id}`,
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

    if (loadingPage || pembayaran == undefined) {
        return <Loader height={"full"} />;
    } else {
        return(
            <section className="ksu-wrapper form center">
                <h1>Detail Pembayaran {pembayaran.id} - Pinjaman {pembayaran.pinjaman.id}</h1>
                
                <div className="ksu-card full-width gap">
                    <h2>Data Pembayaran</h2>
                    <div className="space-between align-start">
                        <div className="inner-card left">
                            <div>
                                <p>
                                    <strong>Jenis Pinjaman</strong>
                                </p>
                                <p>
                                    {pembayaran.pinjaman.jenisPinjaman}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong>Jenis Pembayaran</strong>
                                </p>
                                <p>
                                    {pembayaran.jenisPembayaran}
                                </p>
                            </div>
                        </div>
                        <div className="inner-card right">
                            {HandleNominalPembayaran(pembayaran)}
                            <div>
                                <p>
                                    <strong>Nominal Pembayaran</strong>
                                </p>
                                <p>
                                    {nominalPembayaranReformatted}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong>Status Pembayaran</strong>
                                </p>
                                <p>
                                    {pembayaran.statusPembayaran}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-between align-right">
                        <KsuModal
                            firstButtonText={"Bukti Pembayaran"}
                            firstButtonTextVariant={"text"}
                            imageUrl={pembayaran.fotoBuktiPembayaran}
                        />
                    </div>
                </div>
                
                {pembayaran.statusPembayaran == "ditolak" && (
                    <div className="space-between">
                        <p>***Pembayaran ditolak, harap segera mengajukan bukti pembayaran</p>
                    </div>
                )}

                {userRole != "ANGGOTA" && pembayaran.statusPembayaran == "menunggu konfirmasi" && (
                    <div className="ksu-card full-width gap">
                        <h2>Konfirmasi Pembayaran</h2>
                        <div className="space-between"> 
                            <h3>Tolak Pembayaran</h3>
                            <h3>Terima Pembayaran</h3>
                        </div>
                        <div className="space-between"> 
                            <Link href={`/pembayaran/${pembayaran.pinjaman.id}`}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    disableElevation
                                    onClick={() =>
                                        updateStatus(
                                            "ditolak",
                                            pembayaran.id
                                        )
                                    }
                                >
                                    Tolak
                                </Button>
                            </Link>            

                            <Link href={`/pembayaran/${pembayaran.pinjaman.id}`}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() =>
                                        updateStatus(
                                            "diterima",
                                            pembayaran.id
                                        )
                                    }
                                >
                                    Terima
                                </Button>
                            </Link>   
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(urlbase() + "/api/v2/pembayaran/list-of-all-ids");
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
}

export const getStaticProps = async (context) => {
    const detail = context.params.detail;
    
    return {
        props: {
            pembayaran_id: detail,
        },
    };
}
