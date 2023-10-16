import PropTypes from 'prop-types';

import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { useSettings } from 'src/hooks/use-settings';

import { useSections } from './config';
import { HorizontalLayout } from './horizontal-layout';
import { VerticalLayout } from './vertical-layout';

// TODO: Add back in the AuthGuard once we have a login page
export const Layout = (props) => {
  const settings = useSettings();
  const sections = useSections();

  if (settings.layout === 'horizontal') {
    return (
      <HorizontalLayout
        sections={sections}
        navColor={settings.navColor}
        {...props}
      />
    );
  }

  return (
    <VerticalLayout
      sections={sections}
      navColor={settings.navColor}
      {...props}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
