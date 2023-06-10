import Head from "next/head";
import Image from "next/image";
import LayoutMotion from "../components/Layout/LayoutMotion";
import GregJumlahPeminjam from "./greg-jumlah-peminjam";
import { ButtonGroup, Button } from "@mui/material";
import MyResponsiveLine from "../components/Chart/LineChart";
import MyResponsivePie from "../components/Chart/PieChart";
import StatusCardDetail from "@/components/StatusCardDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie, urlbase } from "@/hooks/Cookies";
import GregVolumePeminjam from "./greg-volume-pinjaman";
import BoyPinjamanTerlambat from "./boy";
import { useRouter } from "next/router";
import GregDanBoy from "./greg-dan-boy";

export default function Home() {
    // local variable
    const [titleChartLine, setTitleChartLine] = useState(
        "Laporan Jumlah Peminjam Per Bulan"
    );
    const [subtitleChartLine, setSubtitleChartLine] =
        useState("12 Bulan Terakhir");
    const [legend_x, setLegend_x] = useState("Bulan-Tahun");
    const [legend_y, setLegend_y] = useState("Jumlah Peminjam");

    const router = useRouter();
    useEffect(() => {
        if (getCookie("role") == "ANGGOTA") {
            router.push("/pinjaman");
        }
    }, []);

    // punay greg jumlah peminjam
    const [result, setResult] = useState([]);
    useEffect(() => {
        axios
            .get(`${urlbase()}/api/v1/anggota/jumlah-peminjam-chart`, {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                console.log(response.data);
                setResult(response.data);
            });
    }, []);
    const chartInput = [
        {
            id: "Jumlah Peminjam",
            color: "hsla(242, 100%, 68%, 1)",
            data: [
                {
                    x: result.at(0),
                    y: result.at(1),
                },
                {
                    x: result.at(2),
                    y: result.at(3),
                },
                {
                    x: result.at(4),
                    y: result.at(5),
                },
                {
                    x: result.at(6),
                    y: result.at(7),
                },
                {
                    x: result.at(8),
                    y: result.at(9),
                },
                {
                    x: result.at(10),
                    y: result.at(11),
                },
                {
                    x: result.at(12),
                    y: result.at(13),
                },
                {
                    x: result.at(14),
                    y: result.at(15),
                },
                {
                    x: result.at(16),
                    y: result.at(17),
                },
                {
                    x: result.at(18),
                    y: result.at(19),
                },
                {
                    x: result.at(20),
                    y: result.at(21),
                },
                {
                    x: result.at(22),
                    y: result.at(23),
                },
                {
                    x: result.at(24),
                    y: result.at(25),
                },
            ],
        },
    ];
    // end of punya greg jumlah peminjam

    // start of  greg volume pinjaman
    const [result2, setResult2] = useState([]);
    useEffect(() => {
        axios
            .get(`${urlbase()}/api/v1/pinjaman/volume-pinjaman-chart`, {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                console.log(response.data);
                setResult2(response.data);
            });
    }, []);

    const chartInputVolumePinjaman = [
        {
            id: "Volume Pinjaman",
            color: "hsla(242, 100%, 68%, 1)",
            data: [
                {
                    x: result2.at(0),
                    y: result2.at(1),
                },
                {
                    x: result2.at(2),
                    y: result2.at(3),
                },
                {
                    x: result2.at(4),
                    y: result2.at(5),
                },
                {
                    x: result2.at(6),
                    y: result2.at(7),
                },
                {
                    x: result2.at(8),
                    y: result2.at(9),
                },
                {
                    x: result2.at(10),
                    y: result2.at(11),
                },
                {
                    x: result2.at(12),
                    y: result2.at(13),
                },
                {
                    x: result2.at(14),
                    y: result2.at(15),
                },
                {
                    x: result2.at(16),
                    y: result2.at(17),
                },
                {
                    x: result2.at(18),
                    y: result2.at(19),
                },
                {
                    x: result2.at(20),
                    y: result2.at(21),
                },
                {
                    x: result2.at(22),
                    y: result2.at(23),
                },
                {
                    x: result2.at(24),
                    y: result2.at(25),
                },
            ],
        },
    ];
    // end of punya greg volume pinjaman

    // local
    const [showGreg1, setShowGreg1] = useState(true);
    const [showGreg2, setShowGreg2] = useState(false);

    const [isJumlah, setIsJumlah] = useState(true);

    function setJumlah() {
        setIsJumlah(true);
    }
    function setVolume() {
        setIsJumlah(false);
    }
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <LayoutMotion>
                <section className="ksu-wrapper">
                    <div className="space-between">
                        <h1>Dashboard</h1>

                        <ButtonGroup
                            variant="text"
                            aria-label="text button group"
                        >
                            <Button onClick={setJumlah}>Jumlah</Button>
                            <Button onClick={setVolume}>Volume</Button>
                        </ButtonGroup>
                    </div>

                    <div
                        style={{
                            display: `${isJumlah ? "block" : "none"}`,
                        }}
                    >
                        <GregDanBoy />
                    </div>

                    {/* <GregVolumePeminjam /> */}
                    <div
                        style={{
                            display: `${!isJumlah ? "block" : "none"}`,
                        }}
                    >
                        <GregVolumePeminjam />
                    </div>
                </section>
                {/* <section className="home">
                    <img src="./logo-vertical.png" alt="KSU Srikandi Logo" />
                    <h1>This website is currently under construction</h1>
                    <h2>by C01 | PuterBalek Inc.</h2>
                </section> */}
                {/* <section className="ksu-wrapper">
                    <h1>Dashboard</h1>
                    <section
                        className="ksu-wrapper no-padding"
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <StatusCardDetail
                            title={"Volume Kredit Bulan Ini"}
                            value={"Ha Ho"}
                        />
                        <StatusCardDetail
                            title={"Kredit Aktif"}
                            value={"Ha Ho"}
                        />
                        <StatusCardDetail
                            title={"Kredit Terlambat"}
                            value={"Ha Ho"}
                        />
                        <StatusCardDetail
                            title={"Jumlah Peminjam"}
                            value={"Ha Ho"}
                        />
                    </section>
                    <section
                        className="ksu-wrapper no-padding"
                        style={{ flexDirection: "row" }}
                    >
                        <div
                            className="ksu-card"
                            style={{
                                height: "45vh",
                                width: "100%",
                                position: "relative",
                            }}
                        >
                            <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                                style={{
                                    position: "absolute",
                                    right: "0",
                                    top: "30px",
                                    marginRight: "20px",
                                }}
                            >
                                <Button onClick={funShowGreg1()}>
                                    Jumlah Peminjam
                                </Button>
                                <Button onClick={funShowGreg2()}>
                                    Volume Pinjaman
                                </Button>
                                <Button>Telat</Button>
                            </ButtonGroup>

                            <div
                                className="show-greg-1"
                                style={{
                                    height: "45vh",
                                    width: "100%",
                                    position: "relative",
                                    // display: showGreg1 ? "block" : "none",
                                }}
                            >
                                <MyResponsiveLine
                                    title={titleChartLine}
                                    subtitle={subtitleChartLine}
                                    legend_x={legend_x}
                                    legend_y={legend_y}
                                    data={chartInput}
                                />
                            </div>
                            <div
                                className="show-greg-2"
                                style={{
                                    height: "45vh",
                                    width: "100%",
                                    position: "relative",
                                    // display: showGreg2 ? "block" : "none",
                                }}
                            >
                                <MyResponsiveLine
                                    title={titleChartLine}
                                    subtitle={subtitleChartLine}
                                    legend_x={legend_x}
                                    legend_y={legend_y}
                                    data={chartInputVolumePinjaman}
                                />
                            </div>
                        </div>
                        <div
                            className="ksu-card"
                            style={{ height: "45vh", aspectRatio: "1/1" }}
                        >
                            <MyResponsivePie
                                title={"Laporan Volume Pinjaman"}
                                subtitle={"6 Bulan Terakhir"}
                                data={dataPie}
                            />
                        </div>
                    </section>
                </section> */}
            </LayoutMotion>
        </>
    );
}
