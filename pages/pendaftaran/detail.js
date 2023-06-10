// // const label1 = [
// //     {
// //         label: "Nama Anggota",
// //         name: "nama_anggota",
// //     },
// //     {
// //         label: "No. KTP",
// //         name: "no_ktp",
// //     },
// //     {
// //         label: "Tempat Tanggal Lahir",
// //         name: "tempat_tanggal_lahir",
// //     },
// //     {
// //         label: "Nama Ibu Kandung",
// //         name: "nama_ibu_kandung",
// //     },
// //     {
// //         label: "No. Telepon",
// //         name: "no_telp",
// //     },
// //     {
// //         label: "Pekerjaan",
// //         name: "pekerjaan",
// //     },
// //     {
// //         label: "Agama",
// //         name: "agama",
// //     },
// //     {
// //         label: "Nama Ahli Waris",
// //         name: "nama_ahli_waris",
// //     },
// //     {
// //         label: "No. Telepon Ahli Waris",
// //         name: "no_telp_ahli_waris",
// //     },
// //     {
// //         label: "Alamat",
// //         rows: 4,
// //         name: "alamat",
// //     },
// // ];

// // export default function DetailPendaftarn() {
// //     return (
// //         <section className="ksu-wrapper form ">
// //             <h1>Detail Pendaftaran Anggota - Kode Pendaftaran</h1>
// //             <div className="ksu-card full-width gap">
// //                 <h2>Data Anggota</h2>
// //                 <div className="space-between align-start">
// //                     <div className="inner-card left">
// //                         <div className="image-wrapper-details">
// //                             {/* nanti di isi sama image poto orangnya */}
// //                             {true ? (
// //                                 <img
// //                                     src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
// //                                     alt="person-image"
// //                                 />
// //                             ) : (
// //                                 <img
// //                                     src="https://i.stack.imgur.com/l60Hf.png"
// //                                     alt="default-pp-image"
// //                                 />
// //                             )}
// //                             <div className="name-wrapper">
// //                                 <p>
// //                                     <strong>Name</strong>
// //                                 </p>
// //                                 <p>Member ID</p>
// //                             </div>
// //                         </div>
// //                         {label1.map((item) => (
// //                             <div>
// //                                 <p>
// //                                     <strong>{item.label}</strong>
// //                                 </p>
// //                                 <p>data</p>
// //                             </div>
// //                         ))}
// //                     </div>
// //                     <div className="inner-card right">
// //                         {label1.map((item) => (
// //                             <div>
// //                                 <p>
// //                                     <strong>{item.label}</strong>
// //                                 </p>
// //                                 <p>data</p>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // }

// import { Button, CircularProgress, TextField } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
// import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";

// import ReactToPrint from "react-to-print";
// import { useRef, useState } from "react";

// import axios from "axios";
// import { getCookie, urlbase } from "@/hooks/Cookies";

// const label1 = [
//     {
//         label: "Nama Anggota",
//         name: "nama",
//     },
//     {
//         label: "NIK",
//         name: "nik",
//     },
//     {
//         label: "Tempat Tanggal Lahir",
//         name: "tempatTanggalLahir",
//     },
//     {
//         label: "Nama Ibu Kandung",
//         name: "namaIbu",
//     },
//     {
//         label: "No. Telepon",
//         name: "noTelepon",
//     },
//     {
//         label: "Pekerjaan",
//         name: "pekerjaan",
//     },

//     {
//         label: "Alamat",
//         rows: 4,
//         name: "alamat",
//     },
// ];
// const label2 = [
//     {
//         label: "Agama",
//         name: "agama",
//     },
//     {
//         label: "Status Marital",
//         name: "statusMartial",
//     },

//     {
//         label: "Tanggal Pengajuan",
//         name: "tanggalPengajuan",
//     },
//     {
//         label: "Status Pengajuan",
//         name: "statusPengajuan",
//     },
//     {
//         label: "Nama Ahli Waris",
//         name: "namaAhliWaris",
//     },
//     {
//         label: "No. Telepon Ahli Waris",
//         name: "noTelponAhliWaris",
//     },
//     {
//         label: "Alamat Ahli Waris",
//         name: "alamatAhliWaris",
//     },
// ];

