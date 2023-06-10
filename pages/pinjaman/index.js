import Table from "@/components/Table";

// import { useWindowSize } from "@/hooks/useWindowSize";
import { Button, ButtonGroup, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { reformatNominal } from "../../hooks/GeneralFunction";
import Head from "next/head";
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
import {
    BasicColumnFilter,
    DateColumnFilter,
    NumberRangeColumnFilter,
    SelectColumnFilter,
} from "../../components/ColumnFilter";

const headers1 = [
    {
        Header: "Anggota",
        accessor: "anggota.name",
    },
    {
        Header: "Tanggal Jatuh Tempo",
        accessor: "tanggalJatuhTempo",
        // Filter: DateColumnFilter,
    },
    {
        Header: "Nominal Pinjaman",
        accessor: "nominalPinjaman",
        // Filter: NumberRangeColumnFilter,
        // filter: "between",
    },
    {
        Header: "Status",
        accessor: "statusPinjaman",
        // Filter: SelectColumnFilter,
    },
    {
        Header: "Jenis Pinjaman",
        accessor: "jenisPinjaman",
        // Filter: SelectColumnFilter,
    },
];

export default function Components() {
    let currRole = 1;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // original pinjaman datas
    const [datas0, setDatas0] = useState();
    const [datas, setDatas] = useState();
    const [datas2, setDatas2] = useState();
    const [datas3, setDatas3] = useState();

    // reformatted pinjaman datas
    const [reformattedDatas0, setReformattedDatas0] = useState();
    const [reformattedDatas, setReformattedDatas] = useState();
    const [reformattedDatas2, setReformattedDatas2] = useState();
    const [reformattedDatas3, setReformattedDatas3] = useState();

    const [mockupDatas, setMockupDatas] = useState();
    const router = useRouter();

    const onlyWidth = useWindowWidth();
    const isMobile = onlyWidth < 800;

    // Buat Yang Belum Cair
    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/pinjaman/viewall/belum-cair", {
                headers: {
                    Authorization: getCookie("token"),
                },
            })

            .then((response) => {
                setDatas0(response.data);
                let responseClone = JSON.parse(JSON.stringify(response));

                responseClone.data.forEach((pinjaman) => {
                    pinjaman.nominalPinjaman = reformatNominal(pinjaman.nominalPinjaman);
                });

                console.log(responseClone.data);
                setReformattedDatas0(responseClone.data)
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    router.push("/login");
                }
            });
    }, []);
    // Buat Yang Aktif
    useEffect(() => {
        // console.log(getCookie("token"));
        axios
            .get(urlbase() + "/api/v1/pinjaman/viewall/aktif", {
                headers: {
                    Authorization: getCookie("token"),
                },
            })

            .then((response) => {
                setDatas(response.data);
                let responseClone = JSON.parse(JSON.stringify(response));

                responseClone.data.forEach((pinjaman) => {
                    pinjaman.nominalPinjaman = reformatNominal(pinjaman.nominalPinjaman);
                });

                console.log(responseClone.data);
                setReformattedDatas(responseClone.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    router.push("/login");
                }
            });
    }, []);

    //Buat Yang History
    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/pinjaman/viewall/history", {
                headers: {
                    Authorization: getCookie("token"),
                },
            })

            .then((response) => {
                // console.log(response);
                setDatas2(response.data);
                let responseClone = JSON.parse(JSON.stringify(response));

                responseClone.data.forEach((pinjaman) => {
                    pinjaman.nominalPinjaman = reformatNominal(pinjaman.nominalPinjaman);
                });

                console.log(responseClone.data);
                setReformattedDatas2(responseClone.data);
            })
            .catch((error) => {
                console.error(error);
            });

        // setDatas(GetAllPengajuanAnggota());
    }, []);

    // Buat yang terlambat
    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/pinjaman/viewall/terlambat", {
                headers: {
                    Authorization: getCookie("token"),
                },
            })

            .then((response) => {
                // console.log(response);
                setDatas3(response.data);
                let responseClone = JSON.parse(JSON.stringify(response));

                responseClone.data.forEach((pinjaman) => {
                    pinjaman.nominalPinjaman = reformatNominal(pinjaman.nominalPinjaman);
                });

                console.log(responseClone.data);
                setReformattedDatas3(responseClone.data);
            })
            .catch((error) => {
                console.error(error);
            });

        // setDatas(GetAllPengajuanAnggota());
    }, []);

    const [pagePoint, setPagePoint] = useState(currRole);

    const [value, setValue] = React.useState("1");

    function handleHeaders() {
        if (isMobile) {
            return headersMobile;
        } else {
            return headers;
        }
    }
    function HandleTableBelumCair() {
        if (datas != undefined) {
            {
                console.log(datas);
            }
            return (
                <Table
                    headers={headers1}
                    datas={reformattedDatas0}
                    hrefWebsite={"../pinjaman"}
                    hrefApi={"../api/v1/user"}
                />
            );
        }

        return;
    }
    function HandleTableAktif() {
        if (datas != undefined) {
            {
                console.log(datas);
            }
            return (
                <Table
                    headers={headers1}
                    datas={reformattedDatas}
                    hrefWebsite={"../pinjaman"}
                    hrefApi={"../api/v1/user"}
                />
            );
        }

        return;
    }

    function HandleTableHistory() {
        if (datas != undefined) {
            return (
                <Table
                    headers={headers1}
                    datas={reformattedDatas2}
                    hrefWebsite={"../pinjaman"}
                    hrefApi={"../api/v1/user"}
                />
            );
        }

        return;
    }

    function HandleTableTerlambat() {
        if (datas != undefined) {
            return (
                <Table
                    headers={headers1}
                    datas={reformattedDatas3}
                    hrefWebsite={"../pinjaman"}
                    hrefApi={"../api/v1/user"}
                />
            );
        }

        return;
    }

    switch (pagePoint) {
        case 1:
            return (
                <>
                    <Head></Head>

                    <section className="ksu-wrapper">
                        <h1>List Pinjaman</h1>

                        <Box sx={{ width: "100%", typography: "body1" }}>
                            <TabContext value={value}>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: "divider",
                                    }}
                                >
                                    <TabList
                                        onChange={handleChange}
                                        aria-label="lab API tabs example"
                                    >
                                        <Tab label="Aktif" value="1" />
                                        <Tab label="Belum Cair" value="0" />
                                        <Tab label="Bermasalah" value="2" />
                                        <Tab label="History" value="3" />
                                    </TabList>
                                </Box>

                                <TabPanel value="1">
                                    <div className="ksu-card">
                                        <div className="space-between">
                                            <h3>Daftar Pinjaman Aktif</h3>
                                        </div>

                                        {HandleTableAktif()}
                                    </div>
                                </TabPanel>
                                <TabPanel value="0">
                                    <div className="ksu-card">
                                        <div className="space-between">
                                            <h3>Daftar Pinjaman Belum Cair</h3>
                                        </div>

                                        {HandleTableBelumCair()}
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div className="ksu-card">
                                        <div className="space-between">
                                            <h3>Daftar History Pinjaman</h3>
                                            {/* <Link href="/user/anggota/add" style={{textDecoration: "none"}}>
                                                <Button
                                                    variant="contained"
                                                    disableElevation
                                                    fullWidth={true}
                                                >
                                                    Add Anggota
                                                </Button>
                                            </Link> */}
                                        </div>

                                        {HandleTableHistory()}
                                    </div>
                                </TabPanel>

                                <TabPanel value="3">
                                    <div className="ksu-card">
                                        <div className="space-between">
                                            <h3>Daftar History Pinjaman</h3>
                                            {/* <Link href="/user/anggota/add" style={{textDecoration: "none"}}>
                                                <Button
                                                    variant="contained"
                                                    disableElevation
                                                    fullWidth={true}
                                                >
                                                    Add Anggota
                                                </Button>
                                            </Link> */}
                                        </div>

                                        {HandleTableTerlambat()}
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </section>
                </>
            );

        case 2:
            return (
                <>
                    <Head></Head>

                    <section className="ksu-wrapper">
                        <h1>List Pinjaman</h1>

                        <div className="ksu-card">
                            <div className="space-between">
                                <h3>Daftar Pinjaman Aktif</h3>
                                {/* <Link href="/user/karyawan/add" style={{textDecoration: "none"}}>
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            fullWidth={true}
                                        >
                                            Add Karyawan
                                        </Button>
                                    </Link> */}
                            </div>

                            {HandleTableHistory()}
                        </div>
                    </section>
                </>
            );
    }
}
