import * as React from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import {getAuthors} from "../../services/author.service.ts";

export default function AuthorList({onEdit, onDelete}) {

    const { data, error, isLoading } = useQuery({
        queryKey:["authors"],
        queryFn: getAuthors,
    });

    const colums: GridColDef[] = [
        {field: 'firstName', headerName: 'First Name'},
        {field: 'lastName', headerName: 'Last Name'},
        {field: 'gender', headerName: 'Gender'},
        {field: 'birthday', headerName: 'birthday'},
        {field: 'delete', headerName: '', sortable:false, filterable:false, disableColumnMenu:true, renderCell:(params:GridCellParams) => (
            <>
                <Tooltip title="Delete">
                    <IconButton size="small" aria-label="delete" onClick={() => onDelete(params.row)}><DeleteIcon fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton size="small" aria-label="edit" onClick={() => onEdit(params.row)}><EditIcon fontSize="small" /></IconButton>
                </Tooltip>
            </>
            )
        },
    ]

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (error) {
        return <span>{error.message}</span>
    }

    return (
        <>
            <DataGrid columns={colums} rows={data} getRowId={row => row._links.self.href}/>
        </>
    )
}

