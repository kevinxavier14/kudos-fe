import BulletProgress from "@/components/BulletProgress";
import { Alert, Button, FormGroup, TextField } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useEffect, useState } from "react";
import KSUDropzone from "@/components/KSUDropzone";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import FeedbacksPopup from "@/components/FeedbacksPopup";

import { getCookie, urlbase } from "@/hooks/Cookies.js";
import { useRouter } from "next/router.js";

import { uploadFileToAws } from "@/hooks/aws.js";

import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

export default function PendaftaranAnggota() {
    const [pagePoint, setPagePoint] = useState(1);
    const [KTPImage, setKTPImage] = useState();
    const [KTPURL, setKTPURL] = useState();
    const [simpananPokokUrl, setSimpananPokokURL] = useState();
    const [simpananPokokImage, setSimpananPokokImage] = useState();
    const [ktpLoad, setKtpLoad] = useState();
    const [simpananLoad, setSimpananLoad] = useState();

    const [feedbacksPopup, setFeedbacksPopup] = useState();
    const [submitting, setSubmitting] = useState(false);

    const [allDatas, setAllDatas] = useState([]);
    let allUsername = [];

    const [finalAnswer, setFinalAnswer] = useState({});

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const label1 = [
        {
            label: "Nama Anggota",
            name: "nama",
            errorVar: errors.nama,
        },
        {
            label: "NIK",
            name: "nik",
            errorVar: errors.nik,
        },
        {
            label: "No. Telepon",
            name: "noTelpon",
            errorVar: errors.noTelpon,
            number: true,
        },
        {
            label: "Tempat Tanggal Lahir",
            label1: "Tempat Lahir",
            name1: "tempatLahir",
            label2: "Tanggal Lahir",
            name2: "tanggalLahir",
            state: "TTL",
            errorVar1: errors.tempatLahir,
            errorVar2: errors.tanggalLahir,
        },
        {
            label: "Status Marital",
            name: "statusMartial",
            errorVar: errors.statusMartial,
        },
        {
            label: "Pekerjaan",
            name: "pekerjaan",
            errorVar: errors.pekerjaan,
        },
        {
            label: "Agama",
            name: "agama",
            errorVar: errors.agama,
        },
        {
            label: "Nama Ibu Kandung",
            name: "namaIbu",
            errorVar: errors.namaIbu,
        },
        {
            label: "Alamat",
            rows: 4,
            name: "alamat",
            errorVar: errors.alamat,
        },
    ];
    const label2 = [
        {
            label: "Nama Ahli Waris",
            name: "namaAhliWaris",
            errorVar: errors.namaAhliWaris,
        },
        {
            label: "No. Telepon Ahli Waris",
            name: "noTelponAhliWaris",
            errorVar: errors.noTelponAhliWaris,
        },
        {
            label: "Alamat Ahli Waris",
            name: "alamatAhliWaris",
            rows: 4,
            errorVar: errors.alamatAhliWaris,
        },
    ];
    const label3 = [
        {
            label: "Foto KTP",
            name: "fotoKtp",
        },
        {
            label: "Foto Simpanan Pokok",
            name: "fotsimpananPokokoKtp",
        },
    ];
    const router = useRouter();

    useEffect(() => {
        // get all username
        // axios
        //     .get(`${urlbase()}/api/v1/pengajuan-anggota/`, {
        //         headers: {
        //             Authorization: getCookie("token"),
        //         },
        //     })
        //     .then((response) => {
        //         setAllDatas(response.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        // if (ktpLoad && simpananLoad) onPostToSpring();
    }, []);

    const onSubmitPage1 = (data) => {
        setFinalAnswer(data);
        console.log(data);
        setPagePoint(2);
    };
    const addKTPData = () => {
        setFinalAnswer((prevState) => ({
            ...prevState,
            statusPengajuan: "Sedang Diajukan",
        }));
    };

    async function onPostToSpring() {
        setSubmitting(true);
        try {
            const imageRes1 = await uploadFileToAws(
                KTPImage,
                "ktp",
                finalAnswer.username,
                setKtpLoad
            );
            const imageRes2 = await uploadFileToAws(
                simpananPokokImage,
                "simpanan-pokok",
                finalAnswer.username,
                setSimpananLoad
            );
            // console.log("loading ktp " + ktpLoad);
            // console.log("loading simpanan " + simpananLoad);
            // console.log(finalAnswer);

            const params = {
                ...finalAnswer,
                fotoKtp: imageRes1,
                fotsimpananPokokoKtp: imageRes2,
            };

            const response = await axios.post(
                `${urlbase()}/api/v1/pengajuan-anggota/add`,
                params
            );
            console.log("response");
            setFeedbacksPopup(response);
        } catch (e) {
            console.log("up to spring", e);
            setFeedbacksPopup(e);
        }
        setSubmitting(false);
    }

    switch (pagePoint) {
        case 1:
            return (
                <section className="ksu-wrapper form center">
                    <h1>Form Pendaftaran Anggota</h1>
                    <BulletProgress
                        jumlahBullet={3}
                        bulletDone={0}
                        type={"anggota"}
                        pagePoint={pagePoint}
                        setPagePoint={setPagePoint}
                    />
                    <form
                        onSubmit={handleSubmit(onSubmitPage1)}
                        className="ksu-card gap no-padding no-bg"
                    >
                        <div className="ksu-card gap">
                            <h2>Pembuatan Akun</h2>
                            <div className="ksu-input-text-field">
                                <p>Username</p>
                                <TextField
                                    id="outlined-basic"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    {...register("username", {
                                        required: true,
                                    })}
                                    helperText={errors.username && "Wajib "}
                                    error={errors.username}
                                />
                            </div>
                        </div>
                        <div className="ksu-card gap">
                            <h2>Data Permohonan Anggota</h2>
                            {label1?.map(
                                (
                                    {
                                        name,
                                        label,
                                        state,
                                        rows,
                                        name1,
                                        name2,
                                        label1,
                                        label2,
                                        errorVar,
                                        errorVar1,
                                        errorVar2,
                                        number,
                                    },
                                    index
                                ) => (
                                    <div
                                        key={index}
                                        className="ksu-input-text-field"
                                    >
                                        <p>{label}</p>
                                        {state == "TTL" ? (
                                            <>
                                                <TextField
                                                    id="outlined-basic"
                                                    label={label1}
                                                    variant="outlined"
                                                    className="tempat-lahir"
                                                    {...register(name1, {
                                                        required: true,
                                                    })}
                                                    helperText={
                                                        errorVar1 && "Wajib "
                                                    }
                                                    error={errorVar1}
                                                />
                                                <p
                                                    style={{
                                                        width: "fit-content",
                                                    }}
                                                >
                                                    ,&nbsp;&nbsp;
                                                </p>

                                                <input
                                                    className="input-date"
                                                    type="date"
                                                    {...register(name2, {
                                                        valueAsDate: true,
                                                    })}
                                                />
                                                {/* <TextField
                                                    id="outlined-basic"
                                                    label={label2}
                                                    variant="outlined"
                                                    className="tempat-lahir"
                                                    {...register(name2, {
                                                        required: true,
                                                    })}
                                                    helperText={
                                                        errorVar2 && "Wajib "
                                                    }
                                                    error={errorVar2}
                                                /> */}
                                            </>
                                        ) : (
                                            <TextField
                                                id="outlined-basic"
                                                label={label}
                                                variant="outlined"
                                                fullWidth
                                                // type={number && "number"}
                                                rows={rows ? rows : 0}
                                                multiline={rows != null}
                                                {...register(name, {
                                                    required: true,
                                                    setValueAs: (v) =>
                                                        v.toString(),
                                                })}
                                                helperText={
                                                    errorVar && "Wajib "
                                                }
                                                error={errorVar}
                                            />
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="ksu-card gap">
                            <h2>Data Ahli Waris</h2>
                            {label2?.map(
                                ({ name, label, rows, errorVar }, index) => (
                                    <div
                                        key={index}
                                        className="ksu-input-text-field"
                                    >
                                        <p>{label}</p>
                                        <TextField
                                            id="outlined-basic"
                                            label={label}
                                            variant="outlined"
                                            fullWidth
                                            rows={rows ? rows : 0}
                                            multiline={rows != null}
                                            {...register(name, {
                                                required: true,
                                            })}
                                            helperText={errorVar && "Wajib "}
                                            error={errorVar}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                        <div className="space-between end">
                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<NavigateNextRoundedIcon />}
                                type="submit"
                                // onClick={() => {
                                //     setPagePoint(2)
                                // }}
                            >
                                Berikutnya
                            </Button>
                        </div>
                    </form>
                </section>
            );
        case 2:
            return (
                <section className="ksu-wrapper form center">
                    <h1>Form Pendaftaran Anggota</h1>
                    {console.log(finalAnswer)}
                    <BulletProgress
                        jumlahBullet={3}
                        bulletDone={1}
                        type={"anggota"}
                        pagePoint={pagePoint}
                        setPagePoint={setPagePoint}
                    />
                    <div className="ksu-card gap">
                        <h2>Upload Dokumen</h2>
                        <div className="ksu-input-text-field">
                            <p>Foto KTP</p>
                            <div className="dz">
                                <KSUDropzone
                                    setURL={setKTPURL}
                                    setImage={setKTPImage}
                                />
                            </div>
                        </div>
                        <div className="ksu-input-text-field">
                            <p>Foto Simpanan Pokok</p>
                            <div className="dz">
                                <KSUDropzone
                                    setURL={setSimpananPokokURL}
                                    setImage={setSimpananPokokImage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-between">
                        <Button
                            variant="outlined"
                            disableElevation
                            startIcon={<ArrowBackIosNewRoundedIcon />}
                            onClick={() => setPagePoint(1)}
                        >
                            Sebelumnya
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation
                            endIcon={<NavigateNextRoundedIcon />}
                            onClick={() => {
                                setPagePoint(3);
                                addKTPData();
                                setFeedbacksPopup(null);
                            }}
                        >
                            Berikutnya
                        </Button>
                    </div>
                </section>
            );
        case 3:
            return (
                <section className="ksu-wrapper form center">
                    {console.log(feedbacksPopup)}
                    {feedbacksPopup ? (
                        <FeedbacksPopup
                            labelBerhasil={"Akun Berhasil Dibuat"}
                            setFeedbacks={feedbacksPopup}
                            redirectTo={"/login"}
                        />
                    ) : (
                        <></>
                    )}

                    <h1>Form Pendaftaran Anggota</h1>

                    <BulletProgress
                        jumlahBullet={3}
                        bulletDone={2}
                        pagePoint={pagePoint}
                        setPagePoint={setPagePoint}
                        type={"anggota"}
                    />

                    <div className="ksu-card gap">
                        <h2>Rekap</h2>
                        <h3>Pembuatan Akun</h3>
                        <div className="ksu-input-text-field rekap">
                            <p>Username</p>

                            <p>
                                <strong>: {finalAnswer.username}</strong>
                            </p>
                        </div>
                        <br />
                        <h3>Data Permohonan Anggota</h3>
                        {label1?.map((item, index) => (
                            <div
                                key={index}
                                className="ksu-input-text-field rekap"
                            >
                                <p>{item.label}</p>

                                <p>
                                    <strong>: {finalAnswer[item.name]}</strong>
                                </p>
                            </div>
                        ))}
                        <br />
                        <h3>Data Ahli Waris</h3>
                        {label2?.map((item, index) => (
                            <div
                                key={index}
                                className="ksu-input-text-field rekap"
                            >
                                <p>{item.label}</p>

                                <p>
                                    <strong>: {finalAnswer[item.name]}</strong>
                                </p>
                            </div>
                        ))}
                        <br />
                        <h3>Dokumen</h3>
                        <div className="ksu-input-text-field rekap">
                            <p>Foto Ktp</p>
                            <div className="image-wrapper">
                                :
                                <img src={KTPURL} alt="image-ktp-diri" />
                            </div>
                        </div>
                        <div className="ksu-input-text-field rekap">
                            <p>Foto Simpanan Pokok</p>
                            <div className="image-wrapper">
                                :
                                <img
                                    src={simpananPokokUrl}
                                    alt="image-ktp-diri"
                                />
                            </div>
                        </div>
                    </div>
                    {/* {submitting && <div className="ksu-card">Submitting</div>} */}
                    <div className="space-between">
                        <Button
                            variant="outlined"
                            disableElevation
                            startIcon={<ArrowBackIosNewRoundedIcon />}
                            onClick={() => setPagePoint(2)}
                        >
                            Sebelumnya
                        </Button>

                        {submitting ? (
                            <LoadingButton
                                endIcon={<SendIcon />}
                                loading={true}
                                loadingPosition="end"
                                variant="contained"
                            >
                                <span>Ajukan Pendaftaran</span>
                            </LoadingButton>
                        ) : (
                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<NavigateNextRoundedIcon />}
                                onClick={() => {
                                    onPostToSpring();
                                    setFeedbacksPopup(null);
                                }}
                            >
                                Ajukan Pendaftaran
                            </Button>
                        )}
                    </div>
                </section>
            );
    }
}
