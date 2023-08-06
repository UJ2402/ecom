import { Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from '@mui/icons-material/Facebook';
const Footer = () => {
  return (
    <footer>
  <Grid
    sx={{ pt: 22 }}
    container
    direction="row"
    alignItems="center"
    justifyContent="center"
    spacing={7}
  >
    <Grid item>
      <Typography variant="h6">About us</Typography>
    </Grid>
    <Grid item>
      <Typography variant="h6">Help</Typography>
    </Grid>
    <Grid item>
      <Typography variant="h6">Terms of Service</Typography>
    </Grid>
  </Grid>

  <Grid
    direction="column"
    container
    alignItems="center"
    justifyContent="center"
  >
    <Grid item>
      <Stack direction="row">
        <IconButton>
          <InstagramIcon />
        </IconButton>
        <IconButton>
          <TwitterIcon />
        </IconButton>
        <IconButton>
          <FacebookIcon />
        </IconButton>
      </Stack>
    </Grid>
    <Divider variant="middle" sx={{ my: 2, width: '100%', height: '1px', backgroundColor: 'black' }} />
    <Typography >&copy; {new Date().getFullYear()} Vastra. All rights reserved.</Typography>
  </Grid>
</footer>
  );
};

export default Footer;
