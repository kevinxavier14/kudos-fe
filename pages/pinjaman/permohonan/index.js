import Table from "@/components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useForm } from "react-hook-form";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { CheckBox } from "@mui/icons-material";
import Link from "next/link";
import { Button } from "@mui/material";
import { urlbase } from "@/hooks/Cookies";
import { getCookie } from "@/hooks/Cookies";
import AddIcon from "@mui/icons-material/Add";

const headers = [
    {
        Header: "Nama Anggota",
        accessor: "name",
    },
    {
        Header: "Tanggal Pengajuan",
        accessor: "tanggalPengajuan",
    },
    {
        Header: "Nominal Pengajuan",
        accessor: "nominalPengajuan",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    // {
    //     Header: "Aksi",
    //     accessor: "detail",
    // },
];

const headersAnggota = [
    {
        Header: "Nama Anggota",
        accessor: "name",
    },
    {
        Header: "Tanggal Pengajuan",
        accessor: "tanggalPengajuan",
    },
    {
        Header: "Nominal Pengajuan",
        accessor: "nominalPengajuan",
    },
    {
        Header: "Status",
        accessor: "status",
    },
]

export default function PinjamanPermohonan() {
    const [datas, setDatas] = useState();

    function handleButtonAddPengajuan() {
        if(getCookie("role") == "ADMIN" || getCookie("role") == "ANGGOTA" || getCookie("role") == "STAFF") {
            return(
                <Link
                    href={`/pinjaman/permohonan/form`}
                    style={{ textDecoration: "none" }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        disableElevation
                    >
                        Add Pengajuan Pinjaman
                    </Button>
                </Link>
            );
        }
    }

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/pengajuan-pinjaman/viewall", {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                console.log(response);
                setDatas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function handleTable() {
        if (getCookie('role') == "ANGGOTA") {
            return (
                <Table
                    headers={headersAnggota}
                    datas={datas}
                    hrefWebsite={"../pinjaman/permohonan"}
                    hrefApi={"../pengajuan-pinjaman"}
                    update
                />
            );
        } else {
            return (
                <Table
                headers={headers}
                datas={datas}
                hrefWebsite={"../pinjaman/permohonan"}
                hrefApi={"../pengajuan-pinjaman"}
                update
            /> 
            );
        }
    }

    return (
        <>
            <section className="ksu-wrapper">
                <h1>Semua Permohonan Pinjaman</h1>
                <div className="ksu-card full-width">
                    <div className="space-between">
                        <h2>Pengajuan Pinjaman Terbaru</h2>
                        {handleButtonAddPengajuan()}
                    </div>

                    {datas ? handleTable() : <></>}
                    {console.log(datas)}
                </div>
            </section>
        </>
    );
}
