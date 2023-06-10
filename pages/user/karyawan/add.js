import BulletProgress from "@/components/BulletProgress";
import { Button, TextField } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useEffect, useState } from "react";
import KSUDropzone from "@/components/KSUDropzone";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getCookie, urlbase } from "@/hooks/Cookies";
import { useRouter } from "next/router";

const label1 = [
    {
        label: "Nama Karyawan",
        name: "name",
    },
    {
        label: "NIK",
        name: "nik",
    },
    {
        label: "Tempat  Lahir",
        name: "tempatLahir",
    },
    {
        label: "Tanggal Lahir",
        name: "tanggalLahir",
    },
    {
        label: "Role",
        name: "role",
    },
];

export default function PendaftaranAnggota() {
    const router = useRouter();

    const [finalAnswer, setFinalAnswer] = useState({});
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setFinalAnswer(data);
    };

    function onPostToSpring() {
        try {
            const response = axios
                .post(`${urlbase()}/api/v1/user/staff/add`, finalAnswer, {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                })
                .then((response) => {
                    console.log(response);
                    router.push("/user");
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="ksu-wrapper form center">
            <div className="ksu-card full-width gap">
                <h2>Pembuatan Akun</h2>
                <div className="ksu-input-text-field">
                    <p>Username</p>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        onChange={(e) =>
                            setFinalAnswer({
                                ...finalAnswer,
                                username: e.target.value,
                            })
                        }
                        {...register("username")}
                    />

                    {/* {console.log(finalAnswer)} */}
                </div>
                <div className="ksu-input-text-field">
                    <p>Password</p>
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        onChange={(e) =>
                            setFinalAnswer({
                                ...finalAnswer,
                                password: e.target.value,
                            })
                        }
                        {...register("password")}
                    />

                    {/* {console.log(finalAnswer)} */}
                </div>
            </div>

            <div className="ksu-card full-width gap">
                <h2>Tambah Karyawan</h2>
                <form
                    onBlur={handleSubmit(onSubmit)}
                    className="ksu-card full-width gap"
                >
                    {label1?.map((item, index) => (
                        <div key={index} className="ksu-input-text-field">
                            <p>{item.label}</p>
                            {item.name == "tanggalLahir" ? (
                                <input
                                    style={{
                                        width: "98%",
                                        height: "100%",
                                    }}
                                    className="input-date"
                                    type="date"
                                    onChange={(e) =>
                                        setFinalAnswer({
                                            ...finalAnswer,
                                            [item.name]: e.target.value,
                                        })
                                    }
                                    {...register(item.name, {
                                        valueAsDate: true,
                                    })}
                                />
                            ) : (
                                <TextField
                                    id="outlined-basic"
                                    label={item.label}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) =>
                                        setFinalAnswer({
                                            ...finalAnswer,
                                            [item.name]: e.target.value,
                                        })
                                    }
                                    {...register(item.name)}
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
                    onClick={() => onPostToSpring()}
                >
                    Submit
                </Button>
            </div>
        </section>
    );
}
