
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';

const Page = () => {
  usePageView();

const { signOut } = useAuth();
const router = useRouter();

const handleSignOut = async () => {
  try {
    await signOut();
    console.log("Sign out successful");
    router.push(paths.auth.firebase.login); // Redirect to the login page
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

  return (
    <>
      <Seo />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            color="text.secondary"
            variant="overline"
          >
            Profile
          </Typography>
          
        </Container>
        <button onClick={handleSignOut}>Sign out</button>
      </Box>
      
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
