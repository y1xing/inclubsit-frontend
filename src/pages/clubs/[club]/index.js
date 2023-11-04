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
import { ClubMembersPage } from 'src/sections/clubs/club-members-page';
import { ClubTimeline } from 'src/sections/clubs/club-timeline';

const tabs = [
  { label: 'Profile', value: 'profile' },
  { label: 'Members', value: 'members' },
];

const useProfile = () => {
  const isMounted = useMounted();
  const [profile, setProfile] = useState(null);
  const [leaders, setLeaders] = useState([]);

  const handleProfileGet = useCallback(async () => {
    try {
      const response = await clubProfileApi.getProfile();

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

const usePosts = () => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await clubProfileApi.getPosts();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return posts;
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

const useMembers = (search = '') => {
  const [connections, setConnections] = useState([]);
  const isMounted = useMounted();

  const handleConnectionsGet = useCallback(async () => {
    const response = await clubProfileApi.getConnections();

    if (isMounted()) {
      setConnections(response);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleConnectionsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return connections.filter((connection) => {
    return connection.name?.toLowerCase().includes(search.toLowerCase());
  });
};

const Page = () => {
  const { profile, leaders } = useProfile();
  const user = useUser();
  const [currentTab, setCurrentTab] = useState('profile');
  const [status, setStatus] = useState('not_connected');
  const posts = usePosts();
  const [connectionsQuery, setConnectionsQuery] = useState('');
  const connections = useMembers(connectionsQuery);

  usePageView();

  const handleConnectionAdd = useCallback(() => {
    setStatus('pending');
  }, []);

  const handleConnectionRemove = useCallback(() => {
    setStatus('not_connected');
  }, []);

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  const handleConnectionsQueryChange = useCallback((event) => {
    setConnectionsQuery(event.target.value);
  }, []);

  if (!profile) {
    return null;
  }

  const showConnect = status === 'not_connected';
  const showPending = status === 'pending';

  return (
    <>
      <Seo title={`${profile.name} Profile`} />
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
                  src={profile.avatar}
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
                  <Typography variant="h6">{profile.name}</Typography>
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
                {showConnect && (
                  <Button
                    onClick={handleConnectionAdd}
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <BellIcon />
                      </SvgIcon>
                    }
                    variant="outlined"
                  >
                    Join Club
                  </Button>
                )}
                {showPending && (
                  <Button
                    color="primary"
                    onClick={handleConnectionRemove}
                    size="small"
                    variant="outlined"
                  >
                    Pending
                  </Button>
                )}
                {
                  user?.role === 'student leader' && (
                    <Button
                      component={RouterLink}
                      href={"/clubs/basketball/edit"}
                      size="small"
                      startIcon={
                        <SvgIcon>
                          <EditIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                    >
                      Edit Profile
                    </Button>
                )}
              </Stack>
            </Stack>
          </div>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            sx={{ mt: 5 }}
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider />
          <Box

            sx={{ mt: 3 }}>
            {currentTab === 'profile' && (
              <ClubTimeline
                role={user.role}
                posts={posts}
                profile={profile}
                leaders={leaders}
              />
            )}
            {currentTab === 'members' && (
              <ClubMembersPage
                connections={connections}
                onQueryChange={handleConnectionsQueryChange}
                query={connectionsQuery}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
