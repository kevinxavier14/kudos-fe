import { Button, ButtonGroup } from "@mui/material";
import MyResponsiveLine from "../components/Chart/LineChart";
import MyResponsivePie from "../components/Chart/PieChart";
import StatusCardDetail from "@/components/StatusCardDetail";

export default function ChartTest() {
    return (
        <section className="ksu-wrapper">
            <h1>Dashboard</h1>
            <section
                className="ksu-wrapper no-padding"
                style={{
                    flexDirection: "row",
                    // width: "100%",
                    // overflow: "auto",
                    // whiteSpace: "nowrap",
                    // padding: "2px",
                }}
            >
                <StatusCardDetail
                    title={"Volume Kredit Bulan Ini"}
                    value={"Ha Ho"}
                />
                <StatusCardDetail title={"Kredit Aktif"} value={"Ha Ho"} />
                <StatusCardDetail title={"Kredit Terlambat"} value={"Ha Ho"} />
                <StatusCardDetail title={"Jumlah Peminjam"} value={"Ha Ho"} />
                {/* <StatusCardDetail title={"Status Pengajuan"} value={"Ha Ho"} /> */}
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
                        <Button>Semua</Button>
                        <Button>Pinjaman</Button>
                        <Button>Telat</Button>
                    </ButtonGroup>
                    <MyResponsiveLine
                        title={"Laporan Volume Pinjaman"}
                        subtitle={"6 Bulan Terakhir"}
                        legend_x={"transportation"}
                        legend_y={"count"}
                        data={data}
                    />
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
        </section>
    );
}
const data = [
    {
        id: "japan",
        color: "hsl(119, 70%, 50%)",
        data: [
            {
                x: "plane",
                y: 280,
            },
            {
                x: "helicopter",
                y: 146,
            },
            {
                x: "boat",
                y: 282,
            },
            {
                x: "train",
                y: 2,
            },
            {
                x: "subway",
                y: 49,
            },
            {
                x: "bus",
                y: 228,
            },
            {
                x: "car",
                y: 6,
            },
            {
                x: "moto",
                y: 115,
            },
            {
                x: "bicycle",
                y: 67,
            },
            {
                x: "horse",
                y: 174,
            },
            {
                x: "skateboard",
                y: 293,
            },
            {
                x: "others",
                y: 255,
            },
        ],
    },
    {
        id: "france",
        color: "hsl(258, 70%, 50%)",
        data: [
            {
                x: "plane",
                y: 232,
            },
            {
                x: "helicopter",
                y: 238,
            },
            {
                x: "boat",
                y: 89,
            },
            {
                x: "train",
                y: 247,
            },
            {
                x: "subway",
                y: 156,
            },
            {
                x: "bus",
                y: 176,
            },
            {
                x: "car",
                y: 270,
            },
            {
                x: "moto",
                y: 237,
            },
            {
                x: "bicycle",
                y: 268,
            },
            {
                x: "horse",
                y: 2,
            },
            {
                x: "skateboard",
                y: 249,
            },
            {
                x: "others",
                y: 48,
            },
        ],
    },
    {
        id: "us",
        color: "hsl(79, 70%, 50%)",
        data: [
            {
                x: "plane",
                y: 179,
            },
            {
                x: "helicopter",
                y: 118,
            },
            {
                x: "boat",
                y: 3,
            },
            {
                x: "train",
                y: 80,
            },
            {
                x: "subway",
                y: 271,
            },
            {
                x: "bus",
                y: 99,
            },
            {
                x: "car",
                y: 218,
            },
            {
                x: "moto",
                y: 107,
            },
            {
                x: "bicycle",
                y: 8,
            },
            {
                x: "horse",
                y: 267,
            },
            {
                x: "skateboard",
                y: 90,
            },
            {
                x: "others",
                y: 261,
            },
        ],
    },
    {
        id: "germany",
        color: "hsl(81, 70%, 50%)",
        data: [
            {
                x: "plane",
                y: 0,
            },
            {
                x: "helicopter",
                y: 65,
            },
            {
                x: "boat",
                y: 195,
            },
            {
                x: "train",
                y: 286,
            },
            {
                x: "subway",
                y: 49,
            },
            {
                x: "bus",
                y: 261,
            },
            {
                x: "car",
                y: 173,
            },
            {
                x: "moto",
                y: 59,
            },
            {
                x: "bicycle",
                y: 9,
            },
            {
                x: "horse",
                y: 0,
            },
            {
                x: "skateboard",
                y: 157,
            },
            {
                x: "others",
                y: 219,
            },
        ],
    },
    {
        id: "norway",
        color: "hsl(36, 70%, 50%)",
        data: [
            {
                x: "plane",
                y: 206,
            },
            {
                x: "helicopter",
                y: 97,
            },
            {
                x: "boat",
                y: 177,
            },
            {
                x: "train",
                y: 25,
            },
            {
                x: "subway",
                y: 205,
            },
            {
                x: "bus",
                y: 226,
            },
            {
                x: "car",
                y: 258,
            },
            {
                x: "moto",
                y: 196,
            },
            {
                x: "bicycle",
                y: 42,
            },
            {
                x: "horse",
                y: 40,
            },
            {
                x: "skateboard",
                y: 159,
            },
            {
                x: "others",
                y: 7,
            },
        ],
    },
];
const dataPie = [
    {
        id: "hack",
        label: "hack",
        value: 35,
        color: "hsl(255, 70%, 50%)",
    },
    {
        id: "lisp",
        label: "lisp",
        value: 597,
        color: "hsl(135, 70%, 50%)",
    },
    {
        id: "c",
        label: "c",
        value: 426,
        color: "hsl(320, 70%, 50%)",
    },
    {
        id: "make",
        label: "make",
        value: 526,
        color: "hsl(193, 70%, 50%)",
    },
    {
        id: "go",
        label: "go",
        value: 345,
        color: "hsl(195, 70%, 50%)",
    },
];
