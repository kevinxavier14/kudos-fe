import BulletProgress from "@/components/BulletProgress";
import Chips from "@/components/Chip";
import Table from "@/components/Table";
// import { useWindowSize } from "@/hooks/useWindowSize";
import { Button, TextField } from "@mui/material";

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import mockupData from "../data/mock-data-ksu.json";

import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
} from "@react-hook/window-size";

const label = [
    {
        label: "Nama Anggota",
    },
    {
        label: "No. KTP",
    },
    {
        label: "Tempat Tanggal Lahir",
    },
    {
        label: "Nama Ibu Kandung",
    },
    {
        label: "No. Telepon",
    },
    {
        label: "Pekerjaan",
    },
    {
        label: "Agama",
    },
    {
        label: "Nama Ahli Waris",
    },
    {
        label: "No. Telepon Ahli Waris",
    },
    {
        label: "Alamat",
        rows: 4,
    },
];

const headers = [
    {
        Header: "ID Pengajuan",
        accessor: "id_pengajuan",
    },
    {
        Header: "Nama Anggota",
        accessor: "nama_anggota",
    },
    {
        Header: "Tanggal Pengajuan",
        accessor: "tanggal_pengajuan",
    },
    {
        Header: "Jenis Jaminan",
        accessor: "jenis_jaminan",
    },
    {
        Header: "Jumlah Pinjaman",
        accessor: "jumlah_pinjaman",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    // {
    //     Header: "Aksi",
    //     accessor: "id",
    // },
];
const headersMobile = [
    {
        Header: "Nama Anggota",
        accessor: "nama_anggota",
    },
    {
        Header: "Tanggal Pengajuan",
        accessor: "tanggal_pengajuan",
    },
    {
        Header: "Jumlah Pinjaman",
        accessor: "jumlah_pinjaman",
    },
    {
        Header: "Status",
        accessor: "status",
    },
];

export default function Components() {
    const [datas, setDatas] = useState();
    const [mockupDatas, setMockupDatas] = useState();
    async function GetTypicode() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => setDatas(data));
    }

    const onlyWidth = useWindowWidth();
    const isMobile = onlyWidth < 800;
    console.log(isMobile);

    useEffect(() => {
        GetTypicode();
    }, []);

    function handleHeaders() {
        if (isMobile) {
            return headersMobile;
        } else {
            return headers;
        }
    }
    function HandleTable() {
        // if (isMobile) {
        //     return <Table headers={headersMobile} datas={mockupData} />;
        // } else {
        //     return <Table headers={headers} datas={mockupData} />;
        // }
        return <Table headers={headers} datas={mockupData} />;
    }

    return (
        <>
            <Head></Head>
            <section className="ksu-wrapper form center ">
                <h2>Form Pendaftaran Anggota</h2>
                <BulletProgress
                    bulletDone={1}
                    jumlahBullet={3}
                    type="pendaftaran"
                />
                <div className="ksu-card full-width gap">
                    <h3>Pembuatan Akun</h3>
                    <div className="ksu-input-text-field">
                        <p>Username</p>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                </div>
                <div className="ksu-card full-width gap">
                    <h2>Data Permohonan Pendaftaran Anggota</h2>
                    {label?.map((item, index) => (
                        <div key={index} className="ksu-input-text-field">
                            <p>{item.label}</p>
                            {item.rows ? (
                                <TextField
                                    id="outlined-basic"
                                    label={item.label}
                                    variant="outlined"
                                    fullWidth
                                    rows={item.rows ? item.rows : 0}
                                    multiline
                                />
                            ) : (
                                <TextField
                                    id="outlined-basic"
                                    label={item.label}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        </div>
                    ))}
                </div>
                <Button variant="contained">Contained</Button>
            </section>
            <section className="ksu-wrapper">
                <h1>Test</h1>
                <div className="ksu-card">
                    <h1>Headline 1</h1>
                    <h2>Headline 2</h2>
                    <h3>Headline 3</h3>
                    <p>Paragraphs</p>
                    <small>SMALL</small>
                </div>

                <div className="ksu-card">
                    <Chips type="kendaraan"/>
                    <Chips type="sertifikat"/>
                    <Chips type="sehat"/>
                    <Chips type="telat"/>
                    <Chips type="macet"/>
                    <Chips type="ditinjau manajer"/>
                    <Chips type="dalam tahap survey"/>
                    <Chips type="menunggu konfirmasi"/>
                    <Chips type="diterima"/>
                    <Chips type="ditolak"/>
                </div>
                <div className="ksu-card"></div>
                <div className="ksu-card">
                    <BulletProgress
                        bulletDone={1}
                        jumlahBullet={7}
                        type={"pembayaran"}
                    />
                    {/* <BulletProgress bulletDone={1} type={"pendaftaran"} /> */}
                </div>
                <div className="ksu-card">
                    {/* <Table headers={headers} datas={mockupData} /> */}
                    {/* <Table headers={headersMobile} datas={mockupData} /> */}
                    {HandleTable()}
                    {/* {!isMobile ? (
                        <Table headers={headers} datas={mockupData} />
                    ) : (
                        <Table headers={headersMobile} datas={mockupData} />
                    )} */}
                </div>

                <h1>Typicodes</h1>
                {datas?.map((items, index) => (
                    <>
                        {/* full-width */}
                        <div className="ksu-card" key={index}>
                            <h2>{items.title}</h2>
                            <small>{items.id}</small>
                            <p>{items.body}</p>
                        </div>
                    </>
                ))}
            </section>
        </>
    );
}
