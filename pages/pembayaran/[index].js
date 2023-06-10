import { useEffect, useState, useRef } from "react";
import { getCookie, urlbase } from "@/hooks/Cookies";
import Loader from "@/components/Loader/Loader";
import Table from "@/components/Table";
import { reformatDate } from "@/hooks/GeneralFunction";
import axios from "axios";
import Link from "next/link";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const headers = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Tanggal Upload",
        accessor: "tanggalUpload",
    },
    {
        Header: "Jenis Pembayaran",
        accessor: "jenisPembayaran",
    },
    {
        Header: "Status",
        accessor: "statusPembayaran",
    },
    // {
    //     Header: "Aksi",
    //     accessor: "",
    // },
];

export default function Pembayaran({pinjaman_id}) {
    const [loadingPage, setLoadingPage] = useState(true);
    const [pinjaman, setPinjaman] = useState();
    const [listPembayaran, setListPembayaran] = useState();
    const [tagihan, setTagihan] = useState();

    const userRole = getCookie('role');

    let tanggalJatuhTempo = "";

    // buat pinjaman
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

    // buat viewall pembayaran pinjaman itu
    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/pembayaran/viewallbypinjaman/" + pinjaman_id, {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                console.log(response);
                setListPembayaran(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // handle reformatting jatuh tempo
    function handleJatuhTempo(pinjaman) {
        tanggalJatuhTempo = reformatDate(pinjaman.tanggalJatuhTempo);
    }
    
    if (loadingPage || pinjaman == undefined) {
        return <Loader height={"full"} />;
    } else {
        return(
            <section className="ksu-wrapper">
                <h1>Daftar Pembayaran</h1>
                <div className="ksu-card full-width">
                    <div className="space-between">
                        <h2>Pembayaran untuk Pinjaman {pinjaman.id} - {pinjaman.jenisPinjaman}</h2>
                        
                        {handleJatuhTempo(pinjaman)}
                        <h2>Jatuh Tempo: {tanggalJatuhTempo}</h2>
                
                        {userRole == "ANGGOTA" && (
                            <Link
                                href={`/pembayaran/upload/${pinjaman.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    disableElevation
                                >
                                    Add Pembayaran
                                </Button>
                            </Link>
                        )}
                    </div>
                    {listPembayaran ? (
                        <Table
                            headers={headers}
                            datas={listPembayaran}
                            hrefWebsite={"../pembayaran/detail"}
                            hrefApi={"../"}
                            update
                        />
                    ) : (
                        <></>
                    )}
                {console.log(listPembayaran)}
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
