import React, { useState, useCallback, useRef } from 'react';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { getInitials } from 'src/utils/get-initials';
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { clubProfileApi } from "src/api/clubProfile";
import { v4 as uuid } from 'uuid';

import { fileToBase64 } from "src/utils/file-to-base64";
import { uploadAndRetrieveDownloadURL } from "src/utils/get-firebase-link";

export const ClubPostAdd = (props) => {
  const { clubID, setPosts, ...other } = props;
  const user = useMockedUser();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [isAddLink, setIsAddLink] = useState(false);
  const [link, setLink] = useState('');
  const [cover, setCover] = useState(null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      message: '',
      ctaLink: '',
      public: false,
      media: null,
      submit: null,
    },

    validationSchema: Yup.object().shape({
      message: Yup.string().required('Message is required'),
      ctaLink: Yup.string().url('Must be a valid URL'),
    }),

    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make sure to replace this with your own API

        // If there is a cover image, upload it to firebase
        if (cover) {
          const downloadURL = await uploadAndRetrieveDownloadURL(values.media);
          console.log("downloadURL ", downloadURL)
          values.media = downloadURL;
          console.log(values.media)
        }

        if (values.ctaLink) {
          values.postType = "event";
        } else {
          values.postType = "update";
        }

        delete values.submit;

        values.id = uuid();

        // Send the data to the API
        const response = await clubProfileApi.createPost(clubID, values);

        // Update the posts state
        setPosts((prevPosts) => [response, ...prevPosts]);



        console.log(values);
        helpers.setStatus({success: true});
        helpers.setSubmitting(false);
        // Reset the form
        formik.resetForm();
        // Reset the cover;
        setCover(null);
        toast.success('Post published');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);

      }

    }
  });


  const handleAddInit = useCallback(() => {
    setIsAddLink(true);
  }, []);

  const handleAddCancel = useCallback(() => {
    setIsAddLink(false);
    setLink('');
  }, []);

  const handleAddConfirm = useCallback(() => {
    setIsAddLink(false);
  }, []);

  const handleUpload = useCallback(async (file) => {
    console.log("file ", file.name);
    const data = await fileToBase64(file);
    setCover(data);

    await formik.setFieldValue('media', file);
  }, [formik]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleCoverRemove = () => {
    setCover(null);
    formik.setFieldValue('media', null);
  }

  const handleIconClick = () => {
    fileInputRef.current.click();
  };


  return (
    <form onSubmit={formik.handleSubmit}>
    <Card {...props}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          spacing={2}
        >

          <Stack
            spacing={3}
            sx={{ flexGrow: 1, position: 'relative' }}
          >
            {cover && (
              <Box
                sx={{
                  backgroundImage: `url(${cover})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: 1,
                  width: '100%',
                  aspectRatio: "16/9",
                  mt: 3,
                }}
              />
            )}

            {
              cover && (
                <div>
                  <Button
                    color="inherit"
                    disabled={!cover}
                    onClick={handleCoverRemove}
                  >
                    Remove photo
                  </Button>
                </div>
              )
            }

            <OutlinedInput
              fullWidth
              multiline
              placeholder="What updates do you have for your club?"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
              error={Boolean(formik.touched.message && formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              onBlur={formik.handleBlur}
              rows={3}
            />
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              {smUp && (
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="upload-button"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  <label htmlFor="upload-button">
                    <IconButton
                      onClick={handleIconClick}
                    >
                      <SvgIcon>
                        <Image01Icon />
                      </SvgIcon>
                    </IconButton>
                  </label>
                  <Stack
                    sx={{
                      position: 'relative',
                    }}
                  >
                  <IconButton
                    onClick={handleAddInit}
                  >
                    <SvgIcon>
                      <Link01Icon
                        color={formik.values.ctaLink ? '#E73028' : 'inherit'}
                      />
                    </SvgIcon>
                  </IconButton>

                    {isAddLink && (
                  <Paper
                    elevation={12}
                    sx={{
                      width: 400,
                      top: 35,
                      zIndex: 200,
                      position: 'absolute',
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <OutlinedInput
                        autoFocus
                        fullWidth
                        placeholder="Add link"
                        name="ctaLink"
                        // Formik
                        onChange={formik.handleChange}
                        value={formik.values.ctaLink}
                        error={Boolean(formik.touched.ctaLink && formik.errors.ctaLink)}
                        helperText={formik.touched.ctaLink && formik.errors.ctaLink}
                        onBlur={formik.handleBlur}
                        sx={{
                          '& .MuiInputBase-input': {
                            px: 2,
                            py: 1,
                          },
                        }}

                      />

                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{ mt: 2 }}
                      >
                        <Button
                          onClick={handleAddConfirm}
                          size="small"
                          variant="contained"
                        >
                          Confirm
                        </Button>
                        <Button
                          color="inherit"
                          onClick={handleAddCancel}
                          size="small"
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Box>
                  </Paper>
                    )}
                  </Stack>
                </Stack>
              )}
              <div>
                <Button
                  type={"submit"}
                  disabled={formik.isSubmitting}
                  onClick={formik.handleSubmit}
                  variant="contained">Post</Button>
              </div>

            </Stack>



            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}

            >
              <div>
              <Typography
                gutterBottom
                variant="subtitle2"
              >
                Make post public
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Means that non-members viewing your profile will be able to see this post
              </Typography>
              </div>
            <div>
              <Switch
                // Formik public value
                checked={formik.values.public}
                // Formik public change handler
                onChange={formik.handleChange}
                color="primary"
                edge="start"
                name="public"
              />
            </div>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
    </form>
  );
};
