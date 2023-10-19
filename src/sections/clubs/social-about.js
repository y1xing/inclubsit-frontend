import PropTypes from 'prop-types';
import BookOpen01Icon from '@untitled-ui/icons-react/build/esm/BookOpen01';
import Briefcase01Icon from '@untitled-ui/icons-react/build/esm/Briefcase01';
import Home02Icon from '@untitled-ui/icons-react/build/esm/Home02';
import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";

export const SocialAbout = (props) => {
  const {
    currentCity,
    currentJobCompany,
    currentJobTitle,
    email,
    originCity,
    previousJobCompany,
    previousJobTitle,
    profileProgress,
    quote,
    ...other
  } = props;

  return (
    <Stack
      spacing={3}
      {...other}
    >

      <Card>
        <CardHeader title="About" />
        <CardContent>
          <Typography
            color="text.secondary"
            sx={{ mb: 2 }}
            variant="subtitle2"
          >
            &quot;
            {quote}
            &quot;
          </Typography>
          <List disablePadding>
            <ListItem
              disableGutters
              divider
            >
              <ListItemAvatar>
                <SvgIcon color="action">
                  <Briefcase01Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="subtitle2">
                    {currentJobTitle} at{' '}
                    <Link
                      color="text.primary"
                      href="#"
                      variant="subtitle2"
                    >
                      {currentJobCompany}
                    </Link>
                  </Typography>
                }
                secondary={
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    {previousJobTitle}{' '}

                  </Typography>
                }
              />
            </ListItem>

            <ListItem
              disableGutters
              divider
            >
              <ListItemAvatar>
                <SvgIcon color="action">
                  <Home02Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Link
                    color="text.primary"
                    href="#"
                    variant="subtitle2"
                  >
                    @sit.basketball
                  </Link>} />

            </ListItem>
            <ListItem disableGutters>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <Mail01Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText primary={
                <Link
                color="text.primary"
                href="#"
                variant="subtitle2"
              >
                {email}
              </Link>} />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/*Club Leaders*/}

      <Card>
        <CardHeader title="Club Leaders" />
        <CardContent>

          <List disablePadding>
            { [1, 2, 3, 4, 5].map((value) => (
              <ListItem
                disableGutters
                divider
              >
                <ListItemAvatar>
                  <Avatar
                    src={'/assets/avatars/avatar-carson-darrin.png'}
                  />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="subtitle2">
                      President

                    </Typography>
                  }
                  secondary={
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Ng Zi Bin, Applied Artificial Intelligence, Y2
                    </Typography>
                  }
                />
              </ListItem>
            ))}

          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};

SocialAbout.propTypes = {
  currentCity: PropTypes.string.isRequired,
  currentJobCompany: PropTypes.string.isRequired,
  currentJobTitle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  originCity: PropTypes.string.isRequired,
  previousJobCompany: PropTypes.string.isRequired,
  previousJobTitle: PropTypes.string.isRequired,
  profileProgress: PropTypes.number.isRequired,
  quote: PropTypes.string.isRequired,
};
