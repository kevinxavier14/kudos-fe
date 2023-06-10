import React, { useState } from "react";
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from "react-table";
// import datas from "../data/mock-data-ksu.json";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import Link from "next/link";
import Chips from "./Chip";
import { Button } from "@mui/material";

import axios from "axios";
import { getCookie, urlbase } from "@/hooks/Cookies";
import { LoadingButton } from "@mui/lab";
import TableButonAksi from "./TableButtonAksi";

import { BasicColumnFilter } from "./ColumnFilter";
import { GlobalFilter } from "./GlobalFilter";

import FeedbacksPopup from "@/components/FeedbacksPopup";

// props
// type =
// headers = [{Header : "ID", accessor:"id"}]
// datas = [{accessor : "value"}]
// href = links to the page contoh href={"pendaftaran"} bakal jadi links domain.com/pendaftaran/id

/// contoh headers
const contohHeaders = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "First Name",
        accessor: "first_name",
    },
    {
        Header: "Last Name",
        accessor: "last_name",
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "Gender",
        accessor: "gender",
    },
    {
        Header: "University",
        accessor: "university",
    },
];

export default function Table(props) {
    const datas = props.datas;
    const columns = React.useMemo(() => props.headers, [props.headers]);
    // const defaultColumn = React.useMemo(
    //     () => ({
    //         // Let's set up our default Filter UI
    //         Filter: BasicColumnFilter,
    //     }),
    //     []
    // );

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow,
        state,
        setGlobalFilter
     } =
        useTable(
            { columns, data: datas, 
                // defaultColumn 
            },
            useGlobalFilter,
            useSortBy,
            usePagination,
            
        );

    const {globalFilter} = state;

    function PushData(type, id) {
        if (props.update) {
            axios
                .put(
                    `${urlbase()}/api/v1/${props.hrefApi}/${type}/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: getCookie("token"),
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios
                .post(
                    `${urlbase()}/api/v1/${props.hrefApi}/${type}/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: getCookie("token"),
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function HandleTerimaButton(original) {
        if (doneTerima) {
            setTimeout(() => {
                {
                    console.log(doneTolak);
                }
                if (doneTerima || doneTolak) {
                    setAllDone(true);
                }
            }, 4000);
            return (
                <Button
                    className="ksu-button-custom"
                    variant="contained"
                    disableElevation
                >
                    <img
                        src="/icons/check-white.gif"
                        alt="check-red"
                        height="20px"
                    />
                </Button>
            );
        }
        if (loadingTerima) {
            return (
                <LoadingButton loading color="primary" variant="contained">
                    <span>Terima</span>
                </LoadingButton>
            );
        }

        return (
            <Button
                className="ksu-button-custom"
                variant="contained"
                disableElevation
                onClick={() => PushData("terima", original.id)}
            >
                TERIMA
            </Button>
        );
    }
    function HandleTolakButton(original) {
        if (doneTolak) {
            setTimeout(() => {
                {
                    console.log(doneTolak);
                }
                if (doneTerima || doneTolak) {
                    setAllDone(true);
                }
            }, 4000);
            return (
                <Button variant="outlined" color="error" disableElevation>
                    <img
                        src="/icons/check-red.gif"
                        alt="check-red"
                        height="20px"
                    />
                </Button>
            );
        }
        if (loadingTolak) {
            return (
                <LoadingButton loading color="primary" variant="contained">
                    <span>Terima</span>
                </LoadingButton>
            );
        }

        return (
            <Button
                variant="outlined"
                color="error"
                disableElevation
                onClick={() => PushData("tolak", original.id)}
            >
                TOLAK
            </Button>
        );
    }

    function PushDataUser(type, role, id) {
        axios
            .post(
                `${urlbase()}/${props.hrefApi}/${type}/${role}/${id}`,
                {},
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const [feedbacksPopup, setFeedbacksPopup] = useState();

    function PushDataReminder(id) {
        axios
            .post(
                `${urlbase()}/api/v1/reminder/messagegateway/${id}`,
                {},
                {
                    headers: {
                        Authorization: getCookie("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
                setFeedbacksPopup(response)
            })
            .catch((error) => {
                console.error(error);
                setFeedbacksPopup(error);
            });
    }

    function HandleCell(header, text) {
        switch (header) {
            case "Status":
                return <Chips type={text.props.cell.value} />;
            case "Deadline":
                return <Chips type={text.props.cell.value} />;
            case "Jenis Jaminan":
                return (
                    <div className="jaminan-wrapper">
                        {text.props.cell.value.map((item, index) => (
                            <Chips type={item.jaminan} key={index} />
                        ))}
                    </div>
                );
            case "Aksi":
                return (
                    <TableButonAksi
                        original={text.props.row.original}
                        hrefWebsite={props.hrefWebsite}
                        hrefApi={props.hrefApi}
                    />
                );

            case "Aksi User":
                return (
                    <div className="table-button-wrapper">
                        <Link
                            href={`../${props.hrefWebsite}/detail/${text.props.row.original.username}`}
                        >
                            <Button
                                className="ksu-button-custom"
                                variant="outlined"
                                disableElevation
                            >
                                DETAIL
                            </Button>
                        </Link>

                        <Link
                            href={`../${props.hrefWebsite}/update/${text.props.row.original.username}`}
                        >
                            <Button
                                className="ksu-button-custom"
                                variant="contained"
                                disableElevation
                                onClick={() =>
                                    PushData(
                                        "tolak",
                                        text.props.row.original.role,
                                        text.props.row.original.id
                                    )
                                }
                            >
                                UPDATE
                            </Button>
                        </Link>
                        <Button
                            variant="outlined"
                            color="error"
                            disableElevation
                            onClick={() =>
                                PushDataUser(
                                    "delete",
                                    text.props.row.original.role.toLowerCase(),
                                    text.props.row.original.id
                                )
                            }
                        >
                            DELETE
                        </Button>
                    </div>
                );
            case "Aksi Reminder":
                return (
                    <div className="table-button-wrapper">
                    {console.log(feedbacksPopup)}
                    {feedbacksPopup ? (
                        <FeedbacksPopup
                            labelBerhasil={"Reminder berhasil dikirim"}
                            setFeedbacks={feedbacksPopup}
                            redirectTo={"/reminder"}
                        />
                    ) : (
                        <></>
                    )}
                        <Button
                            variant="outlined"
                            color="error"
                            disableElevation
                            onClick={() =>{
                                PushDataReminder(text.props.row.original.id),
                                setFeedbacksPopup(null)
                            }}
                        >
                            Remind
                        </Button>
                    </div>
                );
            case "Jumlah Pinjaman":
                return <p>Rp {text}</p>;
            default:
                return <p>{text}</p>;
        }
    }

    return (
        <div className="container">
            <></>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header") ==
                                        "Aksi Reminder" ||
                                    column.render("Header") == "Aksi User" ? (
                                        <p>Aksi</p>
                                    ) : (
                                        <p>
                                            {column.render("Header")}
                                            {/* <div>
                                                {column.canFilter
                                                    ? column.render("Filter")
                                                    : null}
                                            </div> */}
                                        </p>
                                    )}
                                    {/* <p>{column.render("Header")}</p> */}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <ArrowDropDownRoundedIcon />
                                            ) : (
                                                <ArrowDropUpRoundedIcon />
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                className="ksu-react-table-rows"
                                {...row.getRowProps()}
                                onClick={() => console.log(row.original)}
                            >
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>
                                        {" "}
                                        {props.isAksiUser ? (
                                            <Link
                                                className="wrapper-rows"
                                                href={`../${props.hrefWebsite}/detail/${row.original.username}`}
                                                key={row.index}
                                            ></Link>
                                        ) : (
                                            <Link
                                                className="wrapper-rows"
                                                href={`../${props.hrefWebsite}/${row.original.id}`}
                                                key={row.index}
                                            ></Link>
                                        )}
                                        {HandleCell(
                                            cell.column.Header,
                                            cell.render("Cell")
                                        )}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* <div className="next-prev-btn">
                <button onClick={previousPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
            </div> */}
        </div>
    );
}