// export default function DetailPendaftarn({ pengajuanAnggota }) {
//     let componentRef = useRef();

//     const [doneTerima, setDoneTerima] = useState(false);
//     const [loadingTerima, setLoadingTerima] = useState(false);

//     const [doneTolak, setDoneTolak] = useState(false);
//     const [loadingTolak, setLoadingTolak] = useState(false);

//     const [allDone, setAllDone] = useState(false);

//     const [messageDitolak, setMessageDitolak] = useState();

//     function PushData(type, id) {
//         type == "terima" ? setLoadingTerima(true) : {};
//         type == "tolak" ? setLoadingTolak(true) : {};
//         let body = {};
//         type == "tolak"
//             ? body == { id: id, status: "tolak", message: `${messageDitolak}` }
//             : {};
//         setTimeout(() => {
//             axios
//                 .post(`${urlbase}pengajuan-anggota/${type}/${id}`, body, {
//                     headers: {
//                         Authorization: getCookie("token"),
//                     },
//                 })
//                 .then((response) => {
//                     console.log(response);
//                     type == "terima" ? setDoneTerima(true) : {};
//                     type == "tolak" ? setDoneTolak(true) : {};
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                 });
//         }, 2000);
//     }

//     function HandleTerimaButton(original) {
//         if (doneTerima) {
//             setTimeout(() => {
//                 {
//                     console.log(doneTolak);
//                 }
//                 if (doneTerima || doneTolak) {
//                     setAllDone(true);
//                 }
//             }, 4000);
//             return (
//                 <Button
//                     className="ksu-button-custom"
//                     variant="contained"
//                     disableElevation
//                 >
//                     <img
//                         src="/icons/check-white.gif"
//                         alt="check-red"
//                         height="20px"
//                     />
//                 </Button>
//             );
//         }
//         if (loadingTerima) {
//             return (
//                 <LoadingButton loading color="primary" variant="contained">
//                     <span>Terima</span>
//                 </LoadingButton>
//             );
//         }

//         return (
//             <Button
//                 className="ksu-button-custom"
//                 variant="contained"
//                 disableElevation
//                 onClick={() => PushData("terima", original.id)}
//             >
//                 TERIMA
//             </Button>
//         );
//     }
//     function HandleTolakButton(original) {
//         if (doneTolak) {
//             setTimeout(() => {
//                 {
//                     console.log(doneTolak);
//                 }
//                 if (doneTerima || doneTolak) {
//                     setAllDone(true);
//                 }
//             }, 4000);
//             return (
//                 <Button variant="outlined" color="error" disableElevation>
//                     <img
//                         src="/icons/check-red.gif"
//                         alt="check-red"
//                         height="20px"
//                     />
//                 </Button>
//             );
//         }
//         if (loadingTolak) {
//             return (
//                 <LoadingButton loading color="primary" variant="contained">
//                     <span>Terima</span>
//                 </LoadingButton>
//             );
//         }

//         return (
//             <Button
//                 variant="outlined"
//                 color="error"
//                 disableElevation
//                 onClick={() => PushData("tolak", original.id)}
//             >
//                 TOLAK
//             </Button>
//         );
//     }

//     // function HandleTolak() {
//     //     setLoadingTolak(true);
//     //     PushData("tolak", pengajuanAnggota.id, setLoadingTolak);
//     // }

//     return (
//         <section className="ksu-wrapper form ">
//             <h1>Detail Pendaftaran Anggota - {pengajuanAnggota.id}</h1>
//             <div className="ksu-card full-width gap">
//                 <h2>Data Anggota</h2>
//                 <div className="space-between align-start">
//                     <div className="inner-card left">
//                         <div className="image-wrapper-details">
//                             {/* nanti di isi sama image poto orangnya */}
//                             {true ? (
//                                 <img
//                                     src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
//                                     alt="person-image"
//                                 />
//                             ) : (
//                                 <img
//                                     src="https://i.stack.imgur.com/l60Hf.png"
//                                     alt="default-pp-image"
//                                 />
//                             )}
//                             <div className="name-wrapper">
//                                 <p>
//                                     <strong>{pengajuanAnggota.username}</strong>
//                                 </p>
//                                 <p>Member ID</p>
//                             </div>
//                         </div>
//                         {label1.map((item, index) => (
//                             <div key={index}>
//                                 <p>
//                                     <strong>{item.label}</strong>
//                                 </p>
//                                 <p>{pengajuanAnggota[item.name]}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="inner-card right">
//                         {label2.map((item, index) => (
//                             <div key={index}>
//                                 <p>
//                                     <strong>{item.label}</strong>
//                                 </p>
//                                 <p>{pengajuanAnggota[item.name]}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="space-between end">
//                     <ReactToPrint
//                         trigger={() => (
//                             <Button>
//                                 Print Detail &nbsp;
//                                 <LocalPrintshopRoundedIcon />
//                             </Button>
//                         )}
//                         content={() => componentRef}
//                     />
//                 </div>
//             </div>
//             {console.log(messageDitolak)}

