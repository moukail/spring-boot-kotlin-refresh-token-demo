import * as React from 'react';
import {useEffect, useState} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Box from "@mui/material/Box";
import {DateField} from "@mui/x-date-pickers";
import moment from "moment";
import {Author} from "../../types/author.type.ts";
import {addAuthor, updateAuthor} from "../../services/author.service.ts";

export default function AuthorForm({ selectedAuthor, resetFrom, openSnackbar }) {

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: selectedAuthor ? updateAuthor : addAuthor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authors'] });
            resetFrom()
            openSnackbar("Author successfully saved");
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const [author, setAuthor] = useState<Author>({
        firstName: '',
        lastName: '',
        birthday: '',
        gender: 'UNKNOWN'
    });

    useEffect(() => {
        if (selectedAuthor) {
            setAuthor(selectedAuthor)
        }else {
            setAuthor({firstName: '', lastName: '', birthday: '', gender: 'UNKNOWN'});
        }
    }, [selectedAuthor]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAuthor({...author, [name]: value});
    }

    const handleBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor({...author, ["birthday"]: event});
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedAuthor) {
            mutate({link: selectedAuthor._links.self.href, author: author})
        }else {
            mutate(author)
        }

        setAuthor({firstName: '', lastName: '', birthday: '', gender: 'UNKNOWN'});
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            {
                selectedAuthor ? <h1>Edit Author</h1> : <h1>Add Author</h1>
            }
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={6}>
                    <TextField
                        //fullWidth
                        label="First name"
                        //helperText="Incorrect entry."
                        variant="standard"
                        name="firstName"
                        onChange={handleChange}
                        value={author.firstName}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <TextField
                        label="Last name"
                        //helperText="Incorrect entry."
                        variant="standard"
                        name="lastName"
                        onChange={handleChange}
                        value={author.lastName}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <DateField
                        label="Birthday"
                        //helperText="Incorrect entry."
                        variant="standard"
                        name="birthday"
                        onChange={handleBirthdayChange}
                        value={moment(author.birthday)}
                        format="D-MM-YYYY"
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="gender"
                            value={author.gender}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="FEMALE" control={<Radio/>} label="Female"/>
                            <FormControlLabel value="MALE" control={<Radio/>} label="Male"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <LoadingButton
                        type="submit"
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        variant="outlined"
                    >
                        Save
                    </LoadingButton>
                    <LoadingButton
                        type="reset"
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        variant="outlined"
                        onClick={resetFrom}
                    >
                        Reset
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}
