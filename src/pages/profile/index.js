import { useCallback, useState } from 'react';
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
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

import { ProfileDetails } from 'src/sections/profile/profile_details';
import { ProfileClubs } from 'src/sections/profile/profile_clubs';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Clubs', value: 'club' },
];
const getClubs = () => {
  return [
    {
      id: 'c3a2b7331eef8329e2a87c79',
      media: '/assets/clubs/sitrcc.png',
      avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
      title: 'SIT Rock Climbing Club',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
      updateby: 'Siegbert Gottfried',
      read: '5',
      

    },
    {
      id: '3f02f696f869ecd1c68e95a3',
      media: '/assets/clubs/sitnetball.jpg',
      avatar: '/assets/avatars/avatar-jane-rotanson.png',
      title: 'SIT Netball Club',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
      updateby: 'Jane Rotanson',
      read: '2',
    },
    {
      id: 'f6e76a6474038384cd9e032b',
      media: '/assets/clubs/sittchoukball.jpg',
      avatar: '/assets/avatars/avatar-neha-punita.png',
      title: 'SIT Tchoukball Club',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
      updateby: 'Neha Punita',
      read: '1',
    },
  ];
};
const Page = () => {
  const clubs = getClubs();
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
            <ProfileDetails/>
          )}
          {currentTab === 'club' && (
          <Grid container 
          spacing={3}>
            {clubs.map((club) => (
              <Grid item 
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