//             <div style={{ display: "none" }}>
//                 <div
//                     className="ksu-card full-width gap no-padding to-print"
//                     ref={(el) => (componentRef = el)}
//                 >
//                     <br />
//                     <div className="space-between header">
//                         <div className="inner-card left">
//                             <div className="logo-print">
//                                 <img
//                                     src="/drawer-header-left.png"
//                                     alt="logo"
//                                     className="logo-left"
//                                 />
//                                 <img
//                                     src="/drawer-header-right.png"
//                                     alt="logo"
//                                     className="logo-right"
//                                 />
//                             </div>
//                         </div>
//                         <div className="inner-card right">
//                             <p>
//                                 <strong>PERMOHONAN MENJADI ANGGOTA</strong>
//                             </p>
//                         </div>
//                     </div>
//                     <br />
//                     <h2>Data Anggota</h2>
//                     <div className="space-between align-start">
//                         <div className="inner-card left">
//                             <div className="image-wrapper-details">
//                                 {/* nanti di isi sama image poto orangnya */}
//                                 {true ? (
//                                     <img
//                                         src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
//                                         alt="person-image"
//                                     />
//                                 ) : (
//                                     <img
//                                         src="https://i.stack.imgur.com/l60Hf.png"
//                                         alt="default-pp-image"
//                                     />
//                                 )}
//                                 <div className="name-wrapper">
//                                     <p>
//                                         <strong>
//                                             {pengajuanAnggota.username}
//                                         </strong>
//                                     </p>
//                                     <p>Member ID</p>
//                                 </div>
//                             </div>
//                             {label1.map((item, index) => (
//                                 <div key={index}>
//                                     <p>
//                                         <strong>{item.label}</strong>
//                                     </p>
//                                     <p>{pengajuanAnggota[item.name]}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="inner-card right">
//                             {label2.map((item, index) => (
//                                 <div key={index}>
//                                     <p>
//                                         <strong>{item.label}</strong>
//                                     </p>
//                                     <p>{pengajuanAnggota[item.name]}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <br />
//                     <br />
//                     <br />
//                     <br />
//                     <div className="tanda-tangan space-between align-start">
//                         <div className="inner-card left">
//                             <p>
//                                 <strong>Cap Jempol</strong>
//                             </p>
//                             <br />
//                             <br />
//                             <br />
//                             <div className="line"></div>
//                         </div>
//                         <div className="inner-card right">
//                             <p>
//                                 <strong>Tanda Tangan</strong>
//                             </p>
//                             <br />
//                             <br />
//                             <br />
//                             <div className="wrapper">
//                                 <div className="inner">
//                                     <div className="line"></div>
//                                 </div>
//                                 <div className="inner">
//                                     <div className="line"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="ksu-card full-width gap">
//                 {pengajuanAnggota.statusPengajuan == "Pengajuan Diterima" ||
//                 pengajuanAnggota.statusPengajuan == "Ditolak" ? (
//                     <></>
//                 ) : (
//                     <>
//                         {allDone != true ? (
//                             <>
//                                 <h2>Tombol Aksi</h2>
//                                 <div className="space-between align-start">
//                                     <div className="inner-card left">
//                                         <p>
//                                             <strong>
//                                                 Lanjutkan Proses Pendaftaran
//                                             </strong>
//                                         </p>
//                                         {HandleTerimaButton(pengajuanAnggota)}
//                                     </div>
//                                     <div className="inner-card right">
//                                         <p>
//                                             <strong>Tolak Permohonan</strong>
//                                         </p>
//                                         <TextField
//                                             id="outlined-basic"
//                                             label="Alasan penolakan"
//                                             color="error"
//                                             multiline
//                                             fullWidth
//                                             onBlur={(e) => {
//                                                 setMessageDitolak(
//                                                     e.target.value
//                                                 );
//                                             }}
//                                         />
//                                         {HandleTolakButton(pengajuanAnggota)}
//                                     </div>
//                                 </div>
//                             </>
//                         ) : (
//                             <>
//                                 {pengajuanAnggota.statusPengajuan ==
//                                 "Pengajuan Diterima" ? (
//                                     <CheckIcon />
//                                 ) : (
//                                     <>
//                                         <p>
//                                             <strong>
//                                                 Pengajuan Sudah Diterima
//                                             </strong>
//                                         </p>
//                                     </>
//                                 )}
//                             </>
//                         )}
//                     </>
//                 )}
//             </div>
//         </section>
//     );
// }

