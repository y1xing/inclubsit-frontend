import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
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

const usePosts = (studentid) => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await homeAPI.getFeed(studentid);

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, studentid]);

  useEffect(
    () => {
      handlePostsGet();
    },
    [handlePostsGet]
  );

  return posts;
};

const useClubs = (studentid) => {
  const isMounted = useMounted();
  const [clubs, setClubs] = useState([]);

  const handleClubsGet = useCallback(async () => {
    try {
      const response = await homeAPI.getRecommendations(studentid);

      if (isMounted()) {
        setClubs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, studentid]);

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
  const auth = getAuth(firebaseApp);
  let studentid = auth.currentUser?.uid ?? undefined;
  const posts = usePosts(studentid);
  const clubs = useClubs(studentid);
  const profile = useProfile(studentid);
  const name = profile.FirstName + " " + profile.LastName;

  usePageView();

  return (
    <>
      <Seo title="InClubSIT Home Page" />
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
                  <Typography variant="h4">Feed</Typography>
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

                {posts.map((post) => {
                  // Check if studentid is in the isLiked array
                  if (post.likedBy === undefined) {
                    post.likedBy = [];
                  }
                  const isLiked = post.likedBy.includes(studentid);

                  return (
                    <SocialPostCard
                      clubID={post.clubID}
                      key={post.id}
                      clubName={post.clubName}
                      createdAt={post.createdAt}
                      isLikedBoolean={isLiked}
                      likes={post.likes}
                      media={post.media}
                      message={post.message}
                      posttype={post.postType}
                      studentid={studentid}
                      postid={post.id}
                      ctaLink = {post.ctaLink}
                      logo = {post.logo}

                    />
                  );
                })}

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

                { (name && clubs) &&
                <HomeClubs
                  clubs={[...clubs]}
                  name={name}
                />
                }


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
