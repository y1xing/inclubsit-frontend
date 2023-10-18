import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { ClubCard } from 'src/sections/category/club-card';
import { ClubSearch } from 'src/sections/category/club-search';

const useClubs = () => {
  return [
    {
      id: 'c3a2b7331eef8329e2a87c79',
      media: '/assets/clubs/adventure.jpeg',
      title: 'Adventure',
      members: '10',
      training: "Every Friday, 6pm to 8pm",
      location: "Dover Campus"
    },
    {
      id: 'c3a2b73w31eef8329e2a87c79',
      media: '/assets/clubs/badminton.jpeg',
      title: 'Badminton',
      members: '45',
      training: "Every Thursday, 6pm to 8pm",
      location: "Dover Campus"
    },
    {
      id: 'c3a2b7331eef8329e2a87c79',
      media: '/assets/clubs/adventure.jpeg',
      title: 'Adventure',
      members: '10',
      training: "Every Friday, 6pm to 8pm",
      location: "Dover Campus"
    },
    {
      id: 'c3a2b73w31eef8329e2a87c79',
      media: '/assets/clubs/badminton.jpeg',
      title: 'Badminton',
      members: '45',
      training: "Every Thursday, 6pm to 8pm",
      location: "Dover Campus"
    },

  ];
};

const Page = () => {
  const settings = useSettings();
  const clubs = useClubs();

  const [state, setState] = useState({
    filters: {
      members: [],
      trainingDay: [],
      location: [],

    },
    page: 0,
    rowsPerPage: 5,
  });

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  usePageView();

  return (
    <>
      <Seo title="Explore: Explore Clubs in SIT" />
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Box
          sx={{
            position: 'relative',
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/covers/explore-cover.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'primary.contrastText',
            py: '60px',
          }}
        >
          <Container maxWidth="xl">
            <Typography
              color="inherit"
              variant="h2"
            >
              Sports
            </Typography>
            <Typography
              color="inherit"
              sx={{ mt: 3, mb: 2 }}
            >
              The sports category clubs at the Singapore Institute of Technology (SIT) are a vibrant and integral part of the university's extracurricular offerings. These clubs cater to the diverse sporting interests and passions of the student community, providing a platform for students to engage in various athletic pursuits and recreational activities. Whether it's team sports, individual fitness programs, or outdoor adventures, the sports clubs in SIT foster a culture of active living, teamwork, and personal well-being.
              <br/>
              <br/>

              They promote a healthy and balanced lifestyle among students, encouraging them to stay active, build camaraderie, and develop valuable leadership and sportsmanship skills. Through a range of events, competitions, and training sessions, the sports category clubs in SIT create a dynamic and inclusive environment that encourages students to pursue their athletic ambitions and make the most of their university experience.
            </Typography>

          </Container>
        </Box>
        <Box sx={{ py: '48px' }}>
          <Container maxWidth={settings.stretch ? false : 'xl'}>
            <Typography
              color="inherit"
              variant="h4"
              sx={{mb: 4 }}
            >
              Sports Clubs
            </Typography>
            <ClubSearch onFiltersChange={handleFiltersChange} />
            <Grid
              container
              sx={{ mt: 3 }}
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >


              {clubs.map((club) => (
                <Grid
                  key={club.id}
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}

                >
                  <ClubCard club={club} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