// export const getStaticPaths = async () => {
//     const res = await fetch("http://localhost:8080/pengajuan-anggota/");
//     const data = await res.json();

//     const paths = data.map((item) => {
//         return {
//             params: { id: item.id.toString() },
//         };
//     });
//     return {
//         paths,
//         fallback: false,
//     };
// };

import axios from "axios";
import { getCookie, urlbase } from "@/hooks/Cookies";

const label1 = [
    {
        label: "Nama Anggota",
        name: "nama",
    },
    {
        label: "NIK",
        name: "nik",
    },
    {
        label: "Tempat Tanggal Lahir",
        name: "tempatTanggalLahir",
    },
    {
        label: "Nama Ibu Kandung",
        name: "namaIbu",
    },
    {
        label: "No. Telepon",
        name: "noTelepon",
    },
    {
        label: "Pekerjaan",
        name: "pekerjaan",
    },

    {
        label: "Alamat",
        rows: 4,
        name: "alamat",
    },
];
const label2 = [
    {
        label: "Agama",
        name: "agama",
    },
    {
        label: "Status Marital",
        name: "statusMartial",
    },

    {
        label: "Tanggal Pengajuan",
        name: "tanggalPengajuan",
    },
    {
        label: "Status Pengajuan",
        name: "statusPengajuan",
    },
    {
        label: "Nama Ahli Waris",
        name: "namaAhliWaris",
    },
    {
        label: "No. Telepon Ahli Waris",
        name: "noTelponAhliWaris",
    },
    {
        label: "Alamat Ahli Waris",
        name: "alamatAhliWaris",
    },
];

export default function DetailPendaftarn({ pengajuanAnggota }) {
    return <></>;
    // let componentRef = useRef();

    // const [doneTerima, setDoneTerima] = useState(false);
    // const [loadingTerima, setLoadingTerima] = useState(false);

    // const [doneTolak, setDoneTolak] = useState(false);
    // const [loadingTolak, setLoadingTolak] = useState(false);

    // const [allDone, setAllDone] = useState(false);

    // const [messageDitolak, setMessageDitolak] = useState();

    // function PushData(type, id) {
    //     type == "terima" ? setLoadingTerima(true) : {};
    //     type == "tolak" ? setLoadingTolak(true) : {};
    //     let body = {};
    //     type == "tolak"
    //         ? body == { id: id, status: "tolak", message: `${messageDitolak}` }
    //         : {};
    //     setTimeout(() => {
    //         axios
    //             .post(`${urlbase}pengajuan-anggota/${type}/${id}`, body, {
    //                 headers: {
    //                     Authorization: getCookie("token"),
    //                 },
    //             })
    //             .then((response) => {
    //                 console.log(response);
    //                 type == "terima" ? setDoneTerima(true) : {};
    //                 type == "tolak" ? setDoneTolak(true) : {};
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     }, 2000);
}

