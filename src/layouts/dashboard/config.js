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

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: "Home",
            path: paths.home,
            icon: (
              <SvgIcon fontSize="small">
                <HomeIcon />
              </SvgIcon>
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

        ],
      },


    ];
  }, [t]);
};
