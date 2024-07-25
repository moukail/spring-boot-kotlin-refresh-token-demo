import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Home() {

  return (
      <>
          <Typography variant="h2" component="h1" gutterBottom>
              Home
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
              {'Pin a footer to the bottom of the viewport.'}
              {'The footer will move as the main element of the page grows.'}
          </Typography>
          <Typography variant="body1">Sticky footer placeholder.</Typography>
      </>
  )
}
