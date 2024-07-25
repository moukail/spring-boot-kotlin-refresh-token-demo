import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {TransitionProps} from "@mui/material/transitions";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteAuthor} from "../../services/author.service.ts";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog( {openDialog, closeDialog, selectedAuthor, openSnackbar}) {
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: deleteAuthor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authors'] });
            openSnackbar("Author successfully deleted");
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const handleDelete = () => {
        mutate(selectedAuthor._links.self.href)
        closeDialog();
    }

    return (
        <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            onClose={closeDialog}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Delete Author"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}