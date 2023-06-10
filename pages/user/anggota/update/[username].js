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
    const [feedbacksPopup, setFeedbacksPopup] = useState();

    const [loadingPage, setLoadingPage] = useState(true);

    const [mockupData, setKaryawan] = useState();

    const [finalAnswer, setFinalAnswer] = useState({
        username: "",
        name: "",
        nik: "",
        tempatTanggalLahir: "",
        alamatAhliWaris: "",
        noTelponAhliWaris: "",
        namaAhliWaris: "",
        alamat: "",
        statusMartial: "",
        pekerjaan: "",
        noTelpon: "",
        namaIbu: "",
        agama: "",
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setFinalAnswer(data);
    };

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
                setFinalAnswer({
                    username: response.data.username,
                    name: response.data.name,
                    nik: response.data.nik,
                    tempatTanggalLahir: response.data.tempatTanggalLahir,
                    alamatAhliWaris: response.data.alamatAhliWaris,
                    noTelponAhliWaris: response.data.noTelponAhliWaris,
                    namaAhliWaris: response.data.namaAhliWaris,
                    alamat: response.data.alamat,
                    statusMartial: response.data.statusMartial,
                    pekerjaan: response.data.pekerjaan,
                    noTelpon: response.data.noTelpon,
                    namaIbu: response.data.namaIbu,
                    agama: response.data.agama,
                });

                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function onPostToSpring() {
        axios
            .post(
                `${urlbase()}/api/v1/user/${mockupData.role.toLowerCase()}/update`,
                finalAnswer,
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
                setFeedbacksPopup(response);
            })
            .catch((error) => {
                console.error(error);
                setFeedbacksPopup(error);
            });
    }

    if (loadingPage || mockupData == undefined) {
        return <Loader height={"full"} />;
    } else {
        return (
            <section className="ksu-wrapper form center">
                {feedbacksPopup ? (
                    <FeedbacksPopup
                        setFeedbacks={feedbacksPopup}
                        redirectTo={"/user"}
                    />
                ) : (
                    <></>
                )}
                <h1>Update Karyawan</h1>

                <div className="ksu-card full-width gap">
                    <h2>Update Karyawan</h2>

                    <form className="ksu-card full-width gap">
                        {label1?.map((item, index) => (
                            <div key={index} className="ksu-input-text-field">
                                <p>{item.label}</p>
                                {item.require ? (
                                    <TextField
                                        id="outlined-basic"
                                        label={item.label}
                                        variant="outlined"
                                        fullWidth
                                        rows={item.rows ? item.rows : 0}
                                        multiline
                                        defaultValue={mockupData[item.name]}
                                        disabled
                                        onBlur={(e) => {
                                            setFinalAnswer((prevState) => ({
                                                ...prevState,
                                                [item.name]: e.target.value,
                                            }));
                                        }}
                                    />
                                ) : (
                                    <TextField
                                        id="outlined-basic"
                                        label={item.label}
                                        variant="outlined"
                                        fullWidth
                                        defaultValue={mockupData[item.name]}
                                        onBlur={(e) => {
                                            setFinalAnswer((prevState) => ({
                                                ...prevState,
                                                [item.name]: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </form>
                    {console.log(finalAnswer)}
                </div>
                <div className="space-between end">
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={() => {
                            onPostToSpring();
                        }}
                    >
                        Submit
                    </Button>
                </div>
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
