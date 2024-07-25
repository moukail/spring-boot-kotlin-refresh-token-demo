import { Grid, Paper } from "@mui/material";

export default function Dashboard() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >

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

                </Paper>
            </Grid>
        </Grid>
    )
}
