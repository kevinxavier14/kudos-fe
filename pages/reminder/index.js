import Table from "@/components/Table";
import { useEffect, useState } from "react";
import { getCookie, urlbase } from "@/hooks/Cookies";
import axios from "axios";
import Head from "next/head";
import LayoutMotion from "../../components/Layout/LayoutMotion";
// import { urlbase } from "../../hooks/Cookies";

const headers = [
    {
        Header: "Nama Anggota",
        accessor: "name",
    },
    {
        Header: "Nominal Pinjaman",
        accessor: "nominalPinjaman",
    },
    {
        Header: "Kredit Aktif",
        accessor: "kreditAktif",
    },
    {
        Header: "Deadline",
        accessor: "deadline",
    },
    {
        Header: "Denda",
        accessor: "denda",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Aksi Reminder",
        accessor: "id",
    },
];

const headersAnggota = [
    {
        Header: "Nama Anggota",
        accessor: "name",
    },
    {
        Header: "Nominal Pinjaman",
        accessor: "nominalPinjaman",
    },
    {
        Header: "Kredit Aktif",
        accessor: "kreditAktif",
    },
    {
        Header: "Deadline",
        accessor: "deadline",
    },
    {
        Header: "Denda",
        accessor: "denda",
    },
    {
        Header: "Status",
        accessor: "status",
    },
];

export default function Reminder() {
    const [datas, setDatas] = useState();

    useEffect(() => {
        axios
            .get(urlbase()+"/api/v1/reminder/viewall", {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                setDatas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function handleTable() {
        if (getCookie("role") == "ANGGOTA") {
            return (
                <Table
                    headers={headersAnggota}
                    datas={datas}
                    hrefWebsite={"../pinjaman"}
                    hrefApi={"../reminder"}
                />
            );
        } else {
            return (
                <Table
                    headers={headers}
                    datas={datas}
                    hrefWebsite={"../pinjaman"}
                    hrefApi={"../reminder"}
                />
            );
        }
    }

    return (
        <LayoutMotion>
            <section className="ksu-wrapper">
                <h1>Reminder Pinjaman</h1>
                <div className="ksu-card full-width">
                    <h2>List Pinjaman</h2>
                    {datas ? handleTable() : <></>}
                    {console.log(datas)}
                </div>
            </section>
        </LayoutMotion>
    );
}
