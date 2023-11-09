import { useCallback, useEffect, useState } from 'react';
import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';


import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { useMounted } from 'src/hooks/use-mounted';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { EcommerceProducts } from 'src/sections/ecommerce/ecommerce-products';

import { SocialPostAdd } from 'src/sections/social/social-post-add';
import { SocialPostCard } from 'src/sections/social/social-post-card';
import { homeApi } from 'src/api/home';


const usePosts = () => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await homeApi.getFeed();

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

const useProducts = () => {
  const isMounted = useMounted();
  const [products, setProducts] = useState([]);

  const handleProductsGet = useCallback(async () => {
    try {
      const response = await homeApi.getProducts();

      if (isMounted()) {
        setProducts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleProductsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return products;
};

const Page = () => {
  const settings = useSettings();
  const posts = usePosts();
  const produdcts = useProducts();

  usePageView();

  return (
    <>
      <Seo title="Dashboard: E-Commerce" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">E-Commerce</Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    startIcon={
                      <SvgIcon>
                        <RefreshCcw01Icon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Sync Data
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <SocialPostAdd />
                {posts.map((post) => (
              <SocialPostCard
                key={post.id}
                authorAvatar={post.author.avatar}
                authorName={post.author.name}
                comments={post.comments}
                createdAt={post.createdAt}
                isLiked={post.isLiked}
                likes={post.likes}
                media={post.media}
                message={post.message}
              />
            ))}
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={4}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <EcommerceProducts
                  products={[...produdcts]}
                />

              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
