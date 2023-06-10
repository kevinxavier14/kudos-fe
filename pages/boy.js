import { useEffect, useState } from "react";
import MyResponsiveLine from "../components/Chart/LineChart";
import axios from "axios";
import { urlbase } from "@/hooks/Cookies";
import { getCookie } from "@/hooks/Cookies";

export default function BoyPinjamanTerlambat() {
    const [jsonResponse, setDatas] = useState();

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/pinjaman/terlambat-chart", {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                console.log(response);
                setDatas(response.data.reverse());
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    let data = [];

    if (Array.isArray(jsonResponse)) {
        data = [
            {
                id: "NPL",
                color: "hsla(242, 100%, 68%, 1)",
                data: jsonResponse.map((item) => ({
                    x: item.bulan,
                    y: item.jumlah,
                })),
            },
        ];
    }

    console.log("Data: ");
    console.log(data);

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
                        title={"Volume Kredit Nunggak (NPL)"}
                        subtitle={"12 Bulan Terakhir"}
                        legend_x={"Tahun-Bulan"}
                        legend_y={"Jumlah"}
                        data={data}
                        colorSet={"dark2"}
                    />
                </div>
            </section>
        </section>
    );
}
