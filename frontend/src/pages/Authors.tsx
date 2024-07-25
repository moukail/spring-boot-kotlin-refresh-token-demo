import {Grid, Paper, Snackbar} from "@mui/material";
import AuthorList from "../components/author/AuthorList.tsx";
import AuthorForm from "../components/author/AuthorForm.tsx";
import {useState} from "react";
import {Author} from "../types/author.type.ts";
import DeleteDialog from "../components/author/DeleteDialog.tsx";
import * as React from "react";

export default function Authors() {

    const [selectEditAuthor, setSelectEditAuthor] = useState<Author | null>(null);
    const [selectDeleteAuthor, setSelectDeleteAuthor] = useState<Author | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    const handleEdit = (author: Author) => {
        setSelectEditAuthor(author);
    }

    const handleSnackBar = (message: string) => {
        setOpenSnackbar(true);
        setSnackbarMessage(message)
    }

    const handleDelete = (author: Author) => {
        setSelectDeleteAuthor(author);
        setOpenDeleteDialog(true);
    }

    return(
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <h1>Authors</h1>
                        <AuthorList onEdit={handleEdit} onDelete={handleDelete} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <AuthorForm selectedAuthor={selectEditAuthor} resetFrom={() => setSelectEditAuthor(null)} openSnackbar={handleSnackBar} />
                    </Paper>
                </Grid>
            </Grid>
            <DeleteDialog openDialog={openDeleteDialog} closeDialog={() => setOpenDeleteDialog(false)}  openSnackbar={handleSnackBar} selectedAuthor={selectDeleteAuthor}></DeleteDialog>
            <Snackbar
                open={openSnackbar}
                //TransitionComponent={Transition}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </>
    );
}