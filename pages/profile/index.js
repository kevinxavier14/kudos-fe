import BulletProgress from "@/components/BulletProgress";
import { Button, TextField } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useEffect, useState } from "react";
import KSUDropzone from "@/components/KSUDropzone";
import { useForm } from "react-hook-form";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SyncIcon from "@mui/icons-material/Sync";

import axios from "axios";
import FeedbacksPopup from "@/components/FeedbacksPopup";
import { headers } from "@/next.config";
import { getCookie, urlbase } from "@/hooks/Cookies";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";

const labelKaryawan = [
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
        if (getCookie("role") == "ANGGOTA") {
            axios
                .get(
                    urlbase() + "/api/v1/user/anggota/" + getCookie("username"),
                    {
                        headers: {
                            Authorization: getCookie("token"),
                        },
                    }
                )
                .then((response) => {
                    // console.log(response);
                    setKaryawan(response.data);
                    setLoadingPage(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios
                .get(
                    urlbase() + "/api/v1/user/staff/" + getCookie("username"),
                    {
                        headers: {
                            Authorization: getCookie("token"),
                        },
                    }
                )
                .then((response) => {
                    // console.log(response);
                    setKaryawan(response.data);
                    setLoadingPage(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    if (loadingPage || mockupData == undefined) {
        return <Loader height={"full"} />;
    } else {
        if (getCookie("role") == "ANGGOTA") {
            return (
                <section className="ksu-wrapper form center">
                    <h1>Detail Anggota - {mockupData.username}</h1>

                    <div className="ksu-card full-width gap">
                        <h2></h2>
                        <div className="space-between align-start">
                            <div className="inner-card left">
                                <div className="image-wrapper-details">
                                    {/* nanti di isi sama image poto orangnya */}
                                    {/* {true ? (
                                        <img
                                            src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
                                            alt="person-image"
                                        />
                                    ) : (
                                        <img
                                            src="https://i.stack.imgur.com/l60Hf.png"
                                            alt="default-pp-image"
                                        />
                                    )} */}
                                    <div className="name-wrapper">
                                        <p>
                                            <strong>{mockupData.name}</strong>
                                        </p>
                                        <p>{mockupData.id}</p>
                                    </div>
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

                        <div className="space-between end">
                            <Link
                                href={`profile/anggota/edit`}
                                style={{ textDecoration: "none" }}
                            >
                                <Button>
                                    Update&nbsp;
                                    <SyncIcon />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            );
        } else {
            return (
                <section className="ksu-wrapper form center">
                    <h1>Detail Karyawan - {mockupData.username}</h1>

                    <div className="ksu-card full-width gap">
                        <h2></h2>
                        <div className="space-between align-start">
                            <div className="inner-card left">
                                {/* <div className="image-wrapper-details">

                                    {true ? (
                                        <img
                                            src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
                                            alt="person-image"
                                        />
                                    ) : (
                                        <img
                                            src="https://i.stack.imgur.com/l60Hf.png"
                                            alt="default-pp-image"
                                        />
                                    )}
                                    <div className="name-wrapper">
                                        <p>
                                            <strong>{mockupData.name}</strong>
                                        </p>
                                        <p>{mockupData.id}</p>
                                    </div>
                                </div> */}

                                {labelKaryawan.map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>{mockupData[item.name]}</p>
                                    </div>
                                ))}
                            </div>

                            {/* <div className="inner-card right">
                                {labelKaryawan.map((item, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{item.label}</strong>
                                        </p>
                                        <p>{mockupData[item.name]}</p>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                        <div className="space-between end">
                            <Link
                                href={`profile/karyawan/edit`}
                                style={{ textDecoration: "none" }}
                            >
                                <Button>
                                    Update&nbsp;
                                    <SyncIcon />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            );
        }
    }
}
