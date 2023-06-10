import BulletProgress from "@/components/BulletProgress";
import Chips from "@/components/Chip";
import Table from "@/components/Table";

// import { useWindowSize } from "@/hooks/useWindowSize";
import { Button, ButtonGroup, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import mockupData from "../../data/mock-up-data-user.json";

import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
} from "@react-hook/window-size";
import axios from "axios";
import { getCookie, urlbase } from "@/hooks/Cookies";
import Link from "next/link";
import { useRouter } from "next/router";

import AddIcon from "@mui/icons-material/Add";

const headersKaryawan = [
    {
        Header: "Username",
        accessor: "username",
    },
    {
        Header: "Nama Karyawan",
        accessor: "name",
    },
    {
        Header: "NIK",
        accessor: "nik",
    },
    {
        Header: "Jabatan",
        accessor: "role",
    },
    {
        Header: "No. Pegawai",
        accessor: "noPegawai",
    },
    {
        Header: "Aksi User",
        accessor: "id",
    },
];

const headersAnggota = [
    {
        Header: "Username",
        accessor: "username",
    },
    {
        Header: "Nama Anggota",
        accessor: "name",
    },
    {
        Header: "NIK",
        accessor: "nik",
    },
    {
        Header: "No. Telpon",
        accessor: "noTelpon",
    },
    {
        Header: "No. Anggota",
        accessor: "noAnggota",
    },
    {
        Header: "Aksi User",
        accessor: "id",
    },
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
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [datas, setDatas] = useState();
    const [datas2, setDatas2] = useState();
    const [mockupDatas, setMockupDatas] = useState();
    const router = useRouter();

    const onlyWidth = useWindowWidth();
    const isMobile = onlyWidth < 800;
    console.log(isMobile);

    // useEffect(() => {
    //     GetTypicode();
    // }, []);

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/user/staff/viewall", {
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
        // setDatas(GetAllPengajuanAnggota());
    }, []);

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/user/anggota/viewall", {
                headers: {
                    Authorization: getCookie("token"),
                },
            })

            .then((response) => {
                // console.log(response);
                setDatas2(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        // setDatas(GetAllPengajuanAnggota());
    }, []);

    function handleHeaders() {
        if (isMobile) {
            return headersMobile;
        } else {
            return headers;
        }
    }
    function HandleTableKaryawan() {
        // if (isMobile) {
        //     return <Table headers={headersMobile} datas={mockupData} />;
        // } else {
        //     return <Table headers={headers} datas={mockupData} />;
        console.log(datas);
        console.log(getCookie("username"));
        // }
        if (datas != undefined) {
            return (
                <Table
                    headers={headersKaryawan}
                    datas={datas}
                    hrefWebsite={"../user/karyawan"}
                    hrefApi={"../api/v1/user"}
                    isAksiUser
                />
            );
        }

        return;
    }

    function HandleTableAnggota() {
        console.log(datas);
        // }
        if (datas != undefined) {
            return (
                <Table
                    headers={headersAnggota}
                    datas={datas2}
                    hrefWebsite={"../user/anggota"}
                    hrefApi={"../api/v1/user"}
                    isAksiUser
                />
            );
        }

        return <Table headers={headersAnggota} datas={mockupData} />;
    }

    return (
        <>
            <Head></Head>

            <section className="ksu-wrapper">
                <h1>Manage User</h1>

                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Karyawan" value="1" />
                                <Tab label="Anggota" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className="ksu-card">
                                <div className="space-between">
                                    <h3>Daftar Karyawan</h3>
                                    <Link
                                        href="/user/karyawan/add"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            variant="outlined"
                                            startIcon={<AddIcon />}
                                            disableElevation
                                        >
                                            Add Karyawan
                                        </Button>
                                    </Link>
                                </div>

                                {/* <Table headers={headers} datas={mockupData} /> */}
                                {/* <Table headers={headersMobile} datas={mockupData} /> */}
                                {HandleTableKaryawan()}
                                {/* {console.log(datas)} */}
                                {/* {!isMobile ? (
                            <Table headers={headers} datas={mockupData} />
                        ) : (
                            <Table headers={headersMobile} datas={mockupData} />
                        )} */}
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className="ksu-card">
                                <div className="space-between">
                                    <h3>Daftar Anggota</h3>
                                    <Link
                                        href="/user/anggota/add"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            variant="outlined"
                                            startIcon={<AddIcon />}
                                            disableElevation
                                        >
                                            Add Anggota
                                        </Button>
                                    </Link>
                                </div>

                                {/* <Table headers={headers} datas={mockupData} /> */}
                                {/* <Table headers={headersMobile} datas={mockupData} /> */}
                                {HandleTableAnggota()}
                                {/* {!isMobile ? (
                                <Table headers={headers} datas={mockupData} />
                            ) : (
                                <Table headers={headersMobile} datas={mockupData} />
                            )} */}
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </section>
        </>
    );
}
