import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

import { ProfileDetails } from 'src/sections/profile/profile_details';
import { ProfileClubs } from 'src/sections/profile/profile_clubs';
import { useMounted } from 'src/hooks/use-mounted';
import { profileAPI } from 'src/api/profile';
import { Button } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Clubs', value: 'club' },
];

const useProfile = () => {
  const isMounted = useMounted();
  const [profile, setProfile] = useState({});

  const handleProfileGet = useCallback(async () => {
    try {
      const response = await profileAPI.getProfile();

      if (isMounted()) {
        setProfile(response[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleProfileGet();
    },
    [handleProfileGet],
  );
  return profile;

};

const useClubs = () => {
  const isMounted = useMounted();
  const [clubs, setClubs] = useState({});

  const handleClubsGet = useCallback(async () => {
    try {
      const response = await profileAPI.getClubs();

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
    [handleClubsGet],
  );
  return clubs;

};

const Page = () => {
  const profile = useProfile();
  const clubs = useClubs();
  const router = useRouter();

  const { signOut } = useAuth();
  

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Sign out successful");
      router.push(paths.auth.firebase.login); // Redirect to the login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [currentTab, setCurrentTab] = useState('details');
  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Seo title="Profile" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container >
          <Stack
            spacing={3}
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">Profile</Typography>
            <div>
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
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
            </div>
          </Stack>
          {currentTab === 'details' && (
            <Stack>
              <ProfileDetails profile={profile} />
              <Button onClick={handleSignOut}>Sign Out</Button>
            </Stack>
            
            
          )}
          {currentTab === 'club' && (
            <Grid container
              spacing={3}>
              {clubs.map((club) => (
                <Grid
                  key={club.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}>
                  <Card>
                    <ProfileClubs club={club} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          
        </Container>
      </Box>
      
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
