import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import { useRouter } from "next/router";

// mui icons
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

import AssignmentReturnRoundedIcon from "@mui/icons-material/AssignmentReturnRounded";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import AssignmentLateRoundedIcon from "@mui/icons-material/AssignmentLateRounded";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

// type 2
import {
    HiViewGrid,
    HiOutlineViewGrid,
    HiDocumentText,
    HiOutlineDocumentText,
    HiDocumentAdd,
    HiOutlineDocumentAdd,
    HiUserAdd,
    HiOutlineUserAdd,
    HiDocumentRemove,
    HiOutlineDocumentRemove,
} from "react-icons/hi";
import { HiCog6Tooth, HiOutlineCog6Tooth } from "react-icons/hi2";

import {
    AiFillFileExclamation,
    AiOutlineFileExclamation,
} from "react-icons/ai";

import { logout, removeCookie, setCookie, getCookie } from "@/hooks/Cookies";

import { Squash as FadeHamburger } from "hamburger-react";

import ConfirmationPopup from "./ConfirmationPopup";
import { useEffect } from "react";

const drawerWidth = 280;
// const drawerWidth = "fit-content";

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.ease,
        duration: 500,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.ease,
        duration: 500,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(8)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function MiniDrawer({ role, bodyWithoutMarginDrawer }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [popupLogout, setPopupLogout] = React.useState(false);
    const router = useRouter();

    useEffect(() => {
        setOpen(getCookie("drawer-state") == "true");
    }, []);

    if (role == undefined) {
        return "";
    }

    const handleDrawerOpen = () => {
        setOpen(true);
        setCookie("drawer-state", true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setCookie("drawer-state", false);
    };

    function HandleLabel(position) {
        let LABEL1 = [];
        let LABEL2 = [];
        let LABEL3 = [];

        if (role == "ANGGOTA") {
            LABEL1 = [
                // {
                //     name: "Dashboard",
                //     href: "/",
                //     icon: <HiViewGrid />,
                //     iconNon: <HiOutlineViewGrid />,
                // },
            ];
            LABEL2 = [
                {
                    name: "Semua Pinjaman",
                    href: "/pinjaman",
                    icon: <HiDocumentText />,
                    iconNon: <HiOutlineDocumentText />,
                },
                {
                    name: "Permohonan Pinjaman",
                    href: "/pinjaman/permohonan",
                    icon: <HiDocumentAdd />,
                    iconNon: <HiOutlineDocumentAdd />,
                },
                // {
                //     name: "Pinjaman Ditolak",
                //     href: "/pinjaman/ditolak",
                //     icon: <HiDocumentRemove />,
                //     iconNon: <HiOutlineDocumentRemove />,
                // },
                {
                    name: "Reminder",
                    href: "/reminder",
                    icon: <AiFillFileExclamation />,
                    iconNon: <AiOutlineFileExclamation />,
                },
            ];
            LABEL3 = [
                {
                    name: "Ubah Profil",
                    href: "/profile",
                    icon: <HiCog6Tooth />,
                    iconNon: <HiOutlineCog6Tooth />,
                },
            ];
        } else if (role == "STAFF") {
            LABEL1 = [
                {
                    name: "Dashboard",
                    href: "/",
                    icon: <HiViewGrid />,
                    iconNon: <HiOutlineViewGrid />,
                },
                {
                    name: "Pengajuan Anggota",
                    href: "/pendaftaran",
                    icon: <HiUserAdd />,
                    iconNon: <HiOutlineUserAdd />,
                },
            ];
            LABEL2 = [
                {
                    name: "Semua Pinjaman",
                    href: "/pinjaman",
                    icon: <HiDocumentText />,
                    iconNon: <HiOutlineDocumentText />,
                },
                {
                    name: "Permohonan Pinjaman",
                    href: "/pinjaman/permohonan",
                    icon: <HiDocumentAdd />,
                    iconNon: <HiOutlineDocumentAdd />,
                },
                // {
                //     name: "Pinjaman Ditolak",
                //     href: "/pinjaman/ditolak",
                //     icon: <HiDocumentRemove />,
                //     iconNon: <HiOutlineDocumentRemove />,
                // },
                {
                    name: "Reminder",
                    href: "/reminder",
                    icon: <AiFillFileExclamation />,
                    iconNon: <AiOutlineFileExclamation />,
                },
            ];
            LABEL3 = [
                {
                    name: "Ubah Profil",
                    href: "/profile",
                    icon: <HiCog6Tooth />,
                    iconNon: <HiOutlineCog6Tooth />,
                },
            ];
        } else {
            LABEL1 = [
                {
                    name: "Dashboard",
                    href: "/",
                    icon: <HiViewGrid />,
                    iconNon: <HiOutlineViewGrid />,
                },
                {
                    name: "Pengajuan Anggota",
                    href: "/pendaftaran",
                    icon: <HiUserAdd />,
                    iconNon: <HiOutlineUserAdd />,
                },
            ];
            LABEL2 = [
                {
                    name: "Semua Pinjaman",
                    href: "/pinjaman",
                    icon: <HiDocumentText />,
                    iconNon: <HiOutlineDocumentText />,
                },
                {
                    name: "Permohonan Pinjaman",
                    href: "/pinjaman/permohonan",
                    icon: <HiDocumentAdd />,
                    iconNon: <HiOutlineDocumentAdd />,
                },
                // {
                //     name: "Pinjaman Ditolak",
                //     href: "/pinjaman/ditolak",
                //     icon: <HiDocumentRemove />,
                //     iconNon: <HiOutlineDocumentRemove />,
                // },
                {
                    name: "Reminder",
                    href: "/reminder",
                    icon: <AiFillFileExclamation />,
                    iconNon: <AiOutlineFileExclamation />,
                },
            ];
            LABEL3 = [
                {
                    name: "Admin",
                    href: "/user",
                    icon: <AdminPanelSettingsRoundedIcon />,
                    iconNon: <AdminPanelSettingsOutlinedIcon />,
                },
                {
                    name: "Ubah Profil",
                    href: "/profile",
                    icon: <HiCog6Tooth />,
                    iconNon: <HiOutlineCog6Tooth />,
                },
            ];
        }

        switch (position) {
            case 1:
                return LABEL1;
            case 2:
                return LABEL2;
            case 3:
                return LABEL3;
        }
    }

    return (
        <>
            <CssBaseline />

            <Drawer variant="permanent" transitionDuration={500} open={open}>
                <div className={`outer-drawer-wrapper `}>
                    <div className="upper">
                        <DrawerHeader>
                            <div
                                className="drawer-minimize-wrapper"
                                style={
                                    !open
                                        ? {
                                              //   justifyContent: "center",
                                              margin: "4px",
                                          }
                                        : {}
                                }
                            >
                                <div
                                    className={`button-hamburger`}
                                    onClick={(e) =>
                                        open
                                            ? handleDrawerClose()
                                            : handleDrawerOpen()
                                    }
                                >
                                    <FadeHamburger size={20} toggled={open} />
                                </div>
                                {/* <IconButton
                                    color="blue"
                                    aria-label="open drawer"
                                    onClick={(e) =>
                                        open
                                            ? handleDrawerClose()
                                            : handleDrawerOpen()
                                    }
                                    style={{}}
                                    edge="start"
                                >
                                    <FadeHamburger size={20} />
                                    <MenuIcon />
                                </IconButton> */}
                            </div>
                            {/* {open ? (
                                <div className="drawer-minimize-wrapper">
                                    <div
                                        className="drawer-minimize-btn"
                                        onClick={(e) => handleDrawerClose()}
                                    >
                                        <ChevronLeftIcon />

                                        <p>Minimize</p>
                                    </div>
                                </div>
                            ) : (
                                <IconButton
                                    color="blue"
                                    aria-label="open drawer"
                                    onClick={(e) => handleDrawerOpen()}
                                    edge="start"
                                    sx={{
                                        ...(open && { display: "none" }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )} */}
                        </DrawerHeader>
                        <div className={`logo ${open ? "opened" : ""}`}>
                            <img
                                className="logo-1"
                                src="/drawer-header-left.png"
                                alt="logo"
                            />
                            {open ? (
                                <img
                                    className="logo-2"
                                    src="/drawer-header-right.png"
                                    alt="logo"
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                        <Divider variant="middle" />
                        <List>
                            {HandleLabel(1).map((item, index) => (
                                <div className="outer-wrapper-link" key={index}>
                                    <Link href={item.href} legacyBehavior>
                                        <div
                                            className={`drawer-wrapper-link ${
                                                router.pathname ==
                                                `${item.href}`
                                                    ? "active"
                                                    : ""
                                            } ${open ? "opened" : ""}`}
                                        >
                                            {router.pathname == item.href ? (
                                                <div className="icon">
                                                    {item.icon}
                                                </div>
                                            ) : (
                                                <div className="icon">
                                                    {item.iconNon}
                                                </div>
                                            )}

                                            {open ? (
                                                <p
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {item.name}
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </List>
                        <Divider variant="middle" />
                        <List>
                            {HandleLabel(2).map((item, index) => (
                                <div
                                    className="outer-wrapper-link"
                                    key={index}
                                    // onClick={() => handleDrawerClose()}
                                >
                                    <Link href={item.href} legacyBehavior>
                                        <div
                                            className={`drawer-wrapper-link ${
                                                router.pathname ==
                                                `${item.href}`
                                                    ? "active"
                                                    : ""
                                            } ${open ? "opened" : ""}`}
                                        >
                                            {router.pathname == item.href ? (
                                                <div className="icon">
                                                    {item.icon}
                                                </div>
                                            ) : (
                                                <div className="icon">
                                                    {item.iconNon}
                                                </div>
                                            )}
                                            {open ? (
                                                <p
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {item.name}
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </List>
                        <Divider variant="middle" />
                        <List>
                            {HandleLabel(3).map((item, index) => (
                                <div
                                    className="outer-wrapper-link"
                                    key={index}
                                    // onClick={() => handleDrawerClose()}
                                >
                                    <Link href={item.href} legacyBehavior>
                                        <div
                                            className={`drawer-wrapper-link ${
                                                router.pathname ==
                                                `${item.href}`
                                                    ? "active"
                                                    : ""
                                            } ${open ? "opened" : ""}`}
                                        >
                                            {router.pathname == item.href ? (
                                                <div className="icon">
                                                    {item.icon}
                                                </div>
                                            ) : (
                                                <div className="icon">
                                                    {item.iconNon}
                                                </div>
                                            )}
                                            {open ? (
                                                <p
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {item.name}
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </List>
                    </div>
                    <div className={`lower ${open ? "opened" : ""}`}>
                        <Link
                            href="/profile"
                            style={{
                                cursor: "pointer",
                                textDecoration: "none",
                            }}
                        >
                            <div className="profile">
                                {/* <img
                                    src="https://i.stack.imgur.com/l60Hf.png"
                                    alt="default-pp-image"
                                /> */}
                                {open ? (
                                    <div className="profile-name">
                                        <p>{getCookie("username")}</p>
                                        <small>{getCookie("role")}</small>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Link>
                        <div
                            className="logout-icon"
                            onClick={() => {
                                // logout();
                                // router.push("/login");
                                setPopupLogout(true);
                            }}
                        >
                            <LogoutRoundedIcon />
                        </div>
                    </div>
                </div>
            </Drawer>
            {popupLogout && (
                <ConfirmationPopup
                    textH1={"Peringatan!"}
                    textP1={`Anda akan logout dan seluruh session anda akan terhapus.`}
                    textP2={`Apakah anda yakin ingin melakukan log out?`}
                    labelButtonAtas={"Ya, Log Out"}
                    functionDiButtonAtas={logout}
                    linkTujuan={"/login"}
                    setState={setPopupLogout}
                    setStateConditionKembali={false}
                />
            )}
        </>
    );
}
