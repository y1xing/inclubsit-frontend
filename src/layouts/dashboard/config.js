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
import UserIcon from '@mui/icons-material/Person';
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

               <UserIcon fontSize={"small"} />

            ),
          },


        ],
      },

    ];
  }, []);
};
