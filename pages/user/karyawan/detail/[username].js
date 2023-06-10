import { getCookie, urlbase } from "@/hooks/Cookies";
import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Loader from "@/components/Loader/Loader";

import axios from "axios";

const label1 = [
    {
        label: "Username",
        name: "username",
        require: "disabled",
    },
    {
        label: "Nama Karyawan",
        name: "name",
        require: "",
    },
    {
        label: "NIK",
        name: "nik",
        require: "disabled",
    },

    {
        label: "Tempat Tanggal Lahir",
        name: "tempatTanggalLahir",
        require: "",
    },
];

export default function DetailAnggota({ karyawan_username }) {
    const [mockupData, setKaryawan] = useState();
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/user/staff/" + karyawan_username, {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                // console.log(response);
                setKaryawan(response.data);
                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (loadingPage || mockupData == undefined) {
        return <Loader height={"full"} />;
    } else {
        return (
            <section className="ksu-wrapper form center">
                <h1>Detail Karyawan - {mockupData.username}</h1>

                <div className="ksu-card full-width gap">
                    <h2></h2>
                    <div className="space-between align-start">
                        

                        <div className="inner-card right">
                            {label1.map((item, index) => (
                                <div key={index}>
                                    <p>
                                        <strong>{item.label}</strong>
                                    </p>
                                    <p>{mockupData[item.name]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-between end"></div>
            </section>
        );
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(urlbase() + "/api/v2/listall/karyawan");
    const data = await res.json();

    console.log("data");
    console.log(data);
    const paths = data.map((item) => {
        return {
            params: { username: item.toString() },
        };
    });
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const username = context.params.username;
    return {
        props: {
            karyawan_username: username,
        },
    };
};
