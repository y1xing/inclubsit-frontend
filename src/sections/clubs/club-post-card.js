import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';
import HeartIcon from '@untitled-ui/icons-react/build/esm/Heart';
import Avatar from '@mui/material/Avatar';
import TrashIcon from '@untitled-ui/icons-react/build/esm/Trash01';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";


import { ClubComment } from './club-comment';
import { ClubCommentAdd } from './club-comment-add';
import {RouterLink} from "../../components/router-link";
import EditIcon from "@untitled-ui/icons-react/build/esm/Edit02";
import Button from "@mui/material/Button";

export const ClubPostCard = (props) => {
  const {
    clubName,
    clubLogo,
    post,
    createdAt,
    isLiked: isLikedProp,
    likes: likesProp,
    media,
    message,
    role,
    ...other
  } = props;
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likes, setLikes] = useState(likesProp);
  const [isEditMode, setIsEditMode] = useState(false);


  const handleEditMode = useCallback(() => {
    setIsEditMode(true);
  }, [] );

  const handleEditModeOff = useCallback(() => {
    setIsEditMode(false);
  }, [] );

  const handleLike = useCallback(() => {
    setIsLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  }, []);

  const handleUnlike = useCallback(() => {
    setIsLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  }, []);

  return (
    <Card {...other}>
      <CardHeader
        avatar={
          <Avatar
            component="a"
            href="#"
            src={clubLogo}
            sx={{
              border: (theme) => `solid 1px lightGrey`,
            }}
          />
        }
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
              {formatDistanceToNowStrict(new Date(post?.createdAt), { addSuffix: true })}
            </Typography>
          </Stack>
        }
        title={
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >

            <Link
              color="text.primary"
              href="#"
              variant="subtitle2"
            >
              {clubName}
            </Link>
            <Typography variant="body2">has a new {post?.postType}</Typography>
            </Stack>
            {
              role === "student leader" &&
              <div>
            <Button
              size="small"
              sx={{mr: 1}}
              onClick={isEditMode ? handleEditModeOff : handleEditMode}
              startIcon={
                !isEditMode &&
                <SvgIcon>
                  <EditIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              {isEditMode ? "Save Changes" : "Edit Post"}
            </Button>
                {
                  isEditMode &&
                    <Button
                      size="small"
                      sx={{mr: 1}}
                      onClick={handleEditModeOff}
                      >
                      Cancel
                    </Button>
                }



                <IconButton>
                  <SvgIcon>
                    <TrashIcon />
                  </SvgIcon>
                </IconButton>


              </div>
            }
          </Stack>

        }
      />

      <Box
        sx={{
          pb: 2,
          px: 3,
        }}
      >

        {media && (
          <Box sx={{ my: 3 }}>
            <CardActionArea>
              <CardMedia
                image={media}
                sx={{
                  backgroundPosition: 'center',
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "12px",
                }}
              />
            </CardActionArea>
          </Box>
        )}
        {
          isEditMode ?
            <TextField
              fullWidth
              multiline
              rows={4}
              value={message}
              variant="outlined"


            />
            :
            <Typography
              variant="body1"
              sx={{ my: 2 }}
            >{message}</Typography>
        }

        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {post?.postType === 'event' && (
          <div>
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

ClubPostCard.propTypes = {
  createdAt: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  media: PropTypes.string,
  message: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  clubName: PropTypes.string.isRequired,
  clubLogo: PropTypes.string.isRequired,
};
