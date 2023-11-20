import PropTypes from 'prop-types';
import Settings04Icon from '@untitled-ui/icons-react/build/esm/Settings04';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography'
import BellIcon from '@untitled-ui/icons-react/build/esm/Bell01';

import { useSettings } from 'src/hooks/use-settings';


export const SignUpBanner = (props) => {
  const { handleJoinClub } = props;

  return (
    <Stack
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      spacing={4}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'primary.darkest' : 'primary.lightest',
        borderRadius: 2.5,
        p: 4,
      }}
      {...props}
    >
      <Box
        sx={{
          width: 200,
          '& img': {
            width: '100%',
            aspectRatio: 1,
            objectFit: "cover",
            borderRadius: '50%',
          },
        }}
      >
        <img src="/assets/clubs/badminton.jpeg" />
      </Box>
      <Box sx={{ flexGrow: 1 }}>

        <Typography
          color="text.primary"
          sx={{ mt: 2 }}
          variant="h6"
        >
          Join SIT Basketball Club to receive more updates!
        </Typography>
        <Typography
          color="text.primary"
          sx={{ mt: 1 }}
          variant="body1"
        >
          There are certain updates that only members could see! So join the club now to receive those updates as well!
        </Typography>
        {/*<Box sx={{ mt: 2 }}>*/}
        {/*  <Button*/}
        {/*    color="primary"*/}
        {/*    onClick={handleJoinClub}*/}
        {/*    startIcon={*/}
        {/*      <SvgIcon>*/}
        {/*        <BellIcon />*/}
        {/*      </SvgIcon>*/}
        {/*    }*/}
        {/*    variant="contained"*/}
        {/*  >*/}
        {/*    Join Club*/}
        {/*  </Button>*/}
        {/*</Box>*/}
      </Box>
    </Stack>
  );
};

SignUpBanner.propTypes = {
  onDismiss: PropTypes.func,
};
