import BulletProgress from "@/components/BulletProgress";
import { Alert, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Link, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import axios from "axios";
import { CheckBox } from "@mui/icons-material";
import { Router } from "next/router";
import { useRouter } from "next/router";
import { getCookie, urlbase } from "@/hooks/Cookies";
import { reformatNominal } from "../../../hooks/GeneralFunction";

export default function FormPengajuanPinjaman() {
    const [pagePoint, setPagePoint] = useState(1);
    const [finalAnswer, setFinalAnswer] = useState({
    });
    const [jaminan, setJaminan] = useState({
    });
    const [checked, setChecked] = useState(false);
    const router = useRouter();
    const [canMakePengajuan, setCanMakePengajuan] = useState();

    //Different arrays untuk dropdown Tahun Jaminan Kendaraan
    const tahunMobil = [
        "2021 - Sekarang",
        "2015 - 2020",
        "2010 - 2014",
        "2005 - 2009",
        "2000 - 2004"
    ];
    const tahunTahunanMotorHonda = [
        "2021 - Sekarang",
        "2015 - 2020",
        "2010 - 2014"
    ];
    const tahunTahunanMotorLain = [
        "2021 - Sekarang",
        "2015 - 2020"
    ];
    const tahunMusimanMotor = [];

    const jangkaWaktuAngsuran = [[12,"1 tahun"], [24, "2 tahun"], [36, "3 tahun"]];
    const jangkaWaktuMusiman = [[3, "3 bulan"], [6, "6 bulan"]];

    //Variable pilihan tahun
    const [pilihanTahun, setPilihanTahun] = useState([]);

    //Variable pilihan jangka waktu
    const [pilihanJangkaWaktu, setPilihanJangkaWaktu]  = useState([]);

    const [selectedJenisPinjaman, setSelectedJenisPinjaman] = useState();
    const [selectedMerkType, setSelectedMerkType] = useState();

    //Set dropdown tahun kendaraan sesuai ketentuan
    function setTahunDropdown() {
        if (selectedMerkType === "SEDAN/JEEP/MINIBUS" || selectedMerkType === "TRUCK" || selectedMerkType === "PICKUP") {
            setPilihanTahun(tahunMobil);
        } else if (selectedJenisPinjaman === "angsuran" && (selectedMerkType === "MOTOR-YAMAHA" || selectedMerkType === "MOTOR-SUZUKI" || selectedMerkType === "MOTOR-KAWASAKI")) {
            setPilihanTahun(tahunTahunanMotorLain);
        } else if (selectedJenisPinjaman === "angsuran" && selectedMerkType === "MOTOR-HONDA") {
            setPilihanTahun(tahunTahunanMotorHonda);
        } else {
            setPilihanTahun(tahunMusimanMotor);
        }
    }

    //Set dropdown jangka waktu sesuai ketentuan
    function setJangkaWaktuDropdown() {
        if (selectedJenisPinjaman === "angsuran") {
            setPilihanJangkaWaktu(jangkaWaktuAngsuran);

        } else if (selectedJenisPinjaman === "musiman") {
            setPilihanJangkaWaktu(jangkaWaktuMusiman);
        }
    }
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setFinalAnswer(data);
        data=null;
        console.log("this is on submit")
        console.log(finalAnswer)
    };
    
    const onSubmitJaminan = (data) => {
        setJaminan(data);
        data=null;
        console.log("this is on jminan")
        console.log(jaminan)
    };

    const handleSubmitToSpring = (data) => {
        const anggota = {"id":getCookie("id")}
        const surveyor = {"id":1}
        setFinalAnswer((prevState) => ({
            ...prevState,
            "jaminan": jaminan,
            "anggota": anggota,
            "status": "Sedang ditinjau manajer",
            "surveyor": surveyor
        }));
    }

    function HandleJaminan(data) {
        const anggota = {"id":getCookie("id")}
        setJaminan((prevState) => ({
            ...prevState,
            "anggota":anggota
        }));
    }

    function postPengajuanPinjaman() {
        axios.post(urlbase() + "/api/v1/pengajuan-pinjaman/add", finalAnswer,
        {headers: {
            Authorization: getCookie('token'),
        },}
        ).
        then(function(response){
            console.log(response.data);
        })
    }

    const [error1, setError1] = useState(true);
    const [error2, setError2] = useState(true);
    const [error3, setError3] = useState(true);
    const [error4, setError4] = useState(true);
    const [error5, setError5] = useState(true);
    const [error6, setError6] = useState(true);
    const [error7, setError7] = useState(true);
    const [error8, setError8] = useState(true);
    const [error9, setError9] = useState(true);
    const [error10, setError10] = useState(true);
    const [error11, setError11] = useState(true);
    const [errorCheckBox, setErrorCheckBox] = useState(true);

    const [errorPage1NotFilled, setErrorPage1NotFilled] = useState(false);
    const [errorPage2NotFilled, setErrorPage2NotFilled] = useState(false);
    const [errorNotChecked, setErrorNotChecked] = useState(false);
    const [errorPage1Alert, setPage1Alert] = useState(false);
    const [errorPage2Alert, setPage2Alert] = useState(false);
    const [errorPage3Alert, setPage3Alert] = useState(false);

    function checkFillFormPage1() {
        if (
            !error1 &&
            !error2 &&
            !error3 &&
            !error4 
        ) {
            setErrorPage1NotFilled(true);
            return true;
        }
        return false;
    }

    function checkFillFormPage2() {
        if (
            !error5 &&
            !error6 &&
            !error7 &&
            !error8 &&
            !error9 &&
            !error10
        ) {
            setErrorPage2NotFilled(true);
            return true;
        }
        return false;
    }

    function checkCheckbox() {
        if (
            errorCheckBox == true
        ) {
            setErrorNotChecked(true);
            return true;
        }
        return false;
    }

    useEffect(() => {
        axios
            .get(urlbase() + "/api/v1/anggota/cek-bisa-menggajukan-pinjaman/" + getCookie('username'), {
                headers: {
                    Authorization: getCookie("token"),
                },
            })
            .then((response) => {
                console.log(response);
                setCanMakePengajuan(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    console.log(finalAnswer)
    if (getCookie("role") == "ANGGOTA" && !canMakePengajuan) {
        return (
            <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
                <section className="ksu-wrapper form center">
                    <h1>Anda tidak dapat membuat pengajuan pinjaman karena Anda sedang memiliki pinjaman aktif</h1>
                    <Link href='..'>
                        <Button
                            variant="contained"
                            disableElevation
                        >
                            Kembali
                        </Button>
                    </Link>
                </section>
            </div>
            </>
        );
    } else {
        switch (pagePoint) {
            case 1: //Pengajuan Pinjaman
                return (
                    <>
                        <section className="ksu-wrapper form center">
                            <h1>Form Pengajuan Pinjaman</h1>
                            <BulletProgress 
                            jumlahBullet={3} 
                            bulletDone ={1} 
                            type={"pendaftaran"} 
                            />
                            
                                <div className=" ksu-card full-width gap">
                                    <h2>Data Pengajuan Pinjaman Anggota</h2>
                                        <div className="ksu-input-text-field">
                                            <p>Pokok Hutang</p>
                                            <TextField 
                                                id="outlined-basic" 
                                                
                                                label="dalam rupiah" 
                                                variant="outlined"
                                                fullWidth
                                                onBlur={(e) => {
                                                    if(e.target.value == "") {
                                                        setError1(true)

                                                    } else {
                                                        setFinalAnswer((prevState) => ({
                                                        ...prevState,
                                                        "nominalPengajuan": e.target.value,
                                                
                                                        }));
                                                        setError1(false)
                                                    }
                                                    
                                                }}
                                                helperText={
                                                    error1 && "Wajib terisi"
                                                }
                                                error={error1}
                                                
                                            />
                                        </div>
                                        <div className="ksu-input-text-field">
                                            <p>Jenis Pinjaman</p>
                                            <FormControl
                                            >
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    onBlur={(e) => {
                                                        if(e.target.value == "") {
                                                            setError2(true)

                                                        } else {
                                                            setFinalAnswer((prevState) => ({
                                                            ...prevState,
                                                            "jenisPinjaman": e.target.value,
                                                    
                                                            }));
                                                            setSelectedJenisPinjaman(e.target.value);
                                                            setError2(false);
                                                        }
                                                        
                                                    }}
                                                    error={error2}
                                                >
                                                    <FormControlLabel value="angsuran" control={<Radio />} label="Angsuran" />
                                                    <FormControlLabel value="musiman" control={<Radio />} label="Musiman" />                
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className="ksu-input-text-field">
                                            <p>Penggunaan Pinjaman</p>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Penggunaan Pinjaman" 
                                                variant="outlined" 
                                                fullWidth
                                                onBlur={(e) => {
                                                    if(e.target.value == "") {
                                                        setError3(true)

                                                    } else {
                                                        setFinalAnswer((prevState) => ({
                                                        ...prevState,
                                                        "penggunaanPinjaman": e.target.value,
                                                
                                                        }));
                                                        setJangkaWaktuDropdown();
                                                        setError3(false)
                                                    }
                                                    
                                                }} 
                                                helperText={
                                                    error3 && "Wajib terisi"
                                                }
                                                error={error3}    
                                            />
                                        </div>
                                        <div className="ksu-input-text-field">
                                            <p>Jangka Waktu</p>
                                            <FormControl>
                                                <Select
                                                    id="outlined-basic"
                                                    label="Jangka Waktu"
                                                    onBlur={(e) => {
                                                        if (e.target.value == "") {
                                                            setError11(true)
                                                        } else {
                                                            setFinalAnswer((prevState) => ({
                                                            ...prevState,
                                                            "jangkaWaktu": e.target.value,
                                                    
                                                            }));
                                                            setError11(false)
                                                        }
                                                    }}
                                                    helperText={
                                                        error11 && "Wajib terisi"
                                                    }
                                                    error={error11}
                                                >
                                                    {pilihanJangkaWaktu.map((waktu) => (
                                                        <MenuItem key={waktu[0]} value={waktu[0]}>
                                                            {waktu[1]}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        
                                        <div className="ksu-input-text-field">
                                            <p>Cara Pembayaran</p>
                                            <FormControl
                                            >
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    onBlur={(e) => {
                                                        if (e.target.value == "") {
                                                            setError4(true)

                                                        } else {
                                                            setFinalAnswer((prevState) => ({
                                                            ...prevState,
                                                            "caraPembayaran": e.target.value,
                                                    
                                                            }));
                                                            setError4(false)
                                                        }
                                                        
                                                    }}
                                                    helperText={
                                                        error4 && "Wajib terisi"
                                                    }
                                                    error={error4}
                                                >
                                                    <FormControlLabel value="tunai" control={<Radio />} label="Tunai" />
                                                    <FormControlLabel value="transfer" control={<Radio />} label="Transfer" />
                                                    <FormControlLabel value="pemindahan buku" control={<Radio />} label="Pemindahan Buku" />
                                                    <FormControlLabel value="cover cek/bilyet giro" control={<Radio />} label="Cover Cek/Bilyet Giro" />                
                                                </RadioGroup>
                                            </FormControl>
                                        </div>                                        
                                </div>
                            
                            {errorPage1Alert && (
                                <Alert severity="error" sx={{ width: "100%" }}>
                                    Semua wajib terisi!
                                </Alert>
                            )}

                            <section className="form-pengajuan-button">
                                <div className="space-between">
                                    <Button 
                                        variant="contained" 
                                        onClick={() => {
                                            setJaminan((prevState) => ({
                                                ...prevState,
                                                "jenisJaminan": "Kendaraan",
                                        
                                            })
                                            );
                                            checkFillFormPage1()
                                                ? setPagePoint(2)
                                                : setPage1Alert(true);
                                        }
                                    }
                                    >
                                            Jaminkan Kendaraan
                                    </Button>
                                </div>
                            </section>
                            <section className="form-pengajuan-button">
                                <div className="space-between">
                                    <Button 
                                        variant="contained" 
                                        onClick={() => {
                                            setJaminan((prevState) => ({
                                                ...prevState,
                                                "jenisJaminan": "Sertifikat",
                                        
                                            })
                                            );
                                            checkFillFormPage1()
                                                ? setPagePoint(3)
                                                : setPage1Alert(true);
                                        }
                                    }
                                        >
                                            Jaminkan Sertifikat Hak Milik
                                    </Button>
                                </div>
                            </section>
                        
                        </section>
                    </>
                );
            case 2: //Jaminan Kendaraan
                return (
                    <section className="ksu-wrapper form center">
                        <h1>Form Pengajuan Pinjaman</h1>
                        <BulletProgress
                            jumlahBullet={3}
                            bulletDone={2}
                            type={"pendaftaran"}
                        />
                        <div className="ksu-card full-width gap">
                            <h2>Data Jaminan Kendaraan</h2>
                                <div className="ksu-input-text-field">
                                        <p>Merk/Type</p>
                                        <FormControl
                                        >
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                onBlur={(e) => {
                                                    if (e.target.value == "") {
                                                        setError5(true)
                                                    } else {
                                                        setJaminan((prevState) => ({
                                                        ...prevState,
                                                        "merkType": e.target.value,
                                                
                                                        }));
                                                        setSelectedMerkType(e.target.value);
                                                        setError5(false)
                                                    }
                                                    
                                                }}
                                                helperText={
                                                    error5 && "Wajib terisi"
                                                }
                                                error={error5}
                                            >
                                                <FormControlLabel value="SEDAN/JEEP/MINIBUS" control={<Radio />} label="SEDAN/JEEP/MINIBUS" />
                                                <FormControlLabel value="TRUCK" control={<Radio />} label="TRUCK" />
                                                <FormControlLabel value="PICKUP" control={<Radio />} label="PICKUP" />
                                                <FormControlLabel value="MOTOR-HONDA" control={<Radio />} label="MOTOR-HONDA" />        
                                                <FormControlLabel value="MOTOR-YAMAHA" control={<Radio />} label="MOTOR-YAMAHA" />        
                                                <FormControlLabel value="MOTOR-SUZUKI" control={<Radio />} label="MOTOR-SUZUKI" />        
                                                <FormControlLabel value="MOTOR-KAWASAKI" control={<Radio />} label="MOTOR-KAWASAKI" />                        
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="ksu-input-text-field">
                                        <p>No. Polisi</p>
                                        <TextField
                                            id="outlined-basic"
                                            label="No. Polisi"
                                            variant="outlined"
                                            fullWidth
                                            onBlur={(e) => {
                                                if (e.target.value == "") {
                                                    setError7(true)
                                                } else {
                                                    setJaminan((prevState) => ({
                                                    ...prevState,
                                                    "noPolisi": e.target.value,
                                            
                                                    }));
                                                    setTahunDropdown();
                                                    setError7(false)
                                                }
                                                
                                            }}
                                            helperText={
                                                error7 && "Wajib terisi"
                                            }
                                            error={error7}
                                        />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Tahun</p>
                                    <FormControl>
                                        <Select
                                            id="outlined-basic"
                                            label="Tahun Beli Kendaraan"
                                            onBlur={(e) => {
                                                if (e.target.value == "") {
                                                    setError6(true)
                                                } else {
                                                    setJaminan((prevState) => ({
                                                    ...prevState,
                                                    "tahun": e.target.value,
                                            
                                                    }));
                                                    setError6(false)
                                                }
                                                console.log(pilihanTahun)
                                                console.log(selectedJenisPinjaman)
                                                console.log(selectedMerkType)
                                            }}
                                            helperText={
                                                error6 && "Wajib terisi"
                                            }
                                            error={error6}
                                        >
                                            {pilihanTahun.map((tahun) => (
                                                <MenuItem key={tahun} value={tahun}>
                                                    {tahun}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {/* <Select
                                            id="outlined-basic"
                                            label="Tahun Beli Kendaraan"
                                            onBlur={(e) => {
                                                if (e.target.value == "") {
                                                    setError6(true)
                                                } else {
                                                    setJaminan((prevState) => ({
                                                    ...prevState,
                                                    "tahun": e.target.value,
                                            
                                                    }));
                                                    setError6(false)
                                                }
                                            }}
                                            helperText={
                                                error6 && "Wajib terisi"
                                            }
                                            error={error6}
                                        >
                                        </Select> */}
                                    </FormControl>
                                    
                                    {/* <TextField
                                        id="outlined-basic"
                                        label="Tahun Beli Kendaraan"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={(e) => {
                                            if (e.target.value == "") {
                                                setError6(true)
                                            } else {
                                                setJaminan((prevState) => ({
                                                ...prevState,
                                                "tahun": e.target.value,
                                        
                                                }));
                                                setError6(false)
                                            }
                                        }}
                                        helperText={
                                            error6 && "Wajib terisi"
                                        }
                                        error={error6}
                                    /> */}
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Atas Nama</p>
                                    <TextField
                                        id="outlined-basic"
                                        label="Atas Nama dari Kendaraan"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={(e) => {
                                            if(e.target.value == "") {
                                                setError8(true)
                                            } else {
                                                setJaminan((prevState) => ({
                                                ...prevState,
                                                "atasNama": e.target.value,
                                        
                                                }));
                                                setError8(false)
                                            }  
                                        }}
                                        helperText={
                                            error8 && "Wajib terisi"
                                        }
                                        error={error8}
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Diperoleh Dari</p>
                                    <TextField
                                        id="outlined-basic"
                                        label="Diperoleh Dari"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={(e) => {
                                            if (e.target.value == ""){
                                                setError9(true)
                                            } else {
                                                setJaminan((prevState) => ({
                                                ...prevState,
                                                "diperolehDari": e.target.value,
                                        
                                                }));
                                                setError9(false)
                                            }
                                        }}
                                        helperText={
                                            error9 && "Wajib terisi"
                                        }
                                        error={error9}
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Harga Beli</p>
                                    <TextField
                                        id="outlined-basic"
                                        label="dalam Rupiah"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={(e) => {
                                            if (e.target.value == "") {
                                                setError10(true)
                                            } else {
                                                setJaminan((prevState) => ({
                                                ...prevState,
                                                "nilaiJaminan": e.target.value,
                                        
                                                }));
                                                setError10(false)
                                            }
                                        }}
                                        helperText={
                                            error10 && "Wajib terisi"
                                        }
                                        error={error10}
                                    />
                                </div>
                            
                        </div>
                        <div className="space-between">
                            <Button
                                variant="outlined"
                                disableElevation
                                startIcon={<ArrowBackIosNewRoundedIcon />}
                                onClick={() => {setPagePoint(1)
                                    HandleJaminan();
                                    //handleSubmitToSpring();
                                }}
                            >
                                Sebelumnya
                            </Button>
                            {errorPage2Alert && (
                                <Alert severity="error" sx={{ width: "100%" }}>
                                    Semua wajib terisi!
                                </Alert>
                            )}

                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<NavigateNextRoundedIcon />}
                                onClick={() => {
                                    HandleJaminan();
                                    checkFillFormPage2()
                                        ? setPagePoint(4)
                                        : setPage2Alert(true)
                                    //handleSubmitToSpring();
                                }}
                            >
                                Berikutnya
                            </Button>
                        </div>
                    </section>
                );
            case 3: //Jaminan Sertifikat Hak Milik
                return (
                    <section className="ksu-wrapper form center">
                        <h1>Form Pengajuan Pinjaman</h1>
                        <BulletProgress
                            jumlahBullet={3}
                            bulletDone={2}
                            type={"pendaftaran"}
                        />
                        <div className="ksu-card full-width gap">
                            <h2>Data Jaminan Sertifikat</h2>
                                {/* <div className="ksu-input-text-field">
                                    <p>Jenis Kepemilikan</p>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            onBlur={(e) => {
                                                if (e.target.value == "") {
                                                    setError5(true)
                                                } else {
                                                    setJaminan((prevState) => ({
                                                    ...prevState,
                                                    "jenisKepemilikan": e.target.value,
                                                    }));
                                                    setError5(false)
                                                }
                                            }}
                                            helperText={
                                                error5 && "Wajib terisi"
                                            }
                                            error={error5}
                                        >
                                            <FormControlLabel value="HM" control={<Radio />} label="HM" />
                                            <FormControlLabel value="HGB" control={<Radio />} label="HGB" /> 
                                            <FormControlLabel value="HGU" control={<Radio />} label="HGU" />                
                                        </RadioGroup>
                                    </FormControl>
                                </div> */}
                                <div className="ksu-input-text-field">
                                    <p>Lokasi</p>
                                    <TextField
                                        id="outlined-basic"
                                        label="Lokasi"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={(e) => {
                                            if (e.target.value == "") {
                                                setError6(true)
                                            } else {
                                                setJaminan((prevState) => ({
                                                ...prevState,
                                                "lokasi": e.target.value,
                                        
                                                }));
                                                setError6(false)
                                            }
                                        }}
                                        helperText={
                                            error6 && "Wajib terisi"
                                        }
                                        error={error6}
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Luas</p>
                                    <TextField
                                        id="outlined-basic"
                                        label="dalam m2"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={(e) => {
                                            if (e.target.value == "") {
                                                setError7(true)
                                            } else {
                                                setJaminan((prevState) => ({
                                                ...prevState,
                                                "luas": e.target.value,
                                        
                                                }));
                                                setError7(false)
                                            }   
                                        }}
                                        helperText={
                                            error7 && "Wajib terisi"
                                        }
                                        error={error7}
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Atas Nama</p>
                                    <TextField
                                        id="outlined-basic"
                                        label="Atas Nama dari Sertifikat"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={(e) => {
                                            if (e.target.value == "") {
                                                setError8(true)
                                            } else {
                                                setJaminan((prevState) => ({
                                                ...prevState,
                                                "atasNama": e.target.value,
                                        
                                                }));
                                                setError8(false)
                                            }
                                        }}
                                        helperText={
                                            error8 && "Wajib terisi"
                                        }
                                        error={error8}
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Diperoleh Dari</p>
                                    <TextField
                                        id="outlined-basic"
                                        label="Diperoleh Dari"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={(e) => {
                                            if (e.target.value == "") {
                                                setError9(true)
                                            } else {
                                                setJaminan((prevState) => ({
                                                ...prevState,
                                                "diperolehDari": e.target.value,
                                        
                                                }));
                                                setError9(false)
                                            }
                                        }}
                                        helperText={
                                            error9 && "Wajib terisi"
                                        }
                                        error={error9}
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Harga Beli</p>
                                    <TextField
                                        id="outlined-basic"
                                        label="dalam Rupiah"
                                        variant="outlined"
                                        fullWidth
                                        onBlur={(e) => {
                                            if (e.target.value == "") {
                                                setError10(true)
                                            } else {
                                                setJaminan((prevState) => ({
                                                ...prevState,
                                                "nilaiJaminan": e.target.value,
                                        
                                                }));
                                                setError10(false)
                                            }
                                        }}
                                        helperText={
                                            error10 && "Wajib terisi"
                                        }
                                        error={error10}
                                    />
                                </div>
                            
                        </div>
                        <div className="space-between">
                            <Button
                                variant="outlined"
                                disableElevation
                                startIcon={<ArrowBackIosNewRoundedIcon />}
                                onClick={() => {setPagePoint(1)
                                    HandleJaminan();
                                    
                                }}
                            >
                                Sebelumnya
                            </Button>
                            {errorPage2NotFilled && (
                                <Alert severity="error" sx={{ width: "100%" }}>
                                    Semua wajib terisi!
                                </Alert>
                            )}

                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<NavigateNextRoundedIcon />}
                                onClick={() => {
                                    checkFillFormPage2()
                                        ? setPagePoint(5)
                                        : setPage2Alert(true);
                                    HandleJaminan();
                                }}
                            >
                                Berikutnya
                            </Button>
                        </div>
                    </section>
                );
            case 4: //Review dengan Jaminan Kendaraan
                return (
                    <section className="ksu-wrapper form center">
                        <h1>Form Pengajuan Pinjaman</h1>
                        <BulletProgress 
                        jumlahBullet={3} 
                        bulletDone ={3} 
                        type={"pendaftaran"} 
                        />
                        
                        <div className=" ksu-card full-width gap">
                            <h2>Data Pengajuan Pinjaman Anggota</h2>
                                <div className="ksu-input-text-field">
                                    <p>Pokok Hutang</p>
                                    <TextField disabled id="outlined-basic" label="dalam rupiah" variant="outlined" fullWidth value={reformatNominal(finalAnswer['nominalPengajuan'])} />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Jenis Pinjaman</p>
                                    <FormControl disabled
                                    >
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={finalAnswer["jenisPinjaman"]}
                                        >
                                            <FormControlLabel value="angsuran" control={<Radio />} label="Angsuran" />
                                            <FormControlLabel value="musiman" control={<Radio />} label="Musiman" />                
                                        </RadioGroup>
                                    </FormControl>
                                        </div>
                                <div className="ksu-input-text-field">
                                    <p>Jangka Waktu</p>
                                    <TextField disabled id="outlined-basic" label="dalam bulan" variant="outlined" fullWidth value={finalAnswer['jangkaWaktu']}/>
                                </div>
                                {/* <div className="ksu-input-text-field">
                                    <p>Bunga</p>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        label="5%"
                                        defaultValue="5%"
                                        fullWidth
                                    />
                                </div> */}
                                <div className="ksu-input-text-field">
                                    <p>Penggunaan Pinjaman</p>
                                    <TextField disabled id="outlined-basic" label="Penggunaan Pinjaman" variant="outlined" fullWidth value={finalAnswer["penggunaanPinjaman"]}/>
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Cara Pembayaran</p>
                                    <FormControl disabled>
                                        <RadioGroup
                                            value={finalAnswer['caraPembayaran']}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="tunai" control={<Radio />} label="Tunai" />
                                            <FormControlLabel value="transfer" control={<Radio />} label="Transfer" />
                                            <FormControlLabel value="pemindahan buku" control={<Radio />} label="Pemindahan Buku" />
                                            <FormControlLabel value="cover cek/bilyet giro" control={<Radio />} label="Cover Cek/Bilyet Giro" />                
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Jenis Jaminan</p>
                                    <FormControl disabled>
                                        <RadioGroup
                                            value="Kendaraan"
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="Kendaraan" control={<Radio />} label="Kendaraan" />
                                            <FormControlLabel value="" control={<Radio />} label="Sertifikat" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                
                                                    
                            </div>

                        <div className="ksu-card full-width gap">
                            <h2>Data Jaminan Kendaraan</h2>
                            <div className="ksu-input-text-field">
                                <p>Merk/Type</p>
                                <TextField
                                    disabled
                                    value={jaminan['merkType']}
                                    id="outlined-basic"
                                    label="Merk/Type Kendaraan"
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                            <div className="ksu-input-text-field">
                                <p>Tahun</p>
                                <TextField
                                    disabled
                                    value={jaminan['tahun']}
                                    id="outlined-basic"
                                    label="Tahun Beli Kendaraan"
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                            <div className="ksu-input-text-field">
                                <p>No. Polisi</p>
                                <TextField
                                    disabled
                                    value={jaminan['noPolisi']}
                                    id="outlined-basic"
                                    label="No. Polisi"
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                            <div className="ksu-input-text-field">
                                <p>Atas Nama</p>
                                <TextField
                                    disabled
                                    value={jaminan['atasNama']}
                                    id="outlined-basic"
                                    label="Atas Nama dari Kendaraan"
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                            <div className="ksu-input-text-field">
                                <p>Diperoleh Dari</p>
                                <TextField
                                    disabled
                                    value={jaminan['diperolehDari']}
                                    id="outlined-basic"
                                    label="Diperoleh Dari"
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                            <div className="ksu-input-text-field">
                                <p>Harga Beli</p>
                                <TextField
                                    disabled
                                    value={jaminan['nilaiJaminan']}
                                    id="outlined-basic"
                                    label="dalam Rupiah"
                                    variant="outlined"
                                    fullWidth
                                />

                            </div>
                            <div className="ksu-input-text-field">
                                <p>Saya menyatakan bahwa form ini saya isi dengan sebenar-benarnya.</p>
                                    <Checkbox
                                        checked={checked}
                                        onChange={()=>{
                                            handleSubmitToSpring();
                                            setChecked(true);
                                            console.log(checked)
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
            
                            </div>
                            
                        </div>
                        <div className="space-between">
                            <Button
                                variant="outlined"
                                disableElevation
                                startIcon={<ArrowBackIosNewRoundedIcon />}
                                onClick={() => setPagePoint(2)}
                            >
                                Sebelumnya
                            </Button>
                            {errorPage3Alert && (
                                <Alert severity="error" sx={{ width: "100%" }}>
                                    Checkbox wajib dicentang!
                                </Alert>
                            )}

                            
                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<NavigateNextRoundedIcon />}
                                onClick={() => {
                                    if (checkCheckbox()) {
                                        postPengajuanPinjaman()
                                        router.push('../permohonan')

                                    } else {
                                        setPage3Alert(true)
                                    }
                                }
                                }
                            >
                                Ajukan Pinjaman
                            </Button>
                            {console.log(finalAnswer)}
                            
                            
                        </div>
                    </section>
                );
            case 5: //Review dengan Jaminan Sertifikat
                return (
                    <>
                        <section className="ksu-wrapper form center">
                            <h1>Form Pengajuan Pinjaman</h1>
                            <BulletProgress 
                            jumlahBullet={3} 
                            bulletDone ={3} 
                            type={"pendaftaran"} 
                            />
                            
                            <div className=" ksu-card full-width gap">
                            <h2>Data Pengajuan Pinjaman Anggota</h2>
                                <div className="ksu-input-text-field">
                                    <p>Pokok Hutang</p>
                                    <TextField disabled id="outlined-basic" label="dalam rupiah" variant="outlined" fullWidth value={reformatNominal(finalAnswer['nominalPengajuan'])} />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Jenis Pinjaman</p>
                                    <FormControl disabled
                                    >
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={finalAnswer["jenisPinjaman"]}
                                        >
                                            <FormControlLabel value="angsuran" control={<Radio />} label="Angsuran" />
                                            <FormControlLabel value="musiman" control={<Radio />} label="Musiman" />                
                                        </RadioGroup>
                                    </FormControl>
                                        </div>
                                <div className="ksu-input-text-field">
                                    <p>Jangka Waktu</p>
                                    <TextField disabled id="outlined-basic" label="dalam bulan" variant="outlined" fullWidth value={finalAnswer['jangkaWaktu']}/>
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Penggunaan Pinjaman</p>
                                    <TextField disabled id="outlined-basic" label="Penggunaan Pinjaman" variant="outlined" fullWidth value={finalAnswer["penggunaanPinjaman"]}/>
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Cara Pembayaran</p>
                                    <FormControl disabled>
                                        <RadioGroup
                                            value={finalAnswer['caraPembayaran']}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="tunai" control={<Radio />} label="Tunai" />
                                            <FormControlLabel value="transfer" control={<Radio />} label="Transfer" />
                                            <FormControlLabel value="pemindahan buku" control={<Radio />} label="Pemindahan Buku" />
                                            <FormControlLabel value="cover cek/bilyet giro" control={<Radio />} label="Cover Cek/Bilyet Giro" />                
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Jenis Jaminan</p>
                                    <FormControl disabled>
                                        <RadioGroup
                                            value="Sertifikat"
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="Kendaraan" control={<Radio />} label="Kendaraan" />
                                            <FormControlLabel value="" control={<Radio />} label="Sertifikat" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                
                                                    
                            </div>

                                <div className="ksu-card full-width gap">
                                <h2>Data Jaminan Sertifikat Hak Milik</h2>
                                <div className="ksu-input-text-field">
                                    <p>Lokasi</p>
                                    <TextField
                                        disabled
                                        value={jaminan['lokasi']}
                                        id="outlined-basic"
                                        label="Lokasi"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Luas</p>
                                    <TextField
                                        disabled
                                        value={jaminan['luas']}
                                        id="outlined-basic"
                                        label="dalam m2"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Atas Nama</p>
                                    <TextField
                                        disabled
                                        value={jaminan['atasNama']}
                                        id="outlined-basic"
                                        label="Atas Nama dari Sertifikat"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Diperoleh Dari</p>
                                    <TextField
                                        disabled
                                        value={jaminan['diperolehDari']}
                                        id="outlined-basic"
                                        label="Diperoleh Dari"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Harga Beli</p>
                                    <TextField
                                        disabled
                                        value={jaminan['nilaiJaminan']}
                                        id="outlined-basic"
                                        label="dalam Rupiah"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div className="ksu-input-text-field">
                                    <p>Saya menyatakan bahwa form ini saya isi dengan sebenar-benarnya.</p>
                                        <Checkbox
                                            checked={checked}
                                            onChange={()=>{
                                                handleSubmitToSpring();
                                                setChecked(true);
                                                console.log(checked)
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                </div>
                        
                            </div>
                        <div className="space-between">
                            <Button
                                variant="outlined"
                                disableElevation
                                startIcon={<ArrowBackIosNewRoundedIcon />}
                                onClick={() => setPagePoint(3)}
                            >
                                Sebelumnya
                            </Button>
                            {errorPage3Alert && (
                                <Alert severity="error" sx={{ width: "100%" }}>
                                    Checkbox wajib dicentang!
                                </Alert>
                            )}
                            <Button
                                variant="contained"
                                disableElevation
                                endIcon={<NavigateNextRoundedIcon />}
                                onClick={() => {
                                    if (checkCheckbox()) {
                                        postPengajuanPinjaman()
                                        router.push('../permohonan')

                                    } else {
                                        setPage3Alert(true)
                                    }
                                }
                                }
                            >
                                Ajukan Pinjaman
                            </Button>
                            
                        </div>
                        </section>
                    </>
                );
        }
    }
    
}
