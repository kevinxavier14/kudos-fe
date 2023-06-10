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

export default function PendaftaranAnggota() {
    const onSubmit = (data) => {
        setFinalAnswer(data);
    };

    const [feedbacksPopup, setFeedbacksPopup] = useState();
    const [loadingPage, setLoadingPage] = useState(true);
    const [mockupData, setKaryawan] = useState();

    const [finalAnswer, setFinalAnswer] = useState({
        username: "",
        name: "",
        nik: "",
        tempatTanggalLahir: "",
    });

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/user/staff/" + getCookie("username"), {
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
                });

                setLoadingPage(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

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
                        redirectTo={"/profile"}
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
                                        value={mockupData[item.name]}
                                        onFocus
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
