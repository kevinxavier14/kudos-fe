import { getCookie, setCookie, urlbase } from "@/hooks/Cookies";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";

export default function LandingPage({ context }) {
    const router = useRouter();

    const [finalAnswer, setFinalAnswer] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function onPostToSpring(context) {
        try {
            const response = axios
                .post(urlbase() + "/api/v1/authenticate", finalAnswer)
                .then((response) => {
                    // console.log(response);
                    const tokenStore = "Bearer " + response.data.token;

                    setCookie("token", tokenStore, { path: "/" });
                    setCookie("role", response.data.role, { path: "/" });
                    setCookie("username", response.data.username, {
                        path: "/",
                    });
                    setCookie("id", response.data.id, { path: "/" });

                    console.log(getCookie("token"));
                    router.push("/");

                    // Do other things with the token as needed
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="login-container">
            <div className="login-image-container">
                <img
                    src="https://cdn.discordapp.com/attachments/818495075889315840/1085486795229245460/Illustration.png"
                    alt="Login-image"
                ></img>
            </div>

            <div className="login-right-container">
                <div className="login-inner-container">
                    <h1>Login</h1>
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="username"
                        variant="outlined"
                        fullWidth
                        multiline
                        onBlur={(e) => {
                            setFinalAnswer((prevState) => ({
                                ...prevState,
                                username: e.target.value,
                            }));
                        }}
                    />
                    {/* <TextField
                        id="outlined-password-input"
                        type="password"
                        label="password"
                        variant="outlined"
                        fullWidth
                        onKeyDown={(e) => {
                            onPostToSpring(context);
                        }}
                        onChange={(e) => {
                            setFinalAnswer((prevState) => ({
                                ...prevState,
                                password: e.target.value,
                            }));
                        }}
                    /> */}
                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            onKeyDown={(e) => {
                                onPostToSpring(context);
                            }}
                            onChange={(e) => {
                                setFinalAnswer((prevState) => ({
                                    ...prevState,
                                    password: e.target.value,
                                }));
                            }}
                        />
                    </FormControl>
                    <br />
                    <Button
                        variant="contained"
                        disableElevation
                        fullWidth
                        onClick={() => {
                            onPostToSpring(context);
                        }}
                    >
                        Login
                    </Button>
                    <br />
                    <p style={{ color: "#909090" }}>
                        Belum punya akun?{" "}
                        <Link
                            href="/pendaftaran/form"
                            style={{ color: "#494bc1" }}
                        >
                            Daftar anggota
                        </Link>{" "}
                        sekarang!
                    </p>
                </div>
            </div>
        </section>
    );
}
