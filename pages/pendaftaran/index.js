import Table from "@/components/Table";
import axios from "axios";
import { useEffect, useState } from "react";

import Link from "next/link";

import { Button } from "@mui/material";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { getCookie, urlbase } from "@/hooks/Cookies";
import { useRouter } from "next/router";

import AddIcon from "@mui/icons-material/Add";
import LayoutMotion from "../../components/Layout/LayoutMotion";

const headers = [
    // {
    //     Header: "ID Pengajuan",
    //     accessor: "id",
    // },
    {
        Header: "Nama",
        accessor: "nama",
    },
    {
        Header: "Tanggal Pengajuan",
        accessor: "tanggalPengajuan",
    },
    {
        Header: "Status",
        accessor: "statusPengajuan",
    },
    // {
    //     Header: "Jenis Jaminan",
    //     accessor: "jenis_jaminan",
    // },
    // {
    //     Header: "Jumlah Pinjaman",
    //     accessor: "jumlah_pinjaman",
    // },
    // {
    //     Header: "Status",
    //     accessor: "status",
    // },
    {
        Header: "Aksi",
        accessor: "id",
    },
];

export default function ListAllPendaftaran() {
    const [datas, setDatas] = useState();

    const router = useRouter();

    useEffect(() => {
        axios
            .get(`${urlbase()}/api/v1/pengajuan-anggota/`, {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                // console.log(response);
                setDatas(response.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    // redirect to login page
                    router.push("/login");
                }
            });
    }, []);

    return (
        <LayoutMotion>
            <section className="ksu-wrapper">
                <h1>Semua Permohonan Pengajuan Anggota</h1>

                <div className="ksu-card full-width">
                    <div className="space-between">
                        <h2>Pengajuan Anggota Terbaru</h2>
                        <Link
                            href="../../pendaftaran/form"
                            style={{ textDecoration: "none" }}
                        >
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                disableElevation
                            >
                                Add Pengajuan Anggota
                            </Button>
                        </Link>
                    </div>
                    {datas ? (
                        <Table
                            headers={headers}
                            datas={datas}
                            hrefWebsite={"../pendaftaran"}
                            hrefApi={"pengajuan-anggota"}
                        />
                    ) : (
                        <></>
                    )}
                    {console.log(datas)}
                </div>
            </section>
        </LayoutMotion>
    );
}
