import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { QuillEditor } from 'src/components/quill-editor';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { wait } from 'src/utils/wait';
import { useRouter } from 'next/router';

export const ClubEditForm = (props) => {
  const { profile, ...other } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: profile.ClubEmail || '',
      training: profile.ClubTrainingDates || '',
      instagram: profile.ClubInstagram || '',
      location: profile.ClubTrainingLocations || '',
      description: profile.ClubDescription || '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      training: Yup.string().max(255),
      instagram: Yup.string().max(255),
      location: Yup.string().max(255),
      description: Yup.string().max(5000),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Profile updated');
        router.push("/clubs/basketball");

      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}
    >
      <Card>
        <CardHeader title="Edit profile" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.training && formik.errors.training)}
                fullWidth
                helperText={formik.touched.training && formik.errors.training}
                label="Training"
                name="training"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.training}
              />
            </Grid>

            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.location && formik.errors.location)}
                fullWidth
                helperText={formik.touched.location && formik.errors.location}
                label="Training Location"
                name="location"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.instagram && formik.errors.instagram)}
                fullWidth
                helperText={formik.touched.instagram && formik.errors.instagram}
                label="Instagram"
                name="instagram"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>

          </Grid>

          <Stack
            divider={<Divider />}
            spacing={3}
            sx={{ mt: 3 }}
          >
            <Typography
              variant={"h6"}
            >
              Description
            </Typography>
            <QuillEditor
              onChange={(value) => formik.setFieldValue('description', value)}
              placeholder="Type something"
              sx={{ height: 400 }}
              value={formik.values.description}
            />

          </Stack>


          {/*<Stack*/}
          {/*  divider={<Divider />}*/}
          {/*  spacing={3}*/}
          {/*  sx={{ mt: 3 }}*/}
          {/*>*/}
          {/*  <Stack*/}
          {/*    alignItems="center"*/}
          {/*    direction="row"*/}
          {/*    justifyContent="space-between"*/}
          {/*    spacing={3}*/}
          {/*  >*/}
          {/*    <Stack spacing={1}>*/}
          {/*      <Typography*/}
          {/*        gutterBottom*/}
          {/*        variant="subtitle1"*/}
          {/*      >*/}
          {/*        Make Contact Info Public*/}
          {/*      </Typography>*/}
          {/*      <Typography*/}
          {/*        color="text.secondary"*/}
          {/*        variant="body2"*/}
          {/*      >*/}
          {/*        Means that anyone viewing your profile will be able to see your contacts details*/}
          {/*      </Typography>*/}
          {/*    </Stack>*/}
          {/*    <Switch*/}
          {/*      checked={formik.values.isVerified}*/}
          {/*      color="primary"*/}
          {/*      edge="start"*/}
          {/*      name="isVerified"*/}
          {/*      onChange={formik.handleChange}*/}
          {/*      value={formik.values.isVerified}*/}
          {/*    />*/}
          {/*  </Stack>*/}
          {/*  <Stack*/}
          {/*    alignItems="center"*/}
          {/*    direction="row"*/}
          {/*    justifyContent="space-between"*/}
          {/*    spacing={3}*/}
          {/*  >*/}
          {/*    <Stack spacing={1}>*/}
          {/*      <Typography*/}
          {/*        gutterBottom*/}
          {/*        variant="subtitle1"*/}
          {/*      >*/}
          {/*        Available to hire*/}
          {/*      </Typography>*/}
          {/*      <Typography*/}
          {/*        color="text.secondary"*/}
          {/*        variant="body2"*/}
          {/*      >*/}
          {/*        Toggling this will let your teammates know that you are available for acquiring*/}
          {/*        new projects*/}
          {/*      </Typography>*/}
          {/*    </Stack>*/}
          {/*    <Switch*/}
          {/*      checked={formik.values.hasDiscount}*/}
          {/*      color="primary"*/}
          {/*      edge="start"*/}
          {/*      name="hasDiscount"*/}
          {/*      onChange={formik.handleChange}*/}
          {/*      value={formik.values.hasDiscount}*/}
          {/*    />*/}
          {/*  </Stack>*/}
          {/*</Stack>*/}
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={`/clubs/${profile?.ClubID}`}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

ClubEditForm.propTypes = {
  profile: PropTypes.object.isRequired,
};
