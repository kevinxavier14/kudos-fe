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
];

const label2 = [
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

const labelPassword = [
    {
        label: "Username",
        name: "username",
        require: "",
    },
    {
        label: "Password",
        name: "password",
        require: "",
    },
];

export default function PendaftaranAnggota() {
    const router = useRouter();

    const [finalAnswer, setFinalAnswer] = useState({
        // nama_anggota: "",
        // no_ktp: "",
        // tempat_tanggal_lahir: "",
        // nama_ibu_kandung: "",
        // no_telp: "",
        // pekerjaan: "",
        // agama: "",
        // nama_ahli_waris: "",
        // no_telp_ahli_waris: "",
        // alamat: "",
        // foto_ktp: "",
        // foto_diri: "",
    });

    useEffect(() => {
        localStorage.setItem("role", "meong");
    }, []);

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
                .post(`${urlbase()}/api/v1/user/anggota/add`, finalAnswer, {
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
            <h1>Tambah Anggota</h1>

            <div className="ksu-card full-width gap">
                <h2>Data Akun</h2>
                <form
                    onBlur={handleSubmit(onSubmit)}
                    className="ksu-card full-width gap"
                >
                    {labelPassword?.map((item, index) => (
                        <div key={index} className="ksu-input-text-field">
                            <p>{item.label}</p>
                            {item.rows ? (
                                <TextField
                                    id="outlined-basic"
                                    label={item.label}
                                    variant="outlined"
                                    fullWidth
                                    rows={item.rows ? item.rows : 0}
                                    multiline
                                    onChange={(e) =>
                                        setFinalAnswer({
                                            ...finalAnswer,
                                            [item.name]: e.target.value,
                                        })
                                    }
                                    {...register(item.name)}
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
                            {/* {console.log(finalAnswser)} */}
                        </div>
                    ))}
                </form>
            </div>

            <div className="ksu-card full-width gap">
                <h2>Data Anggota</h2>
                <form
                    onBlur={handleSubmit(onSubmit)}
                    className="ksu-card full-width gap"
                >
                    {label1?.map((item, index) => (
                        <div key={index} className="ksu-input-text-field">
                            <p>{item.label}</p>
                            {item.rows ? (
                                <TextField
                                    id="outlined-basic"
                                    label={item.label}
                                    variant="outlined"
                                    fullWidth
                                    rows={item.rows ? item.rows : 0}
                                    multiline
                                    onChange={(e) =>
                                        setFinalAnswer({
                                            ...finalAnswer,
                                            [item.name]: e.target.value,
                                        })
                                    }
                                    {...register(item.name)}
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
                            {/* {console.log(finalAnswer)} */}
                        </div>
                    ))}
                </form>
            </div>

            <div className="ksu-card full-width gap">
                <h2>Data Ahli Waris</h2>
                <form
                    onBlur={handleSubmit(onSubmit)}
                    className="ksu-card full-width gap"
                >
                    {label2?.map((item, index) => (
                        <div key={index} className="ksu-input-text-field">
                            <p>{item.label}</p>
                            {item.rows ? (
                                <TextField
                                    id="outlined-basic"
                                    label={item.label}
                                    variant="outlined"
                                    fullWidth
                                    rows={item.rows ? item.rows : 0}
                                    multiline
                                    onChange={(e) =>
                                        setFinalAnswer({
                                            ...finalAnswer,
                                            [item.name]: e.target.value,
                                        })
                                    }
                                    {...register(item.name)}
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
                            {/* {console.log(finalAnswer)} */}
                        </div>
                    ))}
                </form>
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