// function HandleTerimaButton(original) {
//     if (doneTerima) {
//         setTimeout(() => {
//             {
//                 console.log(doneTolak);
//             }
//             if (doneTerima || doneTolak) {
//                 setAllDone(true);
//             }
//         }, 4000);
//         return (
//             <Button
//                 className="ksu-button-custom"
//                 variant="contained"
//                 disableElevation
//             >
//                 <img
//                     src="/icons/check-white.gif"
//                     alt="check-red"
//                     height="20px"
//                 />
//             </Button>
//         );
//     }
//     if (loadingTerima) {
//         return (
//             <LoadingButton loading color="primary" variant="contained">
//                 <span>Terima</span>
//             </LoadingButton>
//         );
//     }

//     return (
//         <Button
//             className="ksu-button-custom"
//             variant="contained"
//             disableElevation
//             onClick={() => PushData("terima", original.id)}
//         >
//             TERIMA
//         </Button>
//     );
// }
// function HandleTolakButton(original) {
//     if (doneTolak) {
//         setTimeout(() => {
//             {
//                 console.log(doneTolak);
//             }
//             if (doneTerima || doneTolak) {
//                 setAllDone(true);
//             }
//         }, 4000);
//         return (
//             <Button variant="outlined" color="error" disableElevation>
//                 <img
//                     src="/icons/check-red.gif"
//                     alt="check-red"
//                     height="20px"
//                 />
//             </Button>
//         );
//     }
//     if (loadingTolak) {
//         return (
//             <LoadingButton loading color="primary" variant="contained">
//                 <span>Terima</span>
//             </LoadingButton>
//         );
//     }

//     return (
//         <Button
//             variant="outlined"
//             color="error"
//             disableElevation
//             onClick={() => PushData("tolak", original.id)}
//         >
//             TOLAK
//         </Button>
//     );
// }

// // function HandleTolak() {
// //     setLoadingTolak(true);
// //     PushData("tolak", pengajuanAnggota.id, setLoadingTolak);
// // }

// return (
//     <section className="ksu-wrapper form ">
//         <h1>Detail Pendaftaran Anggota - {pengajuanAnggota.id}</h1>
//         <div className="ksu-card full-width gap">
//             <h2>Data Anggota</h2>
//             <div className="space-between align-start">
//                 <div className="inner-card left">
//                     <div className="image-wrapper-details">
//                         {/* nanti di isi sama image poto orangnya */}
//                         {true ? (
//                             <img
//                                 src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
//                                 alt="person-image"
//                             />
//                         ) : (
//                             <img
//                                 src="https://i.stack.imgur.com/l60Hf.png"
//                                 alt="default-pp-image"
//                             />
//                         )}
//                         <div className="name-wrapper">
//                             <p>
//                                 <strong>{pengajuanAnggota.username}</strong>
//                             </p>
//                             <p>Member ID</p>
//                         </div>
//                     </div>
//                     {label1.map((item, index) => (
//                         <div key={index}>
//                             <p>
//                                 <strong>{item.label}</strong>
//                             </p>
//                             <p>{pengajuanAnggota[item.name]}</p>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="inner-card right">
//                     {label2.map((item, index) => (
//                         <div key={index}>
//                             <p>
//                                 <strong>{item.label}</strong>
//                             </p>
//                             <p>{pengajuanAnggota[item.name]}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="space-between end">
//                 <ReactToPrint
//                     trigger={() => (
//                         <Button>
//                             Print Detail &nbsp;
//                             <LocalPrintshopRoundedIcon />
//                         </Button>
//                     )}
//                     content={() => componentRef}
//                 />
//             </div>
//         </div>
//         {console.log(messageDitolak)}

