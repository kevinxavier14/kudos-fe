import BulletProgress from "@/components/BulletProgress";
import { Button, TextField } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useEffect, useState } from "react";
import KSUDropzone from "@/components/KSUDropzone";
import { useForm } from "react-hook-form";

import axios from "axios";
import FeedbacksPopup from "@/components/FeedbacksPopup";
import { headers } from "@/next.config";
import { getCookie, urlbase } from "@/hooks/Cookies";
import Loader from "@/components/Loader/Loader";

const label1 = [
    {
        label: "Nama Anggota",
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
    {
        label: "Agama",
        name: "agama",
        require: "",
    },
];

const label2 = [
    {
        label: "Nama Ibu Kandung",
        name: "namaIbu",
        require: "",
    },
    {
        label: "No. Telepon",
        name: "noTelpon",
        require: "",
    },
    {
        label: "Pekerjaan",
        name: "pekerjaan",
        require: "",
    },
    {
        label: "Status Marital",
        name: "statusMartial",
        require: "",
    },
    {
        label: "Alamat",
        rows: 4,
        name: "alamat",
        require: "",
    },
    {
        label: "Nama Ahli Waris",
        name: "namaAhliWaris",
        require: "",
    },
    {
        label: "No. Telepon Ahli Waris",
        name: "noTelponAhliWaris",
        require: "",
    },
    {
        label: "Alamat Ahli Waris",
        rows: 4,
        name: "alamatAhliWaris",
        require: "",
    },
];

export default function PendaftaranAnggota({ anggota_username }) {
    const [mockupData, setKaryawan] = useState();
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/user/anggota/" + anggota_username, {
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
                <h1>Detail Anggota - {mockupData.username}</h1>

                <div className="ksu-card full-width gap">
                    <h2></h2>
                    <div className="space-between align-start">
                        <div className="inner-card left">
                          
                            <div className="name-wrapper">
                                    <p>
                                        <strong>{mockupData.name}</strong>
                                    </p>
                                    <p>{mockupData.id}</p>
                                </div>

                            {label1.map((item, index) => (
                                <div key={index}>
                                    <p>
                                        <strong>{item.label}</strong>
                                    </p>
                                    <p>{mockupData[item.name]}</p>
                                </div>
                            ))}
                        </div>

                        <div className="inner-card right">
                            {label2.map((item, index) => (
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
    const res = await fetch(urlbase() + "/api/v2/listall/anggota");
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
            anggota_username: username,
        },
    };
};
