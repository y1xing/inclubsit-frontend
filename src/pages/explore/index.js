import { useCallback, useEffect, useState } from 'react';
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
import { useMounted } from 'src/hooks/use-mounted';
import { categoryAPI } from "src/api/categories";

const useCategories = () => {
  const isMounted = useMounted();
  const [categories, setCategories] = useState([]);

  const handleCategoriesGet = useCallback(async () => {
    try {
      const response = await categoryAPI.getCategories();
      console.log(response);

      if (isMounted()) {
        // Change the response according to the data structure of the API
        setCategories(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleCategoriesGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return categories;

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
