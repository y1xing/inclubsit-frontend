import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';
import HeartIcon from '@untitled-ui/icons-react/build/esm/Heart';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
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

import EditIcon from "@untitled-ui/icons-react/build/esm/Edit02";
import Button from "@mui/material/Button";

import { clubProfileApi } from "src/api/clubProfile";

import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const ClubPostCard = (props) => {
  const {
    studentID,
    setPosts,
    clubName,
    clubLogo,
    post,
    createdAt,
    isLiked: isLikedProp,
    likes: likesProp,
    media,
    message,
    role,
    ctaLink,
    ...other
  } = props;
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likes, setLikes] = useState(likesProp);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMessage, setEditMessage] = useState(message);


  const handleEditMode = useCallback(() => {
    setIsEditMode(true);
  }, [] );

  const handleEditModeOff = useCallback(() => {
    setIsEditMode(false);
  }, [] );

  const handleEditMessage = useCallback((e) => {
    setEditMessage(e.target.value);
  }
  , []);

  const handleSaveChanges = async () => {

    if (editMessage === message) {
      setIsEditMode(false);
      return;
    }

    // Update the message in the database
    const response = await clubProfileApi.updatePost(post.id, {message: editMessage});

    if (response) {
      setPosts((prevPosts) => prevPosts.map((prevPost) => {
          if (prevPost.id === post.id) {
            return {
              ...prevPost,
              message: editMessage,
            };
          }
          return prevPost;
        }
      ));
      console.log(response)
      toast.success('Post updated');
      setIsEditMode(false);

    }
  }

  const handleDelete = useCallback(async () => {
    const response = await clubProfileApi.deletePost(post.id);
    setPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost.id !== post.id));
    if (response) {
      toast.success('Post deleted');
    }
  }
  , [post.id, setPosts]);

  const handleLike = useCallback(async () => {
    setIsLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
    const response = await clubProfileApi.likePost(post.id, studentID);
    if (response) {
      console.log(response);
    }
  }, [post.id, studentID]);

  const handleUnlike = useCallback(async () => {
    setIsLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
    const response = await clubProfileApi.unlikePost(post.id, studentID);
    if (response) {
      console.log(response);
    }

  }, [post.id, studentID]);

  return (
    <Card {...other}>
      <CardHeader
        avatar={
          <Avatar
            component="a"
            // href="#"
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
              onClick={isEditMode ? handleSaveChanges : handleEditMode}
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



                <IconButton
                  onClick={handleDelete}
                  >
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
              value={editMessage}
              onChange={handleEditMessage}
              variant="outlined"


            />
            :
            <Typography
              variant="body1"
              sx={{ my: 2 }}
            >{editMessage}</Typography>
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
