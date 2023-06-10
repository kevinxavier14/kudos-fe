import React from "react";

export const GlobalFilter = ({filter, setFilter}) => {
    return (
        <span>
            Cari: {' '}
            <input value={filter || ''}
            onChange={e => setFilter(e.target.value)}></input>
        </span>
    );
}