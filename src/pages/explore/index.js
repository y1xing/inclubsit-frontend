
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { CategoryCard } from 'src/sections/explore/category-card';
import { CategorySearch } from 'src/sections/explore/category-search';

const useCategories = () => {
  return [
    {
      id: 'c3a2b7331eef8329e2a87c79',
      numberOfClubs: '1 Club',
      media: '/assets/categories/Programmes_Counselling1.jpeg',
      title: 'Counselling',
    },
    {
      id: '3f02f696f869ecd1c68e95a3',
      media: '/assets/categories/Programmes_D&I.jpeg',
      numberOfClubs: '14 Clubs',
      title: 'Diversion & Inclusion',
    },
    {
      id: 'f6e76a6474038384cd9e032b',
      numberOfClubs: '21 Clubs',
      media: '/assets/categories/Programmes_GC.jpeg',
      title: 'Global Citizenship',
    },
    {
      id: 'f6e76a6474038s384cd9e032b',
      numberOfClubs: '21 Clubs',
      media: '/assets/categories/Programmes_PA.jpeg',
      title: 'Performing Arts',
    },
    {
      id: 'f6e76a6474038384qwcd9e032b',
      numberOfClubs: '21 Clubs',
      media: '/assets/categories/Programmes_Special Interests.jpeg',
      title: 'Special Interests',
    },
    {
      id: 'f6e76a6474038384cfd9e032b',
      numberOfClubs: '21 Clubs',
      media: '/assets/categories/Programmes_Sports.jpeg',
      title: 'Sports',
    },
    {
      id: 'f6e76a6474038384cd439e032b',
      numberOfClubs: '21 Clubs',
      media: '/assets/categories/Programmes_Student Chapters.jpeg',
      title: 'Student Chapters',
    },
    {
      id: 'f6e76a6474038384cda9e032b',
      numberOfClubs: '21 Clubs',
      media: '/assets/categories/Programmes_SMC1.jpeg',
      title: 'Student Management Committee',
    },
    {
      id: 'f6e76a6474038384cda9e032b',
      numberOfClubs: '21 Clubs',
      media: '/assets/categories/Programmes_Student Support Services.jpeg',
      title: 'Student Support Services',
    },
  ];
};

const Page = () => {
  const settings = useSettings();
  const categories = useCategories();

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
            py: '120px',
          }}
        >
          <Container maxWidth="xl">
            <Typography
              color="inherit"
              variant="h2"
            >
              Explore Clubs in SIT
            </Typography>
            <Typography
              color="inherit"
              sx={{ mt: 1, mb: 6 }}
            >
              Join our programmes, discover your passion and unleash your potential!
            </Typography>
            <CategorySearch />
          </Container>
        </Box>
        <Box sx={{ py: '48px' }}>
          <Container maxWidth={settings.stretch ? false : 'xl'}>
            <Typography
              color="inherit"
              variant="h4"
              sx={{mb: 4 }}
            >
              Programmes
            </Typography>
            <Grid
              container
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >


              {categories.map((category) => (
                <Grid
                  key={category.id}
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}

                >
                  <CategoryCard category={category} />
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
