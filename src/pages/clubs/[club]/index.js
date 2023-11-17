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
import {useRouter} from "next/router";
import Alert from "@mui/material/Alert";

const tabs = [
  { label: 'Profile', value: 'profile' },
  { label: 'Members', value: 'members' },
];

const studentTabs = [
  { label: 'Profile', value: 'profile' },
];

const useProfile = () => {
  const isMounted = useMounted();
  const [profile, setProfile] = useState(null);
  const [leaders, setLeaders] = useState([]);

  const router = useRouter();
  const { club } = router.query;

  const handleProfileGet = useCallback(async () => {
    try {
      const response = await clubProfileApi.getProfile(club);

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

  const router = useRouter();
  const { club } = router.query;

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await clubProfileApi.getPosts(club);

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

  const router = useRouter();
  const { club } = router.query;

  const handleUserGet = useCallback(async () => {
    try {
      // let studentId = "2200131"; // Member
      let studentId = "2200007"; // Student Leader
      // let studentId = "2200001"; // Non Member
      const response = await authApi.me(studentId, club);

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


const useMembers = (search = '', membersSearch) => {
  const [connections, setConnections] = useState([]);
  const isMounted = useMounted()

  const router = useRouter();
  const { club } = router.query;

  const handleConnectionsGet = useCallback(async () => {
    const response = await clubProfileApi.getConnections(club, membersSearch);

    if (isMounted()) {
      setConnections(response);
    }
  }, [isMounted, membersSearch]);

  useEffect(
    () => {
      handleConnectionsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, membersSearch]
  );

  return connections.filter((connection) => {
    return connection.name?.toLowerCase().includes(search.toLowerCase());
  });
};

// Members search
const MembersSearch = () => {
  const [state, setState] = useState({
    filters: {
      gender: [],
      course: [],
      year: [],
      cluster: [],
    }
  });

  const handleFiltersChange = useCallback((filters) => {
      setState((prevState) => ({
        ...prevState,
        filters,
      }));
    }, []);

  return {
    handleFiltersChange,
    state
  };

}


const Page = () => {
  const { profile, leaders } = useProfile();
  const membersSearch = MembersSearch();
  const user = useUser();
  const [currentTab, setCurrentTab] = useState('profile');
  const [status, setStatus] = useState('not_connected');
  const posts = usePosts();
  const [connectionsQuery, setConnectionsQuery] = useState('');
  const connections = useMembers(connectionsQuery, membersSearch?.state);

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
      <Seo title={`${profile.ClubName} Profile`} />
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
              style={{ backgroundImage: `url(${profile.cover})` }}
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
                  src={profile?.logo}
                  sx={{
                    height: 64,
                    width: 64,
                    border: (theme) => `solid 1px lightGrey`,
                  }}

                />
                <div>
                  <Typography
                    color="text.secondary"
                    variant="overline"
                  >
                    {profile?.ClubCategoryID}
                  </Typography>
                  <Typography variant="h6">{profile.ClubName}</Typography>
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
                    {
                      (user?.role === 'student leader' || user?.role === 'member') ? 'Quit Club' : 'Join Club'
                    }
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
            {user?.role === 'student leader' ? (
              tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))) : (
              studentTabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />)
            ))
            }
          </Tabs>
          <Divider />
          <Box

            sx={{ mt: 3 }}>
            {currentTab === 'profile' && (
              <ClubTimeline
                role={user?.role}
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
                onFiltersChange={membersSearch?.handleFiltersChange}
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
