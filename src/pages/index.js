import { useCallback, useEffect, useState } from 'react';
import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';


import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { useMounted } from 'src/hooks/use-mounted';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { HomeClubs } from 'src/sections/home/profile_clubs';

import { SocialPostCard } from 'src/sections/home/social-post-card';

import { homeAPI } from 'src/api/home';
import { profileAPI } from 'src/api/profile';
import { firebaseApp } from 'src/libs/firebase';
import { getAuth } from 'firebase/auth';

const useProfile = (studentid) => {
  const isMounted = useMounted();
  const [profile, setProfile] = useState({});

  const handleProfileGet = useCallback(async () => {
    try {
      const response = await profileAPI.getProfile(studentid);

      if (isMounted()) {
        setProfile(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, studentid]);

  useEffect(
    () => {
      handleProfileGet();
    },
    [handleProfileGet],
  );
  return profile;

};

const usePosts = () => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await homeAPI.getFeed();

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handlePostsGet();
    },
    [handlePostsGet]
  );

  return posts;
};

const useClubs = () => {
  const isMounted = useMounted();
  const [clubs, setClubs] = useState([]);

  const handleClubsGet = useCallback(async () => {
    try {
      const response = await homeAPI.getClubs();

      if (isMounted()) {
        setClubs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleClubsGet();
    },

    [handleClubsGet]
  );

  return clubs;
};

const Page = () => {
  const settings = useSettings();
  const posts = usePosts();
  const clubs = useClubs();
  // const profile = useProfile();
  
  const auth = getAuth(firebaseApp);
  let studentid = auth.currentUser?.uid ?? undefined;

  const profile = useProfile(studentid);
  const name = profile.FirstName + " " + profile.LastName;

  usePageView();

  return (
    <>
      <Seo title="InClubSITHome Page" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">InClubSIT</Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                {/* <SocialPostAdd /> */}
                {posts.map((post) => (
                  <SocialPostCard
                    key={post.id}
                    authorAvatar={post.author.avatar}
                    authorName={post.author.name}
                    comments={post.comments}
                    createdAt={post.createdAt}
                    isLiked={post.isLiked}
                    likes={post.likes}
                    media={post.media}
                    message={post.message}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={4}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <HomeClubs
                  clubs={[...clubs]}
                  name={name}
                />

              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
