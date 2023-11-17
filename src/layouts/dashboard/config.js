import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import SvgIcon from '@mui/material/SvgIcon';

import BarChartSquare02Icon from 'src/icons/untitled-ui/duocolor/bar-chart-square-02';
import LineChartUp04Icon from 'src/icons/untitled-ui/duocolor/line-chart-up-04';
// Import home icon from material-ui/icons
import HomeIcon from '@mui/icons-material/Home';
// Import search icon from material-ui/icons
import SearchIcon from '@mui/icons-material/Search';
import Avatar from "@mui/material/Avatar";
import { paths } from 'src/paths';
import LogOut01Icon from 'src/icons/untitled-ui/duocolor/log-out-01';

import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';



export const useSections = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const router = useRouter();



  return useMemo(() => {

    return [
      {
        items: [
          // {
          //   title: "Home",
          //   path: paths.home,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <HomeIcon />
          //     </SvgIcon>
          //   ),
          // },
          {
            title: "Home",
            path: paths.index,
            icon: (

                <HomeIcon fontSize={"small"} />

            ),
          },
          {
            title: "Explore",
            path: paths.explore,
            icon: (
              <SearchIcon fontSize="small">
                <BarChartSquare02Icon />
              </SearchIcon>
            ),
          },
          {
            title: "Profile",
            path: paths.profile,
            icon: (

                <Avatar

                  sx={{
                    height: 20,
                    width: 20,
                  }}
                  src={"/assets/avatars/avatar-anika-visser.png"}
                />

            ),
          },

          // {
          //   title:"Login",
          //   path:paths.auth.firebase.login,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <HomeIcon />
          //     </SvgIcon>
          //   ),
          // },
          // {
          //   title: "Logout",
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <LogOut01Icon />
          //     </SvgIcon>
          //   ),
          //   button: (
          //     <button onClick={async () => {
          //       try {
          //         await signOut();
          //         console.log("Sign out successful");
          //         // router.push(paths.auth.firebase.login); // Redirect to the login page
          //       } catch (error) {
          //         console.error("Error signing out:", error);
          //       }
          //     }}>
          //       Logout
          //     </button>
          //   ),

          // },

        ],
      },

    ];
  }, []);
};
