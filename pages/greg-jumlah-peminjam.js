import axios from "axios";
import { getCookie, urlbase } from "@/hooks/Cookies";
import MyResponsiveLine from "../components/Chart/LineChart";
import { useState, useEffect } from "react";

export default function GregJumlahPeminjam() {
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

    return (
        <section className="ksu-wrapper no-padding">
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
                    <MyResponsiveLine
                        title={"Laporan Jumlah"}
                        subtitle={"12 Bulan Terakhir"}
                        legend_x={"Bulan-Tahun"}
                        legend_y={"Jumlah"}
                        data={chartInput}
                        colorSet={"category10"}
                    />
                </div>
            </section>
        </section>
    );
}
