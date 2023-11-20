import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';
import HeartIcon from '@untitled-ui/icons-react/build/esm/Heart';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { homeAPI } from 'src/api/home';
import Avatar from '@mui/material/Avatar';


export const SocialPostCard = (props) => {
  const {
    clubName,
    createdAt,
    message,
    media,
    link,
    posttype,
    isLikedBoolean: isLikedProp,
    likes: likesProp,
    studentid,
    postid,
    ctaLink,
    logo,
    ...other

  } = props;



  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likes, setLikes] = useState(likesProp);
  const dateObject = new Date(createdAt);

  const handleLike = useCallback(() => {
    setIsLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
    homeAPI.increaseLike(studentid, postid);
  }, [studentid, postid]);

  const handleUnlike = useCallback(() => {
    setIsLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
    homeAPI.decreaseLike(studentid, postid);
  }, [studentid, postid]);


  return (
    <Card {...other}>
      <CardHeader
        disableTypography
        subheader={
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <SvgIcon color="action">
              <ClockIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              {formatDistanceToNowStrict(dateObject.getTime())} ago

            </Typography>
          </Stack>
        }
        title={
          <Stack
            alignItems="center"
            direction="row"
            spacing={0.5}
            sx={{ mb: 1 }}
          >
            <Avatar
              alt="Person"
              src={logo}
            />

            <Link
              color="text.primary"
              href="#"
              variant="subtitle2"
            >
              {clubName}
            </Link>
            <Typography variant="body2">updated their status</Typography>
          </Stack>
        }
      />
      <Box
        sx={{
          pb: 2,
          px: 3,
        }}
      >
        <Typography variant="body1">{message}</Typography>
        {media && (
          <Box sx={{ mt: 3 }}>
            <CardActionArea>
              <CardMedia
                image={media}
                sx={{
                  backgroundPosition: 'top',
                  height: 500,
                }}
              />
            </CardActionArea>
          </Box>
        )}
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {posttype === 'event' && (
          <div>
            <Stack
              alignItems="center"
              direction="row"
              sx={{my: 3}}
            >
              <IconButton>
                <SvgIcon
                  sx={{
                    color: (theme) => theme.palette.primary.main,

                  }}
                >
                  <Link01Icon />
                </SvgIcon>
              </IconButton>


                <Link
                  color={(theme) => theme.palette.primary.main}
                  href={ctaLink}
                  variant="caption"
                >
                  {ctaLink}
                </Link>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              sx={{my: 3}}
            >


              {isLiked ? (
                <Tooltip title="Unlike">
                  <IconButton onClick={handleUnlike}>
                    <SvgIcon
                      sx={{
                        color: 'error.main',
                        '& path': {
                          fill: (theme) => theme.palette.error.main,
                          fillOpacity: 1,
                        },
                      }}
                    >
                      <HeartIcon />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Like">
                  <IconButton onClick={handleLike}>
                    <SvgIcon>
                      <HeartIcon />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              )}
              <Typography
                color="text.secondary"
                variant="subtitle2"
              >
                {likes} has indicated they will be attending
              </Typography>
            </Stack>
          </div>
          )}

        </Stack>

      </Box>
    </Card>
  );
};

SocialPostCard.propTypes = {
  clubName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  media: PropTypes.string,
  message: PropTypes.string.isRequired,
  posttype: PropTypes.string.isRequired,
  studentid: PropTypes.string.isRequired,
};
