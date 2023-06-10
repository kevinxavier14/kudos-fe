// next package
import Router, { useRouter } from "next/router";

// DIY components
import MiniDrawer from "@/components/Drawer";
import Loader from "@/components/Loader/Loader";
import { Box, ThemeProvider, createTheme } from "@mui/material";

/// scss
import "@/styles/globals.scss";

// home
import "@/styles/home.scss";
import "@/styles/login.scss";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/hooks/Cookies";
import LoaderTable from "../components/Loader/LoaderTable";
import { SkeletonTheme } from "react-loading-skeleton";
import { AnimatePresence } from "framer-motion";
import LayoutMotion from "../components/Layout/LayoutMotion";

const theme = createTheme({
    palette: {
        primary: {
            main: "#494bc1",
            // main: "#4c4da1",
            // main: "#b82473",
        },
        // secondary: {
        //     main: "#ffffff",
        // },
    },
});

export default function App({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [showComponent, setShowComponent] = useState(false);
    const [firstTimeShown, setFirstTimeShown] = useState(false);
    let bodyWithoutMarginDrawer = false;

    useEffect(() => {
        const listIgnore = ["/login", "/login/form", "/pendaftaran/form"];
        setFirstTimeShown(true);

        if (getCookie("token") === undefined) {
            if (listIgnore.includes(router.pathname)) {
                // ignore
            } else {
                router.push("/login");
            }
        }
    }, []);

    Router.events.on("routeChangeStart", (url) => {
        console.log("Route is changing");
        setLoading(true);
    });
    Router.events.on("routeChangeComplete", (url) => {
        console.log("Route changed");
        setLoading(false);
    });

    function HandleWhichRouter(value) {
        let listShow = [];
        if (value == "drawer") {
            listShow = ["/login", "/login/form", "/pendaftaran/form"];
        } else if (value == "loader") {
            listShow = [
                "/pinjaman/permohonan",
                "/pinjaman",
                "/pinjaman/ditolak",
                "/reminder",
                "/user",
                "/pendaftaran",
            ];
        }

        if (listShow.includes(router.pathname)) {
            return false;
        }
        return true;
    }

    return (
        <ThemeProvider theme={theme}>
            <AnimatePresence mode="wait" initial={false}>
                <Box sx={{ display: "flex" }}>
                    {firstTimeShown ? (
                        HandleWhichRouter("drawer") && (
                            <MiniDrawer role={getCookie("role")} />
                        )
                    ) : (
                        <></>
                    )}
                    <SkeletonTheme baseColor="#f4f4f4" highlightColor="#e5e5e5">
                        {loading ? (
                            HandleWhichRouter("loader") ? (
                                <Loader height={"full"} />
                            ) : (
                                <LoaderTable />
                            )
                        ) : (
                            <LayoutMotion>
                                <Component {...pageProps} />
                            </LayoutMotion>
                        )}
                    </SkeletonTheme>
                </Box>
            </AnimatePresence>
        </ThemeProvider>
    );
}
