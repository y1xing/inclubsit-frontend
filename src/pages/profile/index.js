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
            <ProfileDetails profile={profile} />
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
        <button onClick={handleSignOut}>Sign out</button>
      </Box>
      
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
