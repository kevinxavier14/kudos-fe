import { getCookie } from "@/hooks/Cookies";
import { Button, TextField } from "@mui/material";
import Link from "next/link";

export default function LandingPage() {
    return (
        <section className="login-container">
            <div className="login-right-container">
                <div className="login-inner-container">
                    <h1>Selamat Datang</h1>

                    <Link
                        href="/pendaftaran/form"
                        style={{ textDecoration: "none", width: "100%" }}
                    >
                        <Button
                            variant="contained"
                            disableElevation
                            fullWidth={true}
                        >
                            Pendaftaran Anggota
                        </Button>
                    </Link>
                    <Link
                        href="/login/form"
                        style={{ textDecoration: "none", width: "100%" }}
                    >
                        <Button
                            variant="outlined"
                            disableElevation
                            fullWidth={true}
                        >
                            Masuk
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="login-image-container">
                <img
                    src="https://cdn.discordapp.com/attachments/1000437373240361102/1091343629748011028/logo_10_x.png"
                    alt="Login-image"
                ></img>
            </div>
        </section>
    );
}
