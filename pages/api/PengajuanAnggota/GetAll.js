import { urlbase } from "@/hooks/Cookies";
import axios from "axios";
import { useState } from "react";

export const getAllPengajuanAnggota = async () => {
    return axios
        .get(`${urlbase()}/pengajuan-anggota/`)
        .then((response) => {
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};
