import { useEffect, useState, useRef } from "react";
import { getCookie, urlbase } from "@/hooks/Cookies";
import { reformatNominal, reformatDate } from "@/hooks/GeneralFunction";
import { uploadFileToAws } from "@/hooks/aws.js";
import Link from "next/link";
import { Button } from "@mui/material";
import Loader from "@/components/Loader/Loader";
import KSUDropzone from "@/components/KSUDropzone";
import axios from "axios";


export default function UploadPembayaran({pinjaman_id}) {
    const [loadingPage, setLoadingPage] = useState(true);
    const [pinjaman, setPinjaman] = useState();
    const [tagihan, setTagihan] = useState();
    const [buktiPembayaranImage, setBuktiPembayaranImage] = useState();
    const [buktiPembayaranUrl, setBuktiPembayaranUrl] = useState();
    const [buktiPembayaranLoad, setBuktiPembayaranLoad] = useState();

    let nominalPembayaran = 0;
    let nominalPembayaranFinal = 0;
    let nominalPembayaranReformatted = "";
    let jenisPembayaran = "";

    useEffect(() => {
        axios
            .get(
                urlbase()+"/api/v1/pinjaman/" + pinjaman_id,
                {headers: {
                    Authorization: getCookie('token'),
                    },
                }
            )
            .then((response) => {
                // console.log(response);
                setPinjaman(response.data);
                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(
                urlbase()+"/api/v1/pinjaman/tagihan/" + pinjaman_id,
                {headers: {
                    Authorization: getCookie('token'),
                    },
                }
            )
            .then((response) => {
                // console.log(response);
                setTagihan(response.data);
                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function HandleNominalDanJenisPembayaran(pinjaman, tagihan) {
        let jatuhTempoReformatted = reformatDate(pinjaman.tanggalJatuhTempo);
        let selesaiReformatted = reformatDate(pinjaman.tanggalSelesai);

        let jenisPinjaman = pinjaman.jenisPinjaman;

        // let totalTagihan = tagihan.totalTagihan
        
        console.log(jatuhTempoReformatted);
        console.log(selesaiReformatted);

        if (jenisPinjaman == "angsuran") {
           nominalPembayaran = pinjaman.tagihanBulanan;
           jenisPembayaran = "hutang pokok dan bunga";
        } else {
            if (jatuhTempoReformatted === selesaiReformatted) {
                nominalPembayaran = pinjaman.tagihanMusimanBulanTerakhir;
                jenisPembayaran = "hutang pokok dan bunga";
            } else {
                nominalPembayaran = pinjaman.tagihanMusimanBiasa;
                jenisPembayaran = "bunga";
            }
        }

        nominalPembayaranFinal = nominalPembayaran;
        nominalPembayaranReformatted = reformatNominal(nominalPembayaranFinal);
    }

    async function onPostToSpring(pinjaman) {
        try {
            const fotoBuktiPembayaran = await uploadFileToAws(
                buktiPembayaranImage,
                "fotoBuktiPembayaran",
                pinjaman.anggota.username,
                setBuktiPembayaranLoad
            );
            
            const anggotaUsername = pinjaman.anggota.username
            
            const pinjamanId = pinjaman.id
            
            const params = {
                fotoBuktiPembayaran: fotoBuktiPembayaran,
                jenisPembayaran: jenisPembayaran,
                statusPembayaran: "menunggu konfirmasi",
                anggotaUsername: anggotaUsername,
                pinjamanId: pinjamanId
            };

            const response = await axios.post(
                `${urlbase()}/api/v1/pembayaran/add`,
                params
            );
            
            console.log(response);
        } catch (e) {
            console.log("up to spring", e);
        }
    }

    if (loadingPage || pinjaman == undefined) {
        return <Loader height={"full"} />;
    } else {
        return(
            <section className="ksu-wrapper form center">
                <h1>Tambah Pembayaran - Pinjaman {pinjaman.id}</h1>
                
                <div className="ksu-card full-width gap">
                    <h2>Upload Bukti Pembayaran</h2>
                    <div className="space-between align-start">
                        {HandleNominalDanJenisPembayaran(pinjaman, tagihan)}
                        <div className="inner-card left">
                            <div>
                                <p>
                                    <strong>Jenis Pembayaran</strong>
                                </p>
                                <p>
                                    {jenisPembayaran}
                                </p>
                            </div>
                        </div>
                        
                        <div className="inner-card right">
                            <div>
                                <p>
                                    <strong>Nominal yang Harus Dibayar</strong>
                                </p>
                                <p>
                                    {nominalPembayaranReformatted}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="dz">
                        <KSUDropzone
                            setURL={setBuktiPembayaranUrl}
                            setImage={setBuktiPembayaranImage}
                        />
                    </div>
                </div>

                <div className="space-between align-right">
                    <Link
                        href={`/pembayaran/${pinjaman.id}`}
                    >
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={() => {
                                onPostToSpring(pinjaman);    
                            }}
                        >
                            Submit Pembayaran
                        </Button>
                    </Link>
                </div>

            </section>
        );
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(urlbase() + "/api/v2/pinjaman/list-of-all-ids");
    const data = await res.json();
    console.log(data);
    const paths = data.map((item) => {
        return {
            params: { index: item.toString() },
        };
    });
    return {
        paths,
        fallback: true,
    };
}

export const getStaticProps = async (context) => {
    const index = context.params.index;
    
    return {
        props: {
            pinjaman_id: index,
        },
    };
}
