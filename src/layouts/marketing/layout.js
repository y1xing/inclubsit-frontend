import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';

import { Footer } from './footer';
import { Side } from './side-nav';
import { TopNav } from './top-nav';
import { useMobileNav } from './use-mobile-nav';
import { SideNav } from "./side-nav";

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
}));

export const Layout = (props) => {
  const { children } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mobileNav = useMobileNav();

  return (
    <>
      <TopNav onMobileNavOpen={mobileNav.handleOpen} />
      {!lgUp && (
        <SideNav
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
        />
      )}
      <LayoutRoot>
        {children}
        <Footer />
      </LayoutRoot>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
