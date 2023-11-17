import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useMounted } from "src/hooks/use-mounted";

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { ClubCard } from 'src/sections/category/club-card';
import { ClubSearch } from 'src/sections/category/club-search';
import { clubsAPI } from "src/api/clubs";
import { categoryAPI } from "src/api/categories";
import { useRouter } from "next/router";

const useClubs = (searchState) => {
  const isMounted = useMounted();
  const [clubs, setClubs] = useState([]);

  const router = useRouter();
  const { category } = router.query;

  const handleClubsGet = useCallback(async () => {
    try {
      const response = await clubsAPI.getClubs({category, ...searchState});

      console.log("response is", response);

      if (isMounted()) {
        // Change this the structure of the response
        setClubs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [category, searchState, isMounted]);

  useEffect(
    () => {
      handleClubsGet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [searchState]
  );

  return clubs;
};

const useClubsSearch = () => {
  const [state, setState] = useState({
    filters: {
      name: undefined,
      members: [],
      trainingDay: [],
      location: [],
    },
  });

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }
  , []);

  return {
    handleFiltersChange,
    state,
  };
}

const Page = ({ params }) => {
  const settings = useSettings();
  const clubsSearch = useClubsSearch();
  const clubs = useClubs(clubsSearch.state);


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
              {clubs?.categoryInfo?.title}
            </Typography>
            <Typography
              color="inherit"
              sx={{ mt: 3, mb: 2 }}
            >
              {clubs?.categoryInfo?.description}
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
              {clubs?.categoryInfo?.title} Clubs
            </Typography>
            <ClubSearch onFiltersChange={clubsSearch?.handleFiltersChange} />
            <Grid
              container
              sx={{ mt: 3 }}
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >


              {clubs?.data && clubs?.data.map((club) => (
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
