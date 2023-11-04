import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import UserIcon from '@untitled-ui/icons-react/build/esm/User01';
import CalendarIcon from '@untitled-ui/icons-react/build/esm/Calendar';
import MarkerPinIcon from '@untitled-ui/icons-react/build/esm/MarkerPin01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

export const ClubCard = (props) => {
  const { club } = props;

  return (
    <Card

      sx={{

        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <CardMedia
        component={RouterLink}
        href={"/clubs/basketball"}
        image={club.media}
        sx={{ height: 180 }}
      />
      <CardContent>
        <Link
          color="text.primary"
          component={RouterLink}
          href={"/clubs/basketball"}
          underline="none"
          variant="subtitle1"
        >
          {club.title}
        </Link>

        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={{ mt: 1 }}
        >
          <SvgIcon>
            <UserIcon color="text.secondary" />
          </SvgIcon>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {club.members} members
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={{ mt: 1 }}
        >
          <SvgIcon>
            <CalendarIcon color="text.secondary" />
          </SvgIcon>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {club.training}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={{ mt: 1 }}
        >
          <SvgIcon>
            <MarkerPinIcon color="text.secondary" />
          </SvgIcon>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {club.location}
          </Typography>
        </Stack>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
        }}
      >
        <Button
          color="inherit"
          component={RouterLink}
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          href={"/explore"}
        >
          Find out more
        </Button>
      </Box>
    </Card>
  );
};

ClubCard.propTypes = {
  club: PropTypes.object.isRequired,
};
