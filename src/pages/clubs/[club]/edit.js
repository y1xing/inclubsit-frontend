import { useCallback, useEffect, useState } from 'react';
import EditIcon from '@untitled-ui/icons-react/build/esm/Edit02';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import BellIcon from '@untitled-ui/icons-react/build/esm/Bell01';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { blueGrey } from '@mui/material/colors';

import { clubProfileApi } from 'src/api/clubProfile';
import { authApi } from "src/api/auth";
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { ClubEditForm } from "src/sections/clubs/club-edit-form";
import {useMockedUser} from "src/hooks/use-mocked-user";
import {useRouter} from "next/router";

const useProfile = () => {
  const isMounted = useMounted();
  const user = useMockedUser();
  const [profile, setProfile] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const router = useRouter();


  // If user is not student leader, redirect to club page
  if (user && user.role !== 'student leader') {
    router.push(`/clubs/basketball`);
  }



  const handleProfileGet = useCallback(async () => {
    try {
      const response = await clubProfileApi.getProfile();
      console.log(response);

      if (isMounted()) {
        setProfile(response?.profile);
        setLeaders(response?.leaders);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleProfileGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { profile, leaders };
};

const useUser = () => {
  const isMounted = useMounted();
  const [user, setUser] = useState(null);

  const handleUserGet = useCallback(async () => {
    try {
      const response = await authApi.me();

      if (isMounted()) {
        setUser(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleUserGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return user;
}

const Page = () => {
  const { profile, leaders } = useProfile();
  const user = useUser();
  const [connectionsQuery, setConnectionsQuery] = useState('');

  usePageView();


  return (
    <>
      <Seo title={`${profile?.name} Profile`} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <div>
            <Box
              style={{ backgroundImage: `url(/assets/covers/bball-cover.jpeg)` }}
              sx={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: 1,
                height: 348,
                position: 'relative',
                '&:hover': {
                  '& button': {
                    visibility: 'visible',
                  },
                },
              }}
            >
              <Button
                startIcon={
                  <SvgIcon>
                    <Image01Icon />
                  </SvgIcon>
                }
                sx={{
                  backgroundColor: blueGrey[900],
                  bottom: {
                    lg: 24,
                    xs: 'auto',
                  },
                  color: 'common.white',
                  position: 'absolute',
                  right: 24,
                  top: {
                    lg: 'auto',
                    xs: 24,
                  },
                  visibility: 'hidden',
                  '&:hover': {
                    backgroundColor: blueGrey[900],
                  },
                }}
                variant="contained"
              >
                Change Cover
              </Button>
            </Box>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 5 }}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <Avatar
                  src={profile?.avatar}
                  sx={{
                    height: 64,
                    width: 64,
                    border: (theme) => `solid 1px $F2F4F7`,
                  }}

                />
                <div>
                  <Typography
                    color="text.secondary"
                    variant="overline"
                  >
                    {profile?.category}
                  </Typography>
                  <Typography variant="h6">{profile?.name}</Typography>
                </div>
              </Stack>
              <Box sx={{ flexGrow: 1 }} />
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
                sx={{
                  display: {
                    md: 'block',
                    xs: 'none',
                  },
                }}
              >

              </Stack>
            </Stack>
          </div>

          <Divider sx={{my: 3}}/>
          <Box

            sx={{ mt: 3 }}>
            {
              profile && <ClubEditForm profile={profile} />
            }

          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