//         <div style={{ display: "none" }}>
//             <div
//                 className="ksu-card full-width gap no-padding to-print"
//                 ref={(el) => (componentRef = el)}
//             >
//                 <br />
//                 <div className="space-between header">
//                     <div className="inner-card left">
//                         <div className="logo-print">
//                             <img
//                                 src="/drawer-header-left.png"
//                                 alt="logo"
//                                 className="logo-left"
//                             />
//                             <img
//                                 src="/drawer-header-right.png"
//                                 alt="logo"
//                                 className="logo-right"
//                             />
//                         </div>
//                     </div>
//                     <div className="inner-card right">
//                         <p>
//                             <strong>PERMOHONAN MENJADI ANGGOTA</strong>
//                         </p>
//                     </div>
//                 </div>
//                 <br />
//                 <h2>Data Anggota</h2>
//                 <div className="space-between align-start">
//                     <div className="inner-card left">
//                         <div className="image-wrapper-details">
//                             {/* nanti di isi sama image poto orangnya */}
//                             {true ? (
//                                 <img
//                                     src="https://csui2020.github.io/static/img/buku_angkatan/XL09.jpg"
//                                     alt="person-image"
//                                 />
//                             ) : (
//                                 <img
//                                     src="https://i.stack.imgur.com/l60Hf.png"
//                                     alt="default-pp-image"
//                                 />
//                             )}
//                             <div className="name-wrapper">
//                                 <p>
//                                     <strong>
//                                         {pengajuanAnggota.username}
//                                     </strong>
//                                 </p>
//                                 <p>Member ID</p>
//                             </div>
//                         </div>
//                         {label1.map((item, index) => (
//                             <div key={index}>
//                                 <p>
//                                     <strong>{item.label}</strong>
//                                 </p>
//                                 <p>{pengajuanAnggota[item.name]}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="inner-card right">
//                         {label2.map((item, index) => (
//                             <div key={index}>
//                                 <p>
//                                     <strong>{item.label}</strong>
//                                 </p>
//                                 <p>{pengajuanAnggota[item.name]}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <br />
//                 <br />
//                 <br />
//                 <br />
//                 <div className="tanda-tangan space-between align-start">
//                     <div className="inner-card left">
//                         <p>
//                             <strong>Cap Jempol</strong>
//                         </p>
//                         <br />
//                         <br />
//                         <br />
//                         <div className="line"></div>
//                     </div>
//                     <div className="inner-card right">
//                         <p>
//                             <strong>Tanda Tangan</strong>
//                         </p>
//                         <br />
//                         <br />
//                         <br />
//                         <div className="wrapper">
//                             <div className="inner">
//                                 <div className="line"></div>
//                             </div>
//                             <div className="inner">
//                                 <div className="line"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="ksu-card full-width gap">
//             {pengajuanAnggota.statusPengajuan == "Pengajuan Diterima" ||
//             pengajuanAnggota.statusPengajuan == "Ditolak" ? (
//                 <></>
//             ) : (
//                 <>
//                     {allDone != true ? (
//                         <>
//                             <h2>Tombol Aksi</h2>
//                             <div className="space-between align-start">
//                                 <div className="inner-card left">
//                                     <p>
//                                         <strong>
//                                             Lanjutkan Proses Pendaftaran
//                                         </strong>
//                                     </p>
//                                     {HandleTerimaButton(pengajuanAnggota)}
//                                 </div>
//                                 <div className="inner-card right">
//                                     <p>
//                                         <strong>Tolak Permohonan</strong>
//                                     </p>
//                                     <TextField
//                                         id="outlined-basic"
//                                         label="Alasan penolakan"
//                                         color="error"
//                                         multiline
//                                         fullWidth
//                                         onBlur={(e) => {
//                                             setMessageDitolak(
//                                                 e.target.value
//                                             );
//                                         }}
//                                     />
//                                     {HandleTolakButton(pengajuanAnggota)}
//                                 </div>
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             {pengajuanAnggota.statusPengajuan ==
//                             "Pengajuan Diterima" ? (
//                                 <CheckIcon />
//                             ) : (
//                                 <>
//                                     <p>
//                                         <strong>
//                                             Pengajuan Sudah Diterima
//                                         </strong>
//                                     </p>
//                                 </>
//                             )}
//                         </>
//                     )}
//                 </>
//             )}
//         </div>
//     </section>
// );
// }

// export const getStaticPaths = async () => {
//     const res = await fetch("http://localhost:8080/pengajuan-anggota/");
//     const data = await res.json();

//     const paths = data.map((item) => {
//         return {
//             params: { id: item.id.toString() },
//         };
//     });
//     return {
//         paths,
//         fallback: false,
//     };
// };

// export const getStaticProps = async (context) => {
//     const id = context.params.id;
//     const res = await fetch("http://localhost:8080/pengajuan-anggota/" + id);
//     const data = await res.json();
//     console.log(id);
//     console.log(data);
//     return {
//         props: {
//             pengajuanAnggota: data,
//         },
//     };
// };
